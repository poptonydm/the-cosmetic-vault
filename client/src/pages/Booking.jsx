import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Calendar, Clock } from 'lucide-react';

const timeSlots = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'];
const stylists = ['Ama', 'Kwame', 'Akosua', 'Kojo'];

export default function Booking() {
  const location = useLocation();
  const [selectedService] = useState(location.state?.service || null);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [stylist, setStylist] = useState('');
  const [form, setForm] = useState({ name: '', phone: '', email: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ service: selectedService, date, time, stylist,...form });
    alert('Booking confirmed! We’ll send you a text.');
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
