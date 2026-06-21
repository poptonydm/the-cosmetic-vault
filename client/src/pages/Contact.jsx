import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Contact form:', form);
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  return (
    <div className="bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Have a question about our services or products? We'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="space-y-8 mb-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-rose-100 dark:bg-rose-950/50 rounded-xl flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-rose-500" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Location</h3>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    The Cosmetics Vault<br />
                    Oxford Street, Osu<br />
                    Accra, Ghana
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-rose-100 dark:bg-rose-950/50 rounded-xl flex items-center justify-center">
                  <Phone className="h-6 w-6 text-rose-500" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Phone</h3>
                  <p className="text-neutral-600 dark:text-neutral-400">+233 20 123 4567</p>
                  <p className="text-neutral-600 dark:text-neutral-400">+233 24 987 6543</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-rose-100 dark:bg-rose-950/50 rounded-xl flex items-center justify-center">
                  <Mail className="h-6 w-6 text-rose-500" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <p className="text-neutral-600 dark:text-neutral-400">hello@cosmeticsvault.com</p>
                  <p className="text-neutral-600 dark:text-neutral-400">bookings@cosmeticsvault.com</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-rose-100 dark:bg-rose-950/50 rounded-xl flex items-center justify-center">
                  <Clock className="h-6 w-6 text-rose-500" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Hours</h3>
                  <p className="text-neutral-600 dark:text-neutral-400">Mon - Fri: 9:00 AM - 7:00 PM</p>
                  <p className="text-neutral-600 dark:text-neutral-400">Saturday: 9:00 AM - 8:00 PM</p>
                  <p className="text-neutral-600 dark:text-neutral-400">Sunday: 12:00 PM - 6:00 PM</p>
                </div>
              </div>
            </div>
            
            <div className="aspect-video bg-neutral-100 dark:bg-neutral-800 rounded-2xl overflow-hidden shadow-sm">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.7617743179154!2d-0.1776996852341367!3d5.556017995990464!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9a7b8b7a7b%3A0x5e5e5e5e5e5e5e5e!2sOsu%2C%20Accra%2C%20Ghana!5e0!3m2!1sen!2sus!4v1699999999999!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="The Cosmetics Vault Location"
              ></iframe>
            </div>
          </motion.div>

          <motion.form 
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-neutral-50 dark:bg-neutral-900 p-8 rounded-2xl shadow-sm space-y-6"
          >
            <h2 className="text-2xl font-bold mb-2">Send us a message</h2>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-6">
              We'll respond within 24 hours
            </p>

            <div>
              <label className="block font-semibold mb-2 text-sm">Name</label>
              <input 
                type="text" 
                value={form.name}
                onChange={e => setForm({...form, name: e.target.value})}
                className="w-full px-4 py-3 border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 text-neutral-900 dark:text-white"
                required 
              />
            </div>

            <div>
              <label className="block font-semibold mb-2 text-sm">Email</label>
              <input 
                type="email" 
                value={form.email}
                onChange={e => setForm({...form, email: e.target.value})}
                className="w-full px-4 py-3 border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 text-neutral-900 dark:text-white"
                required 
              />
            </div>

            <div>
              <label className="block font-semibold mb-2 text-sm">Subject</label>
              <input 
                type="text" 
                value={form.subject}
                onChange={e => setForm({...form, subject: e.target.value})}
                placeholder="Booking question, product inquiry..."
                className="w-full px-4 py-3 border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 text-neutral-900 dark:text-white"
                required 
              />
            </div>

            <div>
              <label className="block font-semibold mb-2 text-sm">Message</label>
              <textarea 
                rows="5" 
                value={form.message}
                onChange={e => setForm({...form, message: e.target.value})}
                className="w-full px-4 py-3 border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 text-neutral-900 dark:text-white resize-none"
                required
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="w-full bg-rose-500 text-white py-3 rounded-lg font-semibold hover:bg-rose-600 transition disabled:opacity-50"
              disabled={sent}
            >
              {sent? 'Message Sent!' : 'Send Message'}
            </button>
          </motion.form>
        </div>
      </div>
    </div>
  );
}
