import { useState } from 'react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

export default function Shop() {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Hair Care', 'Nail Care', 'Skin Care', 'Tools'];
  const filtered = filter === 'All'? products : products.filter(p => p.category === filter);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-4">Shop Beauty</h1>
          <p className="text-neutral-600 dark:text-neutral-400">Professional products we trust</p>
        </div>

        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-full transition ${
                filter === cat
                 ? 'bg-rose-500 text-white'
                  : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
          {filtered.map(product => <ProductCard key={product.id} product={product} />)}
        </div>
      </div>
    </div>
  );
}
