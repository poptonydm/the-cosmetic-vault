import { ArrowRight, Sparkles, Shield, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ServiceCard from '../components/ServiceCard';
import ProductCard from '../components/ProductCard';
import LiveTestimonials from '../components/LiveTestimonials';
import { services } from '../data/services';
import { products } from '../data/products';

const features = [
  { icon: Sparkles, title: 'Expert Stylists', desc: 'Trained pros who know texture, tone, and trends' },
  { icon: Shield, title: 'Pro Products Only', desc: 'We use and sell what we trust on our own hair & skin' },
  { icon: Clock, title: 'Easy Booking', desc: 'Book online 24/7. No waiting, no stress' }
];

export default function Home() {
  const featuredServices = services.filter(s => s.featured);
  const bestSellers = products.filter(p => p.featured);

  return (
    <div className="bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white">
      <section className="relative bg-neutral-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1600')] bg-cover bg-center opacity-40"></div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative max-w-7xl mx-auto px-4 py-24 lg:py-32"
        >
          <h1 className="text-4xl lg:text-6xl font-bold mb-6 max-w-2xl">
            Unlock Your Glow at Luxe & Glow Studio
          </h1>
          <p className="text-lg text-neutral-200 mb-8 max-w-xl">
            Premium hair, nails, and beauty services in Accra. Shop professional products. All in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              to="/services" 
              className="bg-rose-500 px-8 py-3 rounded-full font-semibold hover:bg-rose-600 transition flex items-center justify-center gap-2"
            >
              Book Appointment <ArrowRight className="h-5 w-5" />
            </Link>
            <Link 
              to="/shop" 
              className="bg-white/10 backdrop-blur px-8 py-3 rounded-full font-semibold hover:bg-white/20 transition text-center"
            >
              Shop Products
            </Link>
          </div>
        </motion.div>
      </section>

      <section className="bg-neutral-50 dark:bg-neutral-900 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="inline-flex p-4 rounded-2xl bg-rose-100 dark:bg-rose-950/50 mb-4">
                  <f.icon className="h-6 w-6 text-rose-500" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-neutral-900 dark:text-white">{f.title}</h3>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2 text-neutral-900 dark:text-white">Popular Services</h2>
            <p className="text-neutral-600 dark:text-neutral-400">Our most booked treatments</p>
          </div>
          <Link to="/services" className="text-rose-500 font-semibold hover:underline">View All</Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {featuredServices.map(service => <ServiceCard key={service.id} service={service} />)}
        </div>
      </section>

      <section className="bg-neutral-50 dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2 text-neutral-900 dark:text-white">Best Sellers</h2>
              <p className="text-neutral-600 dark:text-neutral-400">Products our clients love</p>
            </div>
            <Link to="/shop" className="text-rose-500 font-semibold hover:underline">Shop All</Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {bestSellers.map(product => <ProductCard key={product.id} product={product} />)}
          </div>
        </div>
      </section>

      <LiveTestimonials />

      <section className="bg-rose-500 text-white">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Glow?</h2>
          <p className="text-lg text-rose-100 mb-8">
            Book your appointment or shop professional products now
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/booking" 
              className="bg-white text-rose-500 px-8 py-3 rounded-full font-semibold hover:bg-neutral-100 transition"
            >
              Book Appointment
            </Link>
            <Link 
              to="/shop" 
              className="bg-rose-600 px-8 py-3 rounded-full font-semibold hover:bg-rose-700 transition"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
