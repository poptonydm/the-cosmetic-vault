export const services = [
    { 
      id: 1, 
      name: 'Hair Styling', 
      desc: 'Sleek, smooth finish for natural hair with deep conditioning', 
      price: 250, 
      duration: '2 hrs', 
      category: 'Hair', 
      image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600',
      featured: true,
      includes: ['Consultation', 'Wash & Deep Condition', 'Blow Dry', 'Silk Press', 'Trim'],
      addons: [
        { name: 'Steam Treatment', price: 50 },
        { name: 'Color Touch-up', price: 100 },
        { name: 'Treatment Mask', price: 40 }
      ]
    },
    { 
      id: 2, 
      name: 'Braids', 
      desc: 'Classic protective style, multiple lengths available', 
      price: 350, 
      duration: '5 hrs', 
      category: 'Hair', 
      image: 'https://images.unsplash.com/photo-1605496036005-f3c4b98fdbd1?w=600',
      featured: false,
      includes: ['Consultation', 'Hair Prep', 'Braiding', 'Styling'],
      addons: [
        { name: 'Hair Extensions', price: 120 },
        { name: 'Scalp Treatment', price: 60 }
      ]
    },
    { 
      id: 3, 
      name: 'Luxury Pedicure', 
      desc: 'Soak, scrub, massage + gel polish that lasts weeks', 
      price: 180, 
      duration: '1.5 hrs', 
      category: 'Nails', 
      image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600',
      featured: true,
      includes: ['Foot Soak', 'Scrub & Exfoliate', 'Massage', 'Cuticle Care', 'Gel Polish'],
      addons: [
        { name: 'Paraffin Wax', price: 40 },
        { name: 'Nail Art', price: 50 }
      ]
    },
    { 
      id: 4, 
      name: 'Acrylic Full Set', 
      desc: 'Custom length and shape with premium acrylic', 
      price: 220, 
      duration: '2 hrs', 
      category: 'Nails', 
      image: 'https://images.unsplash.com/photo-1632345031435-1d03b4b5c5a3?w=600',
      featured: false,
      includes: ['Nail Prep', 'Acrylic Application', 'Shaping', 'Gel Polish'],
      addons: [
        { name: 'Chrome Powder', price: 30 },
        { name: 'Rhinestones', price: 40 }
      ]
    },
    { 
      id: 5, 
      name: 'CLasic Lashes', 
      desc: 'Full face for events, weddings & photoshoots', 
      price: 300, 
      duration: '1 hr', 
      category: 'Makeup', 
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600',
      featured: true,
      includes: ['Skin Prep', 'Full Face Makeup', 'Lashes', 'Setting Spray'],
      addons: [
        { name: 'Airbrush Finish', price: 80 },
        { name: 'Touch-up Kit', price: 60 }
      ]
    },
    { 
      id: 6, 
      name: 'Hydrating Facial', 
      desc: 'Deep cleanse + moisture boost for glowing skin', 
      price: 280, 
      duration: '1 hr', 
      category: 'Skin', 
      image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600',
      featured: false,
      includes: ['Double Cleanse', 'Exfoliation', 'Mask', 'Moisturizer', 'SPF'],
      addons: [
        { name: 'LED Light Therapy', price: 70 },
        { name: 'Dermaplaning', price: 90 }
      ]
    }
  ];