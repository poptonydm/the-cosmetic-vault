import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ServiceCard from '../components/ServiceCard';
import { services } from '../data/services';

// Background images for each category
const categoryHero = {
  "Hair Services": {
    image: "https://images.unsplash.com/photo-1560869713-7d0a29430803?w=1600",
    desc: "Professional styling, braids, wigs & treatments for every hair type"
  },
  "Medical Spa": {
    image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=1600",
    desc: "Doctor-administered aesthetic treatments for skin rejuvenation"
  },
  "Pedicure & Manicure": {
    image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=1600",
    desc: "Luxury nail care, gel, acrylics & spa treatments"
  },
  "Permanent Makeup": {
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=1600",
    desc: "Microblading, lip blush & eyeliner. Wake up flawless"
  },
  "Skin Care": {
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1600",
    desc: "Medical-grade facials & treatments for clear, glowing skin"
  }
};

export default function ServiceCategory() {
  const { categoryName } = useParams();
  const decodedCategory = decodeURIComponent(categoryName);
  const hero = categoryHero[decodedCategory] || { image: '', desc: '' };

  const categoryServices = services.filter(s => s.category === decodedCategory);

  if (categoryServices.length === 0) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
        <div className="h-[60vh] flex items-center justify-center">
          <div className="text-center space-y-4">
            <p className="text-2xl font-semibold text-neutral-900 dark:text-white">
              No services in {decodedCategory}
            </p>
            <Link
              to="/services"
              className="inline-block bg-rose-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-rose-600 transition"
            >
              Back to All Categories
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      {/* Hero with Background Image */}
      <div className="relative h-[50vh] overflow-hidden">
        <img
          src={hero.image}
          alt={decodedCategory}
          className="w-full h-full object-cover"
        />

        {/* Dark overlay + rose tint */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/70 to-neutral-900/30" />
        <div className="absolute inset-0 bg-rose-900/20" />

        {/* Content */}
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-4 pb-12 w-full">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-white/80 hover:text-rose-400 mb-6 transition"
            >
              <ArrowLeft className="h-4 w-4" /> All Categories
            </Link>

            <span className="text-xs font-medium px-3 py-1 rounded-full bg-rose-500 text-white mb-4 inline-block">
              {categoryServices.length} {categoryServices.length === 1? 'Service' : 'Services'}
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
              {decodedCategory}
            </h1>

            <p className="text-white/80 text-lg max-w-2xl">
              {hero.desc}
            </p>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="mb-8">
          <p className="text-neutral-600 dark:text-neutral-400">
            Showing all services in {decodedCategory}
          </p>
        </div>

        {/* 3 cols mobile, 4 xl */}
        <div className="grid grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
          {categoryServices.map(service => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </div>
  );
}
