import axios from 'axios';
import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { toast } from 'sonner';

const OrderContext = createContext();

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('luxe&glowO');
    return saved? JSON.parse(saved) : [];
  });
  const [appointments, setAppointments] = useState(() => {
    const saved = localStorage.getItem('luxe&glowA');
    return saved? JSON.parse(saved) : [];
  });
  const [isPolling, setIsPolling] = useState(false);
  const [isAPolling, setIsAPolling] = useState(false);

  const isOrdersInitialLoad = useRef(true);
  const isAppointmentsInitialLoad = useRef(true);
  const ordersPollRef = useRef(null);
  const appointmentsPollRef = useRef(null);

  const backendUrl = import.meta.env.VITE_ENV === "development"? import.meta.env.VITE_BACKEND_URL : "/api";

  // Save to localStorage
  useEffect(() => {
    if (isOrdersInitialLoad.current) {
      isOrdersInitialLoad.current = false;
      return;
    }
    localStorage.setItem('luxe&glowO', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    if (isAppointmentsInitialLoad.current) {
      isAppointmentsInitialLoad.current = false;
      return;
    }
    localStorage.setItem('luxe&glowA', JSON.stringify(appointments));
  }, [appointments]);

  const addOrderData = (orderData) => {
    setOrders(prev => {
      if (prev.some(o => o._id === orderData._id)) return prev;
      return [...prev, orderData];
    });
  };

  const addAppointmentsData = (appointmentsData) => {
    setAppointments(prev => {
      if (prev.some(a => a._id === appointmentsData._id)) return prev;
      return [...prev, appointmentsData];
    });
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(o =>
      o._id === orderId? {...o, status: newStatus, updatedAt: new Date().toISOString() } : o
    ));
  };

  const updateAppointmentStatus = (appointmentId, newStatus) => {
    setAppointments(prev => prev.map(a =>
      a._id === appointmentId? {...a, status: newStatus, updatedAt: new Date().toISOString() } : a
    ));
  };

  // Use your existing getOrderData to fetch ALL orders at once instead of individual calls
  const checkOrderStatusUpdates = useCallback(async () => {
    if (isPolling || !orders.length) return;

    setIsPolling(true);
    try {
      // 1 API call to get ALL orders, not N calls
      const res = await axios.get(`${backendUrl}/order/data`);
      if (res.data.success && res.data.orders?.length) {
        const serverOrders = res.data.orders;
        setOrders(prev => {
          const updated = [...prev];
          let updatedCount = 0;

          serverOrders.forEach(serverOrder => {
            const idx = updated.findIndex(o => o._id === serverOrder._id);
            if (idx!== -1 &&
                updated[idx].status!== serverOrder.status) {
              updated[idx] = {...updated[idx],...serverOrder };
              updatedCount++;
              toast.info(`Order #${serverOrder._id.slice(-6).toUpperCase()} updated to ${serverOrder.status}`);
            }
          });

          if (updatedCount > 0) console.log(`[Orders] Updated ${updatedCount} orders`);
          return updated;
        });
      }
    } catch (error) {
      console.error('[Orders] Sync failed:', error);
    } finally {
      setIsPolling(false);
    }
  }, [orders, backendUrl, isPolling]);

  // Use your existing getOrderDataA to fetch ALL appointments
  const checkAppointmentsStatusUpdates = useCallback(async () => {
    if (isAPolling || !appointments.length) return;
    
    setIsAPolling(true);
    try {
      const res = await axios.get(`${backendUrl}/order/a-data`);
      if (res.data.success && res.data.appointments?.length) {
        const serverAppointments = res.data.appointments;
        setAppointments(prev => {
          const updated = [...prev];
          let updatedCount = 0;

          serverAppointments.forEach(serverApp => {
            const idx = updated.findIndex(a => a._id === serverApp._id);
            
            if (idx !== -1 &&
                updated[idx].status !== serverApp.status) {
              updated[idx] = {...updated[idx],...serverApp };
              updatedCount++;
              toast.info(`Appointment #${serverApp._id.slice(-6).toUpperCase()} updated to ${serverApp.status}`);
            }
          });

          if (updatedCount > 0) console.log(`[Appointments] Updated ${updatedCount} appointments`);
          return updated;
        });
      }
    } catch (error) {
      console.error('[Appointments] Sync failed:', error);
    } finally {
      setIsAPolling(false);
    }
  }, [appointments, backendUrl, isAPolling]);

  // Poll every 5 minutes instead of 1 minute to reduce load
  useEffect(() => {
    const initialTimeout = setTimeout(checkOrderStatusUpdates, 10000);
    ordersPollRef.current = setInterval(checkOrderStatusUpdates, 300000); // 5 min

    return () => {
      clearTimeout(initialTimeout);
      if (ordersPollRef.current) clearInterval(ordersPollRef.current);
    };
  }, [checkOrderStatusUpdates]);

  useEffect(() => {
    const initialTimeout = setTimeout(checkAppointmentsStatusUpdates, 10000);
    appointmentsPollRef.current = setInterval(checkAppointmentsStatusUpdates, 300000); // 5 min

    return () => {
      clearTimeout(initialTimeout);
      if (appointmentsPollRef.current) clearInterval(appointmentsPollRef.current);
    };
  }, [checkAppointmentsStatusUpdates]);

  // Sync pending orders one by one using your existing createOrder
  const syncPendingOrders = async () => {
    const pending = orders.filter(o => o.status === 'pending_sync' || o._id.startsWith('local_'));
    if (!pending.length) {
      toast.info('No pending orders to sync');
      return;
    }

    let syncedCount = 0;
    for (const localOrder of pending) {
      try {
        const { _id, status, syncError,...payload } = localOrder;
        const res = await axios.post(`${backendUrl}/order/create-order`, { orderData: payload });
        if (res.data.success) {
          setOrders(prev => prev.map(o => o._id === _id? res.data.data : o));
          syncedCount++;
        }
      } catch (error) {
        console.error(`[Orders] Failed to sync ${localOrder._id}:`, error);
      }
    }

    if (syncedCount) toast.success(`Synced ${syncedCount} order${syncedCount > 1? 's' : ''}`);
    const failedCount = pending.length - syncedCount;
    if (failedCount) toast.error(`${failedCount} order${failedCount > 1? 's' : ''} failed to sync`);
  };

  // Sync pending appointments one by one
  const syncPendingAppointments = async () => {
    const pending = appointments.filter(a => a.status === 'pending_sync' || a._id.startsWith('local_'));
    if (!pending.length) {
      toast.info('No pending appointments to sync');
      return;
    }

    let syncedCount = 0;
    for (const localApp of pending) {
      try {
        const { _id, status, syncError,...payload } = localApp;
        const res = await axios.post(`${backendUrl}/order/create-orderA`, { orderData: payload });
        if (res.data.success) {
          setAppointments(prev => prev.map(a => a._id === _id? res.data.data : a));
          syncedCount++;
        }
      } catch (error) {
        console.error(`[Appointments] Failed to sync ${localApp._id}:`, error);
      }
    }

    if (syncedCount) toast.success(`Synced ${syncedCount} appointment${syncedCount > 1? 's' : ''}`);
    const failedCount = pending.length - syncedCount;
    if (failedCount) toast.error(`${failedCount} appointment${failedCount > 1? 's' : ''} failed to sync`);
  };

  return (
    <OrderContext.Provider value={{
      orders,
      addOrderData,
      ordersCount: orders.length,
      updateOrderStatus,
      syncPendingOrders,
      checkOrderStatusUpdates,
      appointments,
      appointmentsCount: appointments.length,
      addAppointmentsData,
      updateAppointmentStatus,
      checkAppointmentsStatusUpdates,
      syncPendingAppointments
    }}>
      {children}
    </OrderContext.Provider>
  );
}

export const useOrderContext = () => {
  const context = useContext(OrderContext);
  if (!context) throw new Error('useOrderContext must be used within OrderProvider');
  return context;
};
