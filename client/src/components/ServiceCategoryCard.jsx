import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export default function ServiceCategoryCard({ name, count, image, desc }) {
  return (
    <Link
      to={`/services/category/${encodeURIComponent(name)}`}
      className="group block"
    >
      <div className="relative h-80 rounded-2xl overflow-hidden shadow-sm
                    hover:shadow-xl transition-all duration-300">

        {/* Background Image */}
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/60 to-transparent" />

        {/* Rose tint on hover */}
        <div className="absolute inset-0 bg-rose-500/0 group-hover:bg-rose-500/10 transition-all duration-300" />

        {/* Content */}
        <div className="absolute inset-0 p-6 flex flex-col justify-between">
          {/* Top - Arrow Button */}
          <div className="flex justify-end">
            <div className="h-10 w-10 rounded-full bg-white/10 backdrop-blur-sm
                          flex items-center justify-center
                          group-hover:bg-rose-500 group-hover:scale-110
                          transition-all duration-300">
              <ArrowUpRight className="h-5 w-5 text-white" />
            </div>
          </div>

          {/* Bottom - Text */}
          <div className="space-y-2">
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white inline-block">
              {count} {count === 1? 'Service' : 'Services'}
            </span>

            <h3 className="text-2xl font-semibold text-white">
              {name}
            </h3>

            <p className="text-white/80 text-sm line-clamp-2">
              {desc}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
