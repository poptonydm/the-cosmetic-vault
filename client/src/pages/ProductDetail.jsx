import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Minus, Plus, ArrowLeft, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import { products } from '../data/products';

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [selectedSize, setSelectedSize] = useState(0);
  
  const product = products.find(p => p.id === parseInt(id));
  if (!product) return <div className="text-center py-20">Product not found</div>;

  const currentPrice = product.sizes ? product.sizes[selectedSize].price : product.price;

  const handleAddToCart = () => {
    addToCart({ ...product, price: currentPrice, selectedSize: product.sizes?.[selectedSize].label }, qty);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <Link to="/shop" className="inline-flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-rose-500 mb-6">
        <ArrowLeft className="h-4 w-4" /> Back to Shop
      </Link>
      
      <div className="grid lg:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="aspect-square rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-800"
        >
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="text-sm text-neutral-600 dark:text-neutral-400">{product.rating} Rating</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-3 text-neutral-900 dark:text-white">
              {product.name}
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400">{product.description}</p>
          </div>

          <div className="text-3xl font-bold text-neutral-900 dark:text-white">
            ₵{currentPrice}
          </div>

          {product.sizes && (
            <div>
              <h3 className="font-semibold mb-3 text-neutral-900 dark:text-white">Size</h3>
              <div className="flex gap-3">
                {product.sizes.map((size, idx) => (
                  <button
                    key={size.label}
                    onClick={() => setSelectedSize(idx)}
                    className={`px-4 py-2 rounded-lg border-2 transition ${
                      selectedSize === idx
                        ? 'border-rose-500 bg-rose-50 dark:bg-rose-950/30'
                        : 'border-neutral-200 dark:border-neutral-700'
                    }`}
                  >
                    {size.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div>
            <h3 className="font-semibold mb-3 text-neutral-900 dark:text-white">Quantity</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-neutral-200 dark:border-neutral-700 rounded-lg">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-3 hover:bg-neutral-100 dark:hover:bg-neutral-800">
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-12 text-center font-semibold">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="p-3 hover:bg-neutral-100 dark:hover:bg-neutral-800">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <button 
            onClick={handleAddToCart}
            className="w-full bg-neutral-900 dark:bg-rose-500 text-white py-4 rounded-xl font-semibold hover:bg-rose-500 dark:hover:bg-rose-600 transition flex items-center justify-center gap-2"
          >
            <ShoppingBag className="h-5 w-5" /> Add to Cart
          </button>
        </motion.div>
      </div>
    </div>
  );
}
