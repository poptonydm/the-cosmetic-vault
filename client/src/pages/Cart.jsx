import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { cart, updateQty, removeFromCart, cartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
        <Link to="/shop" className="inline-block bg-rose-500 text-white px-8 py-3 rounded-full hover:bg-rose-600 transition">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
        {cart.map(item => (
            <div key={item.id} className="bg-white dark:bg-neutral-900 p-4 rounded-2xl shadow-sm">
                <div className="flex gap-4 mb-4">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                <div className="flex-1">
                    <h3 className="font-semibold text-neutral-900 dark:text-white">{item.name}</h3>
                    <p className="text-sm text-neutral-500">{item.selectedSize}</p>
                    <p className="text-lg font-bold mt-1 text-neutral-900 dark:text-white">₵{item.price}</p>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="text-neutral-400 hover:text-red-500">
                    <Trash2 className="h-5 w-5" />
                </button>
                </div>
                
                <div className="flex items-center justify-between">
                <div className="flex items-center border border-neutral-200 dark:border-neutral-700 rounded-lg">
                    <button onClick={() => updateQty(item.id, item.qty - 1)} className="p-2">
                    <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-10 text-center">{item.qty}</span>
                    <button onClick={() => updateQty(item.id, item.qty + 1)} className="p-2">
                    <Plus className="h-4 w-4" />
                    </button>
                </div>
                
                <button 
                    onClick={() => alert(`Checking out ${item.name} for ₵${item.price * item.qty}`)}
                    className="bg-rose-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-rose-600 transition"
                >
                    Buy Now
                </button>
                </div>
            </div>
            ))}
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm h-fit sticky top-24">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-2 mb-4 text-neutral-700">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₵{cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery</span>
              <span>₵15.00</span>
            </div>
          </div>
          <div className="border-t border-neutral-200 pt-4 mb-6">
            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>
              <span>₵{(cartTotal + 15).toFixed(2)}</span>
            </div>
          </div>
          <button className="w-full bg-neutral-900 text-white py-3 rounded-lg hover:bg-rose-500 transition">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
