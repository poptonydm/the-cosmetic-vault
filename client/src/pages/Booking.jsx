import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Calendar, Clock } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';
import { useOrderContext } from '../context/OrderContext';

const timeSlots = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'];
const stylists = ['Ama', 'Kwame', 'Akosua', 'Kojo'];

export default function Booking() {
  const location = useLocation();
  const [selectedService] = useState(location.state?.service || null);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [stylist, setStylist] = useState('');
  const [form, setForm] = useState({ name: '', phone: '', email: '' });

  const key = import.meta.env.VITE_PAYSTACK_LIVE_PUBLIC_KEY;
  const backendUrl = import.meta.env.VITE_ENV === "development"? import.meta.env.VITE_BACKEND_URL : "/api";
  const { addAppointmentsData } = useOrderContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    payWithPaystack();
  };

  const payWithPaystack = () => {
    if (!form.name ||!form.email ||!form.phone) {
      toast.error('Please fill all required fields');
      return;
    }

    if (typeof window.PaystackPop === 'undefined') {
      toast.error('Payment service not loaded. Please refresh.');
      return;
    }

    const handlePaymentSuccess = async (response) => {
      try {
        const placeOrder = await createOrder(response.reference);
        if(placeOrder){
          toast.success(`Payment complete! Ref: ${response.reference}`);
        }else{
          toast.error('Payment succeeded but booking save failed');
        }
      } catch (err) {
        toast.error('Payment succeeded but booking save failed');
        console.error(err);
      }
    };

    const handlePaymentClose = () => {
      toast.info('Payment window closed');
    };

    const handler = window.PaystackPop.setup({
      key: key,
      email: form.email,
      amount: Math.round(selectedService.price * 100),
      currency: 'GHS',
      ref: `Luxe_${Date.now()}`,
      metadata: {
        custom_fields: [
          { display_name: "Customer Name", variable_name: "customer_name", value: form.name },
          { display_name: "Service", variable_name: "service", value: selectedService.name},
          { display_name: "Total", variable_name: "total", value: selectedService.price.toString() }
        ]
      },
      callback: (response) => handlePaymentSuccess(response),
      onClose: handlePaymentClose,
    });

    handler.openIframe();
  };

  const createOrder = async (reference) => {
    const orderData = {
      customer: form,
      clientName: form.name,
      phone: form.phone,
      service: selectedService,
      serviceName: selectedService.name,
      total: selectedService.price,
      time: time,
      date: date,
      image: selectedService.image,
      stylist: stylist,
      paymentRef: reference,
      notes: '',
      status: 'paid',
      createdAt: new Date().toISOString(),
    };
  
    try {
      const res = await axios.post(`${backendUrl}/order/create-orderA`, { orderData });
  
      if (res.data.success) {
        toast.success("Service booked successfully!");
        addAppointmentsData(res.data.data);
        return true;
      } else {
        throw new Error(res.data.message || 'Server rejected order');
      }
    } catch (error) {
      console.error('API failed, saving order locally:', error);
  
      // Mark as pending sync and save locally
      const localOrder = {
      ...orderData,
        status: 'pending_sync',
        syncError: error.message
      };
  
      addAppointmentsData(localOrder); // Adds to context + localStorage via your useEffect
  
      toast.warning("Appointment saved locally", {
        description: `We'll sync when online. Ref: ${reference}`
      });
  
      return false;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 py-16">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-8 text-center">Book Appointment</h1>

        <form onSubmit={handleSubmit} className="bg-white dark:bg-neutral-900 rounded-2xl shadow-sm p-8 space-y-6">
          {selectedService && (
            <div className="bg-rose-50 dark:bg-rose-950/30 p-4 rounded-lg">
              <p className="text-sm text-neutral-600 dark:text-neutral-400">Selected Service</p>
              <p className="text-lg font-semibold text-neutral-900 dark:text-white">{selectedService.name} - ₵{selectedService.price}</p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              <Calendar className="inline h-4 w-4 mr-1" /> Date
            </label>
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              <Clock className="inline h-4 w-4 mr-1" /> Time
            </label>
            <div className="grid grid-cols-3 gap-3">
              {timeSlots.map(slot => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setTime(slot)}
                  className={`py-2 rounded-lg border transition ${
                    time === slot
                     ? 'bg-rose-500 text-white border-rose-500'
                      : 'border-neutral-200 dark:border-neutral-700 hover:border-rose-500'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Preferred Stylist</label>
            <select
              value={stylist}
              onChange={e => setStylist(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white"
            >
              <option value="">Any available</option>
              {stylists.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Full Name"
              value={form.name}
              onChange={e => setForm({...form, name: e.target.value})}
              className="px-4 py-3 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800"
              required
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={form.phone}
              onChange={e => setForm({...form, phone: e.target.value})}
              className="px-4 py-3 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800"
              required
            />
          </div>

          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={e => setForm({...form, email: e.target.value})}
            className="w-full px-4 py-3 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800"
            required
          />

          <button type="submit" className="w-full bg-rose-500 text-white py-4 rounded-lg font-semibold hover:bg-rose-600 transition">
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
}
