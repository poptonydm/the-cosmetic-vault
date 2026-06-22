import { useState } from 'react';
import { ShoppingBag, Menu, X, Scissors } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { cartCount } = useCart();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Shop', path: '/shop' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Orders', path: '/orders' },
    { name: 'Appointments', path: '/appointments' }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm border-b border-neutral-100 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-2">
            <Scissors className="h-6 w-6 text-rose-500" />
            <span className="text-xl font-bold text-neutral-900 dark:text-white">Luxe & Glow</span>
            </Link>


          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <Link key={link.name} to={link.path} className="text-neutral-700 dark:text-neutral-300 hover:text-rose-500 transition">
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link to="/cart" className="relative p-2">
              <ShoppingBag className="h-6 w-6 text-neutral-700 dark:text-neutral-300" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link to="/services" className="hidden md:block bg-rose-500 text-white px-5 py-2 rounded-full hover:bg-rose-600 transition">
              Book Now
            </Link>
            <button onClick={() => setOpen(!open)} className="md:hidden">
              {open? <X className="text-neutral-700 dark:text-neutral-300" /> : <Menu className="text-neutral-700 dark:text-neutral-300" />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-neutral-100 dark:border-neutral-800 bg-white dark:bg-neutral-900">
          {navLinks.map(link => (
            <Link key={link.name} to={link.path} className="block px-4 py-3 text-neutral-700 dark:text-neutral-300" onClick={() => setOpen(false)}>
              {link.name}
            </Link>
          ))}
          <Link to="/services" className="block m-4 bg-rose-500 text-white text-center py-2 rounded-full" onClick={() => setOpen(false)}>
            Book Now
          </Link>
        </div>
      )}
    </nav>
  );
}
