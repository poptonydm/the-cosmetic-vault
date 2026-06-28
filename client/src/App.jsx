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
import OrderDetails from './pages/OrderDetails';
import { Orders } from './pages/Orders';
import { OrderProvider } from './context/OrderContext';
import { Admin } from './pages/Admin';
import AppointmentDetails from './pages/AppointmentDetails';
import { Appointments } from './pages/Appointments';
import ServiceCategory from './pages/ServiceCategory';

export default function App() {
  return (
    <ThemeProvider >
      <CartProvider>
      <OrderProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1 bg-white dark:bg-neutral-950">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/services/:id" element={<ServiceDetail />} />
              <Route path="/services/category/:categoryName" element={<ServiceCategory />} />
              <Route path="/shop/:id" element={<ProductDetail />} />
              <Route path='/orders' element={<Orders />} />
              <Route path='/order/:id' element={<OrderDetails />} />
              <Route path='/appointments' element={<Appointments />} />
              <Route path='/appointment/:id' element={<AppointmentDetails />} />
              <Route path='/admin' element={<Admin />} />
            </Routes>
          </main>
          <Footer />
        </div>
        </OrderProvider>
      </CartProvider>
    </ThemeProvider>
  );
}
