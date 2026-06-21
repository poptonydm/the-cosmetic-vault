import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/NavBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import Shop from './pages/Shop';
import Booking from './pages/Booking';
import Cart from './pages/Cart';
import About from './pages/About';
import Contact from './pages/Contact';
import { ThemeProvider } from './context/ThemeContext';
import ServiceDetail from './pages/ServiceDetail';
import ProductDetail from './pages/ProductDetail';

export default function App() {
  return (
    <ThemeProvider >
      <CartProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/services/:id" element={<ServiceDetail />} />
              <Route path="/shop/:id" element={<ProductDetail />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </CartProvider>
    </ThemeProvider>
  );
}
