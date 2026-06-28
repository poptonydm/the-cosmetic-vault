import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';

export default function ServiceCard({ service }) {
  return (
    <Link to={`/services/${service.id}`} className="group">
      <div className="bg-white dark:bg-neutral-900 rounded-xl overflow-hidden
                    border border-neutral-200 dark:border-neutral-800
                    hover:shadow-xl hover:border-rose-500/40 transition-all h-full">

        <div className="aspect-[4/3] overflow-hidden bg-neutral-100 dark:bg-neutral-800">
          <img
            src={service.image}
            alt={service.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="p-3 sm:p-5 space-y-2">
          <span className="text-xs font-medium px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/30
                         text-rose-600 dark:text-rose-400 inline-block">
            {service.category}
          </span>

          <h3 className="text-base sm:text-lg font-semibold text-neutral-900 dark:text-white line-clamp-1">
            {service.name}
          </h3>

          <p className="text-neutral-600 dark:text-neutral-400 text-xs sm:text-sm line-clamp-2">
            {service.desc}
          </p>

          <div className="flex items-center justify-between pt-1">
            <span className="text-lg sm:text-xl font-bold text-rose-500">
              ₵{service.price}
            </span>
            <span className="flex items-center gap-1 text-xs text-neutral-500 dark:text-neutral-400">
              <Clock className="h-3 w-3 text-rose-500" /> {service.duration}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
