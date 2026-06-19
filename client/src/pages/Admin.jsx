import axios from 'axios';
import React, { useState, useEffect, useMemo } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { toast } from 'sonner';
import { MapPin, Phone, Mail, Calendar, CreditCard, Package, Truck, CheckCircle, Clock, AlertCircle, RefreshCw, ShoppingBag, XCircle, RotateCcw, Search, ChevronDown, ChevronUp, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const StatCard = ({ title, value, change, icon, color }) => {
  const isPositive = change >= 0;
  const changeColor = isPositive? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400';
  const Arrow = isPositive? '▲' : '▼';

  return (
    <div className={`rounded-2xl p-6 shadow-lg ${color}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">{title}</p>
          <p className="mt-2 text-2xl font-bold">{value}</p>
        </div>
        <span className="text-3xl">{icon}</span>
      </div>
      {change!== undefined && (
        <div className={`mt-4 flex items-center gap-1 text-sm font-medium ${changeColor}`}>
          <span>{Arrow}</span>
          <span>{Math.abs(change)}%</span>
          <span className="text-zinc-500 dark:text-zinc-400">vs last period</span>
        </div>
      )}
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const config = {
    pending: { color: 'bg-yellow-500', label: 'Pending' },
    paid: { color: 'bg-blue-500', label: 'Paid' },
    processing: { color: 'bg-orange-500', label: 'Processing' },
    shipped: { color: 'bg-purple-500', label: 'Shipped' },
    delivered: { color: 'bg-green-500', label: 'Delivered' },
    cancelled: { color: 'bg-red-500', label: 'Closed' },
    returned: { color: 'bg-zinc-500', label: 'Returned' },
    confirmed: { color: 'bg-green-500', label: 'Resolved' },
    completed: { color: 'bg-blue-500', label: 'Completed' },
    'no-show': { color: 'bg-zinc-500', label: 'No Show' },
    pending_sync: { color: 'bg-amber-500', label: 'Pending Sync' },
    out_for_delivery: { color: 'bg-indigo-500', label: 'Out for Delivery' }
  };
  const c = config[status] || config.pending;
  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold text-white ${c.color}`}>{c.label}</span>;
};

// Status groups for filtering
const ORDER_STATUS_GROUPS = {
  all: {
    label: 'All Orders',
    icon: Package,
    statuses: null // null = show all
  },
  pending_sync: {
    label: 'Pending Sync',
    icon: AlertCircle,
    statuses: ['pending_sync']
  },
  pending: {
    label: 'Payment Pending',
    icon: Clock,
    statuses: ['pending']
  },
  paid: {
    label: 'Paid',
    icon: CheckCircle,
    statuses: ['paid']
  },
  processing: {
    label: 'Processing',
    icon: Package,
    statuses: ['processing']
  },
  shipped: {
    label: 'Shipped',
    icon: Truck,
    statuses: ['shipped', 'out_for_delivery']
  },
  delivered: {
    label: 'Delivered',
    icon: CheckCircle,
    statuses: ['delivered']
  },
  cancelled: {
    label: 'Cancelled',
    icon: XCircle,
    statuses: ['cancelled', 'returned']
  }
};

export const Admin = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [orderStatusFilter, setOrderStatusFilter] = useState('all');
  const [orders, setOrders] = useState([]);
  const [styleSessions, setStyleSessions] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orderSearch, setOrderSearch] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [showAddress, setShowAddress] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const backendUrl = import.meta.env.VITE_ENV === "development"? import.meta.env.VITE_BACKEND_URL : "/api";

  const openOrderModal = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const closeOrderModal = () => {
    setShowModal(false);
    setTimeout(() => setSelectedOrder(null), 300);
  };

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await axios.get(`${backendUrl}/order/data`);
        if (res.data.success) {
          setOrders(res.data.orders);
        }
      } catch (error) {
        console.error(error);
        toast.error('Failed to load orders');
      }
    };

    const getSections = async () => {
      try {
        const res = await axios.get(`${backendUrl}/order/c-data`);
        if (res.data.success) {
          setStyleSessions(res.data.consults);
        }
      } catch (error) {
        console.error(error);
        toast.error('Failed to load sessions');
      }
    };

    Promise.all([getOrders(), getSections()]).finally(() => setLoading(false));
  }, [backendUrl]);

  // Build customers from orders
  useEffect(() => {
    if (!orders?.length) return;

    const customerMap = orders
  .filter(order => order.status!== 'cancelled' && order.email)
  .reduce((acc, order) => {
        const email = order.email;
        if (!acc[email]) {
          acc[email] = {
            _id: email,
            name: order.customerName,
            email: email,
            orders: 0,
            totalSpent: 0,
            lastOrder: order.createdAt
          };
        }
        acc[email].orders += 1;
        acc[email].totalSpent += order.total || 0;
        if (new Date(order.createdAt) > new Date(acc[email].lastOrder)) {
          acc[email].lastOrder = order.createdAt;
        }
        return acc;
      }, {});

    setCustomers(Object.values(customerMap));
  }, [orders]);

  // Analytics
  const analytics = useMemo(() => {
    if (!orders.length) {
      return {
        totalRevenue: 0,
        totalRevenueChange: 0,
        todayRevenue: 0,
        todayRevenueChange: 0,
        activeOrders: 0,
        totalCustomers: 0,
        totalCustomersChange: 0,
        revenueData: [],
        topCategories: []
      };
    }

    const now = new Date();
    const todayStart = new Date(now); todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date(now); todayEnd.setHours(23, 59, 59, 999);
    const yesterdayStart = new Date(todayStart); yesterdayStart.setDate(yesterdayStart.getDate() - 1);
    const yesterdayEnd = new Date(todayEnd); yesterdayEnd.setDate(yesterdayEnd.getDate() - 1);
    const weekAgo = new Date(now); weekAgo.setDate(weekAgo.getDate() - 7);
    const twoWeeksAgo = new Date(now); twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      d.setHours(0, 0, 0, 0);
      return { date: d, day: days[d.getDay()], revenue: 0 };
    });

    let thisWeekRevenue = 0;
    let lastWeekRevenue = 0;
    let todayRevenue = 0;
    let yesterdayRevenue = 0;
    let activeOrders = 0;
    const salesByItem = {};
    const thisWeekCustomerEmails = new Set();
    const lastWeekCustomerEmails = new Set();

    orders.forEach(o => {
      const d = new Date(o.createdAt);
      const isCancelled = ['cancelled', 'returned'].includes(o.status);

      if (!isCancelled) {
        if (d >= weekAgo) {
          thisWeekRevenue += o.total || 0;
          if (o.email) thisWeekCustomerEmails.add(o.email);
        }
        if (d >= twoWeeksAgo && d < weekAgo) {
          lastWeekRevenue += o.total || 0;
          if (o.email) lastWeekCustomerEmails.add(o.email);
        }
        if (d >= todayStart && d <= todayEnd) todayRevenue += o.total || 0;
        if (d >= yesterdayStart && d <= yesterdayEnd) yesterdayRevenue += o.total || 0;

        const dayIdx = last7Days.findIndex(day => {
          const next = new Date(day.date);
          next.setDate(next.getDate() + 1);
          return d >= day.date && d < next;
        });
        if (dayIdx!== -1) last7Days[dayIdx].revenue += o.total || 0;

        const items = o.items || [{ itemName: o.itemName, quantity: o.quantity || 1, price: o.total }];
        items.forEach(item => {
          const name = item.itemName || 'Unknown';
          if (!salesByItem[name]) salesByItem[name] = { name, value: 0 };
          salesByItem[name].value += item.quantity || 1;
        });
      }

      if (['paid', 'processing', 'shipped', 'out_for_delivery'].includes(o.status)) activeOrders++;
    });

    const getChange = (current, previous) => {
      if (!previous) return current > 0? 100 : 0;
      return +(((current - previous) / previous) * 100).toFixed(1);
    };

    return {
      totalRevenue: Math.round(thisWeekRevenue),
      totalRevenueChange: getChange(thisWeekRevenue, lastWeekRevenue),
      todayRevenue: Math.round(todayRevenue),
      todayRevenueChange: getChange(todayRevenue, yesterdayRevenue),
      activeOrders,
      totalCustomers: customers.length,
      totalCustomersChange: getChange(thisWeekCustomerEmails.size, lastWeekCustomerEmails.size),
      revenueData: last7Days.map(d => ({ day: d.day, revenue: Math.round(d.revenue) })),
      topCategories: Object.values(salesByItem).sort((a, b) => b.value - a.value).slice(0, 4)
    };
  }, [orders, customers]);

  // Get counts per status for tab badges
  const statusCounts = useMemo(() => {
    const counts = { all: orders.length };
    Object.entries(ORDER_STATUS_GROUPS).forEach(([key, group]) => {
      if (group.statuses) {
        counts[key] = orders.filter(o => group.statuses.includes(o.status)).length;
      }
    });
    return counts;
  }, [orders]);

  // Filter orders by status group + search
  const filteredOrders = useMemo(() => {
    const group = ORDER_STATUS_GROUPS[orderStatusFilter];
    let filtered = group.statuses
  ? orders.filter(o => group.statuses.includes(o.status))
      : orders;

    if (orderSearch.trim()) {
      const q = orderSearch.toLowerCase();
      filtered = filtered.filter(o =>
        o._id?.toLowerCase().includes(q) ||
        o.customerName?.toLowerCase().includes(q) ||
        o.email?.toLowerCase().includes(q) ||
        o.itemName?.toLowerCase().includes(q) ||
        o.items?.some(i => i.name?.toLowerCase().includes(q))
      );
    }

    return filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [orders, orderStatusFilter, orderSearch]);

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const res = await axios.put(`${backendUrl}/order/update-order`, { orderId, status: newStatus });
      if (res.data.success) {
        toast.success('Status updated!');
        setOrders(prev => prev.map(o => o._id === orderId? {...o, status: newStatus } : o));
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to update order');
    }
  };

  const updateEnquiryStatus = async (enquiryId, newStatus) => {
    try {
      const res = await axios.put(`${backendUrl}/order/update-consult`, {
        consultId: enquiryId,
        status: newStatus
      });
      if (res.data.success) {
        toast.success('Enquiry updated!');
        setStyleSessions(prev => prev.map(e => e._id === enquiryId? {...e, status: newStatus } : e));
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to update enquiry');
    }
  };

  const refreshOrders = async () => {
    setRefreshing(true);
    try {
      const res = await axios.get(`${backendUrl}/order/data`);
      if (res.data.success) {
        setOrders(res.data.orders);
        toast.success('Orders refreshed');
      }
    } catch (error) {
      toast.error('Failed to refresh');
    } finally {
      setRefreshing(false);
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'orders', label: 'Orders', icon: '🛍' },
    { id: 'sessions', label: 'Enquiries', icon: '✨' },
    { id: 'customers', label: 'Customers', icon: '👥' }
  ];

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-neutral-950">
        <div className="text-lg font-semibold text-zinc-600 dark:text-zinc-400">Loading dashboard...</div>
      </div>
    );
  }

  const OrderModal = () => {
    if (!selectedOrder) return null;
  
    const order = selectedOrder;
    const items = order.items || [{
      name: order.itemName,
      image: order.image,
      size: order.size,
      color: order.color,
      quantity: order.quantity || 1,
      price: order.total
    }];
  
    return (
      <AnimatePresence>
        {showModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeOrderModal}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            />
  
            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl dark:bg-zinc-900"
              >
                {/* Header */}
                <div className="sticky top-0 z-10 flex items-center justify-between border-b border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
                  <div>
                    <h2 className="text-2xl font-black text-zinc-900 dark:text-white">
                      Order Details
                    </h2>
                    <p className="mt-1 font-mono text-sm text-zinc-500 dark:text-zinc-400">
                      #{order._id.slice(-8).toUpperCase()}
                    </p>
                  </div>
                  <button
                    onClick={closeOrderModal}
                    className="rounded-xl p-2 text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
  
                {/* Content */}
                <div className="overflow-y-auto p-6" style={{ maxHeight: 'calc(90vh - 88px)' }}>
                  <div className="grid gap-6 lg:grid-cols-5">
                    {/* Left Column - 2 cols */}
                    <div className="space-y-6 lg:col-span-2">
                      {/* Status & Date */}
                      <div className="rounded-2xl border border-zinc-200 p-5 dark:border-zinc-800">
                        <h3 className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                          <Package className="h-4 w-4" /> Order Status
                        </h3>
                        <div className="flex items-center justify-between">
                          <StatusBadge status={order.status} />
                          <div className="text-right">
                            <p className="text-xs text-zinc-500 dark:text-zinc-400">Placed on</p>
                            <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                              {new Date(order.createdAt).toLocaleDateString('en-GB', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                              })}
                            </p>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400">
                              {new Date(order.createdAt).toLocaleTimeString('en-GB', {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                          </div>
                        </div>
                      </div>
  
                      {/* Customer Info */}
                      <div className="rounded-2xl border border-zinc-200 p-5 dark:border-zinc-800">
                        <h3 className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                          <Mail className="h-4 w-4" /> Customer
                        </h3>
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                              {order.customerName}
                            </p>
                          </div>
                          <a
                            href={`mailto:${order.email}`}
                            className="flex items-center gap-2 text-sm text-zinc-600 hover:text-rose-500 dark:text-zinc-400 dark:hover:text-rose-400"
                          >
                            <Mail className="h-4 w-4" />
                            {order.email}
                          </a>
                          <a
                            href={`tel:${order.phone}`}
                            className="flex items-center gap-2 text-sm text-zinc-600 hover:text-rose-500 dark:text-zinc-400 dark:hover:text-rose-400"
                          >
                            <Phone className="h-4 w-4" />
                            {order.phone}
                          </a>
                        </div>
                      </div>
  
                      {/* Delivery Address */}
                      <div className="rounded-2xl border border-zinc-200 p-5 dark:border-zinc-800">
                        <h3 className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                          <MapPin className="h-4 w-4" /> Delivery Address
                        </h3>
                        <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                          {order.address}
                        </p>
                      </div>
                    </div>
  
                    {/* Right Column - 3 cols */}
                    <div className="space-y-6 lg:col-span-3">
                      {/* Order Items - DETAILED */}
                      <div className="rounded-2xl border border-zinc-200 p-5 dark:border-zinc-800">
                        <h3 className="mb-4 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                          <span className="flex items-center gap-2">
                            <Package className="h-4 w-4" /> Order Items
                          </span>
                          <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] dark:bg-zinc-800">
                            {items.length} {items.length === 1? 'Item' : 'Items'}
                          </span>
                        </h3>
                        <div className="space-y-4">
                          {items.map((item, i) => (
                            <div key={i} className="flex gap-4 rounded-xl bg-zinc-50 p-4 dark:bg-zinc-800/50">
                              <img
                                src={item.image || 'https://via.placeholder.com/80'}
                                alt={item.name}
                                className="h-20 w-20 rounded-xl object-cover ring-1 ring-zinc-200 dark:ring-zinc-700"
                              />
                              <div className="flex-1 space-y-2">
                                <p className="font-bold text-zinc-900 dark:text-white">
                                  {item.name}
                                </p>
  
                                {/* Product Details Grid */}
                                <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
                                  <div className="flex items-center gap-2">
                                    <span className="text-zinc-500 dark:text-zinc-400">Quantity:</span>
                                    <span className="font-semibold text-zinc-700 dark:text-zinc-300">
                                      {item.quantity || 1}
                                    </span>
                                  </div>
  
                                  {item.size && item.size!== 'N/A' && (
                                    <div className="flex items-center gap-2">
                                      <span className="text-zinc-500 dark:text-zinc-400">Size:</span>
                                      <span className="rounded bg-white px-2 py-0.5 text-[10px] font-bold text-zinc-700 ring-1 ring-zinc-200 dark:bg-zinc-900 dark:text-zinc-300 dark:ring-zinc-700">
                                        {item.size}
                                      </span>
                                    </div>
                                  )}
  
                                  {item.color && item.color!== 'N/A' && (
                                    <div className="flex items-center gap-2">
                                      <span className="text-zinc-500 dark:text-zinc-400">Color:</span>
                                      <div className="flex items-center gap-1.5">
                                        <span
                                          className="h-4 w-4 rounded-full ring-2 ring-white dark:ring-zinc-900"
                                          style={{ backgroundColor: item.color }}
                                        />
                                        <span className="font-semibold text-zinc-700 dark:text-zinc-300 capitalize">
                                          {item.color}
                                        </span>
                                      </div>
                                    </div>
                                  )}
  
                                  {item.sku && (
                                    <div className="flex items-center gap-2">
                                      <span className="text-zinc-500 dark:text-zinc-400">SKU:</span>
                                      <span className="font-mono text-[10px] font-semibold text-zinc-700 dark:text-zinc-300">
                                        {item.sku}
                                      </span>
                                    </div>
                                  )}
                                </div>
  
                                {/* Price */}
                                <div className="flex items-baseline gap-2 pt-1">
                                  <span className="text-lg font-black text-rose-500">
                                    ₵{((item.price || order.total / items.length) * (item.quantity || 1)).toLocaleString()}
                                  </span>
                                  {item.quantity > 1 && (
                                    <span className="text-xs text-zinc-500 dark:text-zinc-400">
                                      (₵{(item.price || order.total / items.length).toLocaleString()} each)
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
  
                      {/* Payment Summary */}
                      <div className="rounded-2xl border border-zinc-200 p-5 dark:border-zinc-800">
                        <h3 className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                          <CreditCard className="h-4 w-4" /> Payment Summary
                        </h3>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-zinc-600 dark:text-zinc-400">Subtotal</span>
                            <span className="font-semibold text-zinc-900 dark:text-white">
                              ₵{order.subtotal?.toLocaleString() || order.total?.toLocaleString()}
                            </span>
                          </div>
                          {order.shipping > 0 && (
                            <div className="flex justify-between text-sm">
                              <span className="text-zinc-600 dark:text-zinc-400">Shipping</span>
                              <span className="font-semibold text-zinc-900 dark:text-white">
                                ₵{order.shipping.toLocaleString()}
                              </span>
                            </div>
                          )}
                          {order.discount > 0 && (
                            <div className="flex justify-between text-sm">
                              <span className="text-zinc-600 dark:text-zinc-400">Discount</span>
                              <span className="font-semibold text-green-600 dark:text-green-400">
                                -₵{order.discount.toLocaleString()}
                              </span>
                            </div>
                          )}
                          <div className="border-t border-zinc-200 pt-3 dark:border-zinc-800">
                            <div className="flex justify-between">
                              <span className="text-base font-bold text-zinc-900 dark:text-white">Total</span>
                              <span className="text-2xl font-black text-rose-500">
                                ₵{order.total?.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
  
                      {/* Update Status */}
                      <div className="rounded-2xl border border-zinc-200 p-5 dark:border-zinc-800">
                        <h3 className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                          <Truck className="h-4 w-4" /> Update Status
                        </h3>
                        <select
                          value={order.status}
                          onChange={(e) => {
                            updateOrderStatus(order._id, e.target.value);
                            setSelectedOrder({...order, status: e.target.value });
                          }}
                          className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm font-semibold text-zinc-700 transition hover:border-zinc-400 focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                        >
                          <option value="pending">Pending</option>
                          <option value="paid">Paid</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="out_for_delivery">Out for Delivery</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                          <option value="returned">Returned</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    );
  };  

  return (
    <div className="mt-5 min-h-screen bg-zinc-50 px-4 py-8 text-zinc-900 dark:bg-neutral-950 dark:text-white">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">Manage orders, sessions & track performance</p>
        </div>

        {/* Tabs */}
        <div className="mb-8 flex gap-2 overflow-x-auto border-b border-zinc-200 dark:border-zinc-800">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 whitespace-nowrap border-b-2 px-4 py-3 font-semibold transition ${
                activeTab === tab.id
            ? 'border-rose-500 text-rose-500'
                  : 'border-transparent text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              <span>{tab.icon}</span> {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <StatCard
                title="Total Revenue"
                value={`₵${analytics.totalRevenue.toLocaleString()}`}
                change={analytics.totalRevenueChange}
                icon="💰"
                color="bg-green-100 dark:bg-green-900/30"
              />
              <StatCard
                title="Today's Revenue"
                value={`₵${analytics.todayRevenue.toLocaleString()}`}
                change={analytics.todayRevenueChange}
                icon="📈"
                color="bg-blue-100 dark:bg-blue-900/30"
              />
              <StatCard
                title="Active Orders"
                value={analytics.activeOrders}
                icon="📦"
                color="bg-rose-100 dark:bg-rose-900/30"
              />
              <StatCard
                title="Total Customers"
                value={analytics.totalCustomers}
                change={analytics.totalCustomersChange}
                icon="👥"
                color="bg-purple-100 dark:bg-purple-900/30"
              />
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl bg-white p-6 shadow-lg dark:bg-zinc-900">
                <h3 className="mb-4 text-lg font-bold">Revenue This Week</h3>
                {analytics.revenueData.some(d => d.revenue > 0)? (
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={analytics.revenueData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="day" stroke="#9ca3af" />
                      <YAxis stroke="#9ca3af" allowDecimals={false} />
                      <Tooltip contentStyle={{ backgroundColor: '#18181b', border: 'none', borderRadius: '8px' }} />
                      <Line type="monotone" dataKey="revenue" stroke="#f43f5e" strokeWidth={3} dot={{ r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex h- items-center justify-center text-zinc-500">No revenue data for the last 7 days</div>
                )}
              </div>

              <div className="rounded-2xl bg-white p-6 shadow-lg dark:bg-zinc-900">
                <h3 className="mb-4 text-lg font-bold">Top Categories</h3>
                {analytics.topCategories.length? (
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={analytics.topCategories}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis
                        dataKey="name"
                        stroke="#9ca3af"
                        tick={{ fontSize: 12 }}
                        interval={0}
                        tickFormatter={(name) => name.length > 12? `${name.slice(0, 12)}...` : name}
                      />
                      <YAxis stroke="#9ca3af" allowDecimals={false} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#18181b',
                          border: 'none',
                          borderRadius: '8px',
                          color: '#fff'
                        }}
                        cursor={{ fill: 'rgba(244, 63, 94, 0.1)' }}
                      />
                      <Bar dataKey="value" fill="#f43f5e" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex h- items-center justify-center text-zinc-500">No sales data yet</div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-2xl font-bold">All Orders</h2>
              <div className="flex gap-2">
                <div className="relative w-full sm:w-80">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                  <input
                    type="text"
                    placeholder="Search orders..."
                    value={orderSearch}
                    onChange={(e) => setOrderSearch(e.target.value)}
                    className="w-full rounded-lg border border-zinc-300 bg-white py-2 pl-10 pr-4 text-sm dark:border-zinc-700 dark:bg-zinc-900"
                  />
                </div>
                <button
                  onClick={refreshOrders}
                  disabled={refreshing}
                  className="flex shrink-0 items-center gap-2 rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-bold text-zinc-700 transition hover:bg-zinc-50 disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
                >
                  <RefreshCw className={`h-4 w-4 ${refreshing? 'animate-spin' : ''}`} />
                </button>
              </div>
            </div>

            {/* Status Filter Tabs */}
            <div className="flex gap-2 overflow-x-auto border-b border-zinc-200 dark:border-zinc-800">
              {Object.entries(ORDER_STATUS_GROUPS).map(([key, group]) => {
                const Icon = group.icon;
                const count = statusCounts[key] || 0;
                const isActive = orderStatusFilter === key;

                return (
                  <button
                    key={key}
                    onClick={() => setOrderStatusFilter(key)}
                    className={`flex items-center gap-2 whitespace-nowrap border-b-2 px-4 py-3 text-sm font-bold transition ${
                      isActive
                   ? 'border-rose-500 text-rose-500'
                        : 'border-transparent text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {group.label}
                    <span className={`rounded-full px-2 py-0.5 text-xs ${
                      isActive
                   ? 'bg-rose-500 text-white'
                        : 'bg-zinc-200 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Orders Table */}
            <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="sticky top-0 z-10 border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-800/50">
                    <tr>
                      <th className="px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Order</th>
                      <th className="px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Customer</th>
                      <th className="px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Items</th>
                      <th className="px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Total</th>
                      <th className="px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Status</th>
                      <th className="px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Date</th>
                      <th className="px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/50">
                    <AnimatePresence>
                      {filteredOrders.map((order, idx) => {
                        return (
                          <motion.tr
                            key={order._id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ delay: idx * 0.02 }}
                            onClick={() => openOrderModal(order)}
                            className="group cursor-pointer transition-colors hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30"
                          >
                            {/* Order ID */}
                            <td className="px-5 py-4">
                              <div className="flex flex-col gap-1">
                                <span className="font-mono text-xs font-semibold text-zinc-900 dark:text-white">
                                  #{order._id.slice(-6).toUpperCase()}
                                </span>
                                <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
                                  {order.items?.length || 1} item{order.items?.length!== 1? 's' : ''}
                                </span>
                              </div>
                            </td>

                            {/* Customer + Contact */}
                            <td className="px-5 py-4" onClick={(e) => e.stopPropagation()}>
                              <div className="flex flex-col gap-0.5">
                                <span className="text-sm font-semibold text-zinc-900 dark:text-white">
                                  {order.customerName}
                                </span>
                                <a
                                  href={`mailto:${order.email}`}
                                  className="text-[11px] text-zinc-500 hover:text-rose-500 dark:text-zinc-400 dark:hover:text-rose-400"
                                >
                                  {order.email}
                                </a>
                                <a
                                  href={`tel:${order.phone}`}
                                  className="text-[11px] text-zinc-500 hover:text-rose-500 dark:text-zinc-400 dark:hover:text-rose-400"
                                >
                                  {order.phone}
                                </a>
                              </div>
                            </td>

                            {/* Product + Variant */}
                            <td className="px-5 py-4">
                              <div className="flex items-center gap-3">
                                <img
                                  src={order.items?.[0]?.image || order.image || 'https://via.placeholder.com/40'}
                                  alt={order.items?.[0]?.name || order.itemName}
                                  className="h-10 w-10 rounded-lg object-cover ring-1 ring-zinc-200 dark:ring-zinc-800"
                                />
                                <div className="flex flex-col gap-0.5">
                                  <span className="text-sm font-medium text-zinc-900 dark:text-white line-clamp-1">
                                    {order.items?.[0]?.name || order.itemName}
                                  </span>
                                  <div className="flex items-center gap-1.5">
                                    {order.items?.[0]?.size && order.items?.[0]?.size!== 'N/A' && (
                                      <span className="rounded bg-zinc-100 px-1.5 py-0.5 text-[10px] font-semibold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                                        {order.items?.[0]?.size}
                                      </span>
                                    )}
                                    {order.items?.[0]?.color && order.items?.[0]?.color!== 'N/A' && (
                                      <span
                                        className="h-3.5 w-3.5 rounded-full ring-2 ring-white dark:ring-zinc-900"
                                        style={{ backgroundColor: order.items?.[0]?.color }}
                                        title={order.items?.[0]?.color}
                                      />
                                    )}
                                  </div>
                                </div>
                              </div>
                            </td>

                            {/* Total */}
                            <td className="px-5 py-4">
                              <span className="text-lg font-black text-rose-500">
                                ₵{order.total?.toLocaleString()}
                              </span>
                            </td>

                            {/* Status */}
                            <td className="px-5 py-4">
                              <StatusBadge status={order.status} />
                            </td>

                            {/* Date */}
                            <td className="px-5 py-4">
                              <div className="flex flex-col gap-0.5">
                                <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                                  {new Date(order.createdAt).toLocaleDateString('en-GB', {
                                    day: 'numeric',
                                    month: 'short'
                                  })}
                                </span>
                                <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
                                  {new Date(order.createdAt).toLocaleTimeString('en-GB', {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  })}
                                </span>
                              </div>
                            </td>

                            {/* Actions */}
                            <td className="px-5 py-4" onClick={(e) => e.stopPropagation()}>
                              <select
                                value={order.status}
                                onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                                className="w-full rounded-lg border border-zinc-300 bg-white px-2.5 py-1.5 text-xs font-semibold text-zinc-700 transition hover:border-zinc-400 focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:border-zinc-600"
                              >
                                <option value="pending">Pending</option>
                                <option value="paid">Paid</option>
                                <option value="processing">Processing</option>
                                <option value="shipped">Shipped</option>
                                <option value="out_for_delivery">Out for Delivery</option>
                                <option value="delivered">Delivered</option>
                                <option value="cancelled">Cancelled</option>
                                <option value="returned">Returned</option>
                              </select>
                            </td>
                          </motion.tr>

                        );
                      })}
                    </AnimatePresence>
                  </tbody>
                </table>
                {filteredOrders.length === 0 && (
                  <div className="py-20 text-center">
                    <Package className="mx-auto mb-3 h-12 w-12 text-zinc-300 dark:text-zinc-700" />
                    <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">
                      No orders found
                    </p>
                  </div>
                )}
              </div>
            </div>

          </div>
        )}

        {/* Style Sessions Tab */}
        {activeTab === 'sessions' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Enquiries</h2>
              <span className="rounded-lg bg-zinc-500/20 px-3 py-1 text-sm font-semibold text-zinc-600 dark:text-zinc-400">
                {styleSessions.length} Total
              </span>
            </div>

            {styleSessions.length? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {styleSessions.map(enquiry => {
                  const created = new Date(enquiry.createdAt);
                  const updated = new Date(enquiry.updatedAt);

                  return (
                    <div key={enquiry._id} className="rounded-2xl bg-white p-6 shadow-lg dark:bg-zinc-900">
                      <div className="mb-4 flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold">{enquiry.name}</h3>
                          <p className="text-xs text-zinc-500">{enquiry.orderNumber}</p>
                        </div>
                        <StatusBadge status={enquiry.status} />
                      </div>

                      <div className="mb-4 space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                        <p className="flex items-center gap-2">
                          <span>📧</span>
                          <a href={`mailto:${enquiry.email}`} className="hover:text-rose-500">
                            {enquiry.email}
                          </a>
                        </p>
                        <p className="flex items-center gap-2">
                          <span>📱</span>
                          <a href={`tel:${enquiry.phone}`} className="hover:text-rose-500">
                            {enquiry.phone}
                          </a>
                        </p>
                        <p className="flex items-center gap-2">
                          <span>🏷</span>
                          <span className="font-semibold">{enquiry.subject}</span>
                        </p>
                      </div>

                      <div className="mb-4 rounded-lg bg-zinc-50 p-3 dark:bg-zinc-800">
                        <p className="text-sm text-zinc-700 dark:text-zinc-300 line-clamp-3">
                          {enquiry.message}
                        </p>
                      </div>

                      <div className="mb-4 space-y-1 text-xs text-zinc-500">
                        <p>📅 Created: {created.toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}</p>
                        <p>🔄 Updated: {updated.toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}</p>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => updateEnquiryStatus(enquiry._id, 'confirmed')}
                          disabled={enquiry.status === 'confirmed'}
                          className="flex-1 rounded-lg bg-green-500 py-2 text-xs font-bold text-white hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          Resolve
                        </button>
                        <button
                          onClick={() => updateEnquiryStatus(enquiry._id, 'cancelled')}
                          disabled={enquiry.status === 'cancelled'}
                          className="flex-1 rounded-lg bg-red-500 py-2 text-xs font-bold text-white hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="rounded-2xl bg-white p-12 text-center shadow-lg dark:bg-zinc-900">
                <p className="text-zinc-500">No enquiries yet</p>
              </div>
            )}
          </div>
        )}

        {/* Customers Tab */}
        {activeTab === 'customers' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Customers</h2>
            <div className="overflow-hidden rounded-2xl bg-white shadow-lg dark:bg-zinc-900">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-zinc-50 dark:bg-zinc-800">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold uppercase text-zinc-500">Name</th>
                      <th className="px-6 py-4 text-left text-xs font-bold uppercase text-zinc-500">Email</th>
                      <th className="px-6 py-4 text-left text-xs font-bold uppercase text-zinc-500">Orders</th>
                      <th className="px-6 py-4 text-left text-xs font-bold uppercase text-zinc-500">Total Spent</th>
                      <th className="px-6 py-4 text-left text-xs font-bold uppercase text-zinc-500">Last Order</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                    {customers.map(customer => (
                      <tr key={customer._id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                        <td className="px-6 py-4 font-semibold">{customer.name}</td>
                        <td className="px-6 py-4 text-sm text-zinc-600 dark:text-zinc-400">{customer.email}</td>
                        <td className="px-6 py-4">{customer.orders}</td>
                        <td className="px-6 py-4 font-bold text-rose-500">₵{Math.round(customer.totalSpent)}</td>
                        <td className="px-6 py-4 text-sm text-zinc-500">
                          {customer.lastOrder? new Date(customer.lastOrder).toLocaleDateString() : 'Never'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
      <OrderModal />
    </div>
  );
};