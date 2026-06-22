import { Phone, Mail, MapPin } from 'lucide-react';
import { FaTwitter, FaInstagram, FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-300">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="text-neutral-900 dark:text-neutral-300 text-2xl font-bold mb-4">Luxe & Glow Studio</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-6">
              Your premier beauty destination in Accra for hair, nails, skin, and professional products.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-rose-500 transition">
                <FaInstagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-rose-500 transition">
                <FaFacebookF className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-rose-500 transition">
                <FaTwitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="md:col-span-3 text-neutral-900 dark:text-neutral-300">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
              <div>
                <h4 className="font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-3 text-sm">
                  <li><Link to="/services" className="hover:text-rose-500 transition">Services</Link></li>
                  <li><Link to="/shop" className="hover:text-rose-500 transition">Shop Products</Link></li>
                  <li><Link to="/booking" className="hover:text-rose-500 transition">Book Appointment</Link></li>
                  <li><Link to="/about" className="hover:text-rose-500 transition">About Us</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Services</h4>
                <ul className="space-y-3 text-sm">
                  <li>Hair Styling & Braids</li>
                  <li>Pedicure & Manicure</li>
                  <li>Facials & Massage</li>
                  <li>Nails and Lashes</li>
                </ul>
              </div>

              <div className="col-span-2 lg:col-span-1">
                <h4 className="font-semibold mb-4">Contact</h4>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-rose-500 flex-shrink-0 mt-0.5" />
                    <span>Madina, Accra, Ghana</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-rose-500" />
                    <span>+233 20 123 4567</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-rose-500" />
                    <span>hello@cosmeticsvault.com</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-neutral-500">
            <p>© 2026 Luxe & Glow Studio. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-neutral-300 transition">Privacy Policy</a>
              <a href="#" className="hover:text-neutral-300 transition">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
