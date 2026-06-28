import { Scissors, Stethoscope, Hand, PenTool, Sparkles } from 'lucide-react';
import ServiceCategoryCard from '../components/ServiceCategoryCard';
import { services, serviceCategories } from '../data/services';

const categoryData = {
  "Hair Services": {
    desc: "Braids, silk press, wigs & treatments",
    image: "https://images.unsplash.com/photo-1560869713-7d0a29430803?w=800"
  },
  "Medical Spa": {
    desc: "Botox, fillers & advanced skin treatments",
    image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800"
  },
  "Pedicure & Manicure": {
    desc: "Luxury nails, gel, acrylics & spa care",
    image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800"
  },
  "Permanent Makeup": {
    desc: "Microblading, lip blush & eyeliner",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800"
  },
  "Skin Care": {
    desc: "Facials, peels & medical-grade skincare",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800"
  }
};

export default function Services() {
  const categories = serviceCategories.filter(cat => cat!== "All");

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-4">
            Our Services
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Choose a category to explore our treatments
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map(cat => (
            <ServiceCategoryCard
              key={cat}
              name={cat}
              count={services.filter(s => s.category === cat).length}
              image={categoryData[cat].image}
              desc={categoryData[cat].desc}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
