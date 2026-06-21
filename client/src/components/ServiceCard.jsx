import { Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function ServiceCard({ service }) {
  return (
    <motion.div
      whileHover={{ rotateX: 5, rotateY: -5, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300 }}
      style={{ perspective: 1000 }}
    >
      <Link to={`/services/${service.id}`} className="block">
        <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group">
          <div className="aspect-[4/3] bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
            <img 
              src={service.image} 
              alt={service.name} 
              className="w-full h-full object-cover group-hover:scale-110 transition duration-500" 
            />
          </div>
          <div className="p-3 sm:p-5">
            <h3 className="text-base sm:text-lg font-semibold mb-1 text-neutral-900 dark:text-white line-clamp-1">
              {service.name}
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 text-xs sm:text-sm mb-3 line-clamp-2">
              {service.desc}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-lg sm:text-xl font-bold text-rose-500">₵{service.price}</span>
              <span className="flex items-center gap-1 text-xs text-neutral-500 dark:text-neutral-400">
                <Clock className="h-3 w-3" /> {service.duration}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
