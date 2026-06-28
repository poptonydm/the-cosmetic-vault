import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, Check, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { services } from '../data/services';

export default function ServiceDetail() {
  const { id } = useParams();
  const service = services.find(s => s.id === parseInt(id));
  const [selectedAddons, setSelectedAddons] = useState([]);

  if (!service) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">
            Service not found
          </p>
          <Link
            to="/services"
            className="inline-block bg-rose-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-rose-600 transition"
          >
            Back to Services
          </Link>
        </div>
      </div>
    );
  }

  const toggleAddon = (addon) => {
    setSelectedAddons(prev =>
      prev.includes(addon.name)
    ? prev.filter(a => a!== addon.name)
        : [...prev, addon.name]
    );
  };

  const totalPrice = service.price + selectedAddons.reduce((sum, name) => {
    const addon = service.addons?.find(a => a.name === name);
    return sum + (addon?.price || 0);
  }, 0);

  return (
    <div className='bg-neutral-50 dark:bg-neutral-950'>
      <div className="max-w-6xl mx-auto px-4 py-12">
        <Link
          to="/services"
          className="inline-flex items-center gap-2 text-neutral-600 dark:text-neutral-400
                   hover:text-rose-500 mb-6 transition"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Services
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="aspect-[4/3] rounded-2xl overflow-hidden bg-white dark:bg-neutral-900
                     border border-neutral-200 dark:border-neutral-800 shadow-sm"
          >
            <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <span className="text-xs font-medium px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/30
                           text-rose-600 dark:text-rose-400 mb-3 inline-block">
                {service.category}
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold mb-3 text-neutral-900 dark:text-white">
                {service.name}
              </h1>
              <p className="text-neutral-600 dark:text-neutral-400">{service.desc}</p>
            </div>

            <div className="flex items-center gap-6">
              <span className="text-3xl font-bold text-rose-500">₵{totalPrice}</span>
              <span className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
                <Clock className="h-5 w-5 text-rose-500" /> {service.duration}
              </span>
            </div>

            <div>
              <h3 className="font-semibold mb-3 text-lg text-neutral-900 dark:text-white">
                What's Included
              </h3>
              <ul className="space-y-2">
                {service.includes?.map(item => (
                  <li key={item} className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300">
                    <div className="h-5 w-5 rounded-full bg-rose-50 dark:bg-rose-950/30 flex items-center justify-center flex-shrink-0">
                      <Check className="h-3 w-3 text-rose-500" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {service.addons && service.addons.length > 0 && (
              <div>
                <h3 className="font-semibold mb-3 text-lg text-neutral-900 dark:text-white">
                  Add-ons
                </h3>
                <div className="space-y-2">
                  {service.addons.map(addon => (
                    <label
                      key={addon.name}
                      className="flex items-center justify-between p-4 border-2 border-neutral-200 dark:border-neutral-800
                               rounded-xl cursor-pointer hover:border-rose-500/40 hover:bg-rose-50 dark:hover:bg-rose-950/20
                               transition group"
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={selectedAddons.includes(addon.name)}
                          onChange={() => toggleAddon(addon)}
                          className="w-4 h-4 rounded border-neutral-300 dark:border-neutral-700
                                   text-rose-500 focus:ring-rose-500 focus:ring-2 cursor-pointer"
                        />
                        <span className="text-neutral-900 dark:text-white">{addon.name}</span>
                      </div>
                      <span className="font-bold text-rose-500">+₵{addon.price}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            <Link
              to="/booking"
              state={{ service: {...service, price: totalPrice, addons: selectedAddons} }}
              className="w-full py-4 rounded-xl font-semibold text-center block
                       bg-rose-500 text-white hover:bg-rose-600 transition"
            >
              Book This Service — ₵{totalPrice}
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
