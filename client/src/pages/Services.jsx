import ServiceCard from '../components/ServiceCard';
import { services } from '../data/services';

export default function Services() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-4">Our Services</h1>
          <p className="text-neutral-600 dark:text-neutral-400">Premium beauty treatments tailored for you</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
          {services.map(service => <ServiceCard key={service.id} service={service} />)}
        </div>
      </div>
    </div>
  );
}
