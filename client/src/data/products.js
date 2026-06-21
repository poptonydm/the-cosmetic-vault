export const products = [
  { 
    id: 1, 
    name: 'Argan Oil Serum', 
    category: 'Hair Care', 
    price: 85, 
    rating: 4.8, 
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600',
    featured: true,
    description: 'Pure argan oil for shine and frizz control. Perfect for all hair types.',
    sizes: [
      { label: '50ml', price: 85 },
      { label: '100ml', price: 150 },
      { label: '200ml', price: 270 }
    ],
    inStock: true
  },
  { 
    id: 2, 
    name: 'Cuticle Oil Pen', 
    category: 'Nail Care', 
    price: 35, 
    rating: 4.9, 
    image: 'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=600',
    featured: true,
    description: 'Nourishing cuticle oil in a mess-free pen. Keeps nails healthy.',
    sizes: [{ label: '8ml', price: 35 }],
    inStock: true
  },
  { 
    id: 3, 
    name: 'Vitamin C Glow Cream', 
    category: 'Skin Care', 
    price: 120, 
    rating: 4.7, 
    image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=600',
    featured: true,
    description: 'Brightening day cream with SPF 30. Evens tone and protects.',
    sizes: [
      { label: '30ml', price: 120 },
      { label: '50ml', price: 180 }
    ],
    inStock: true
  },
  { 
    id: 4, 
    name: 'Edge Control Gel', 
    category: 'Hair Care', 
    price: 45, 
    rating: 4.6, 
    image: 'https://images.unsplash.com/photo-1571875257727-256c57303f14?w=600',
    featured: false,
    description: 'Strong hold edge control. No flaking, all-day hold.',
    sizes: [{ label: '150ml', price: 45 }],
    inStock: true
  },
  { 
    id: 5, 
    name: 'Gel Top Coat', 
    category: 'Nail Care', 
    price: 55, 
    rating: 4.8, 
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600',
    featured: false,
    description: 'High-shine top coat for gel polish. Extends wear to 3 weeks.',
    sizes: [{ label: '15ml', price: 55 }],
    inStock: true
  },
  { 
    id: 6, 
    name: 'Satin Bonnet', 
    category: 'Hair Tools', 
    price: 40, 
    rating: 4.9, 
    image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=600',
    featured: true,
    description: 'Double-layer satin bonnet. Protects styles while you sleep.',
    sizes: [
      { label: 'Standard', price: 40 },
      { label: 'XL', price: 55 }
    ],
    inStock: true
  }
];
