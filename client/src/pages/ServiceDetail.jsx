import { useParams, Link } from 'react-router-dom';
import { Clock, Check, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { services } from '../data/services';

export default function ServiceDetail() {
  const { id } = useParams();
  const service = services.find(s => s.id === parseInt(id));

  if (!service) return <div className="text-center py-20">Service not found</div>;

  return (
    <div className='bg-neutral-50 dark:bg-neutral-900'>
      <div className="max-w-6xl mx-auto px-4 py-12">
        <Link to="/services" className="inline-flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-rose-500 mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to Services
        </Link>
        
        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="aspect-[4/3] rounded-2xl overflow-hidden"
          >
            <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-3 text-neutral-900 dark:text-white">
                {service.name}
              </h1>
              <p className="text-neutral-600 dark:text-neutral-400">{service.desc}</p>
            </div>

            <div className="flex items-center gap-6">
              <span className="text-3xl font-bold text-rose-500">₵{service.price}</span>
              <span className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
                <Clock className="h-5 w-5" /> {service.duration}
              </span>
            </div>

            <div>
              <h3 className="font-semibold mb-3 text-neutral-900 dark:text-white">What's Included</h3>
              <ul className="space-y-2">
                {service.includes?.map(item => (
                  <li key={item} className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300">
                    <Check className="h-4 w-4 text-green-500" /> {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className='text-neutral-900 dark:text-white'>
              <h3 className="font-semibold mb-3">Add-ons</h3>
              <div className="space-y-2">
                {service.addons?.map(addon => (
                  <label key={addon.name} className="flex items-center justify-between p-3 border border-neutral-200 dark:border-neutral-700 rounded-lg cursor-pointer hover:border-rose-500">
                    <div className="flex items-center gap-3">
                      <input type="checkbox" className="w-4 h-4" />
                      <span>{addon.name}</span>
                    </div>
                    <span className="font-semibold">+₵{addon.price}</span>
                  </label>
                ))}
              </div>
            </div>

            <Link 
              to="/booking" 
              state={{ service }}
              className="block w-full bg-rose-500 text-white text-center py-4 rounded-xl font-semibold hover:bg-rose-600 transition"
            >
              Book This Service
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
