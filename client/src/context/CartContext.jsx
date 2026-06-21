import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [booking, setBooking] = useState(null);

  const addToCart = (product, qty = 1) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === product.id);
      if (exists) {
        return prev.map(i => i.id === product.id 
          ? { ...i, qty: i.qty + qty } 
          : i);
      }
      return [...prev, { ...product, qty }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const updateQty = (id, qty) => {
    if (qty <= 0) return removeFromCart(id);
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty } : i));
  };

  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  return (
    <CartContext.Provider value={{ 
      cart, addToCart, removeFromCart, updateQty, 
      cartTotal, cartCount, booking, setBooking 
    }}>
      {children}
    </CartContext.Provider>
  );
};
