import { ShoppingBag, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  
  return (
    <motion.div
      whileHover={{ y: -8, rotateX: 3 }}
      transition={{ type: 'spring', stiffness: 400 }}
    >
      <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group">
        <Link to={`/shop/${product.id}`}>
          <div className="aspect-square bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover group-hover:scale-110 transition duration-500" 
            />
          </div>
        </Link>
        <div className="p-3 sm:p-4">
          <div className="flex items-center gap-1 mb-1">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            <span className="text-xs text-neutral-600 dark:text-neutral-400">{product.rating}</span>
          </div>
          <Link to={`/shop/${product.id}`}>
            <h3 className="font-semibold mb-1 text-sm sm:text-base text-neutral-900 dark:text-white line-clamp-1">
              {product.name}
            </h3>
          </Link>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-2">{product.category}</p>
          <div className="flex items-center justify-between">
            <span className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white">₵{product.price}</span>
            <button 
              onClick={(e) => { e.preventDefault(); addToCart(product); }}
              className="bg-neutral-900 dark:bg-rose-500 text-white p-2 rounded-lg hover:bg-rose-500 dark:hover:bg-rose-600 transition"
            >
              <ShoppingBag className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
