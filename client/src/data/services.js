export const services = [
  // HAIR SERVICES
  {
    id: 1,
    name: "Silk Press",
    price: 250,
    duration: "2 hours",
    category: "Hair Services",
    image: "https://images.unsplash.com/photo-1560869713-7d0a29430803?w=800",
    desc: "Premium silk press with deep conditioning treatment. Bone straight finish that lasts.",
    featured: true,
    includes: [
      "Deep wash & condition",
      "Heat protectant",
      "Professional press",
      "Trim if needed"
    ],
    addons: [
      { name: "Olaplex Treatment", price: 80 },
      { name: "Scalp Massage", price: 40 }
    ]
  },
  {
    id: 2,
    name: "Box Braids",
    price: 300,
    duration: "4-6 hours",
    category: "Hair Services",
    image: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=800",
    desc: "Knotless box braids with your preferred length. Hair included.",
    includes: [
      "Hair included",
      "Scalp prep",
      "Custom parting",
      "Edge styling"
    ],
    addons: [
      { name: "Extra Length", price: 50 },
      { name: "Beads", price: 30 }
    ]
  },
  {
    id: 3,
    name: "Wig Installation",
    price: 200,
    duration: "2 hours",
    category: "Hair Services",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800",
    desc: "Professional lace frontal/closure wig install. Melted lace, natural hairline.",
    includes: [
      "Braid down",
      "Lace melting",
      "Custom baby hairs",
      "Styling"
    ]
  },

  // MEDICAL SPA
  {
    id: 4,
    name: "Botox Treatment",
    price: 1200,
    duration: "30 mins",
    category: "Medical Spa",
    image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800",
    desc: "FDA-approved Botox for wrinkle reduction. Administered by certified professional.",
    featured: true,
    includes: [
      "Consultation",
      "Treatment area mapping",
      "Botox injections",
      "Aftercare kit"
    ]
  },
  {
    id: 5,
    name: "Dermal Fillers",
    price: 1500,
    duration: "45 mins",
    category: "Medical Spa",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800",
    desc: "Hyaluronic acid fillers for lips, cheeks, or nasolabial folds.",
    includes: [
      "Consultation",
      "Numbing cream",
      "Filler injection",
      "Follow-up check"
    ]
  },
  {
    id: 6,
    name: "Microneedling",
    price: 800,
    duration: "60 mins",
    category: "Medical Spa",
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=800",
    desc: "Collagen induction therapy for acne scars, fine lines, and skin texture.",
    includes: [
      "Deep cleanse",
      "Numbing cream",
      "Microneedling treatment",
      "Serum infusion",
      "LED therapy"
    ]
  },

  // PEDICURE & MANICURE
  {
    id: 7,
    name: "Luxury Gel Pedicure",
    price: 180,
    duration: "60 mins",
    category: "Pedicure & Manicure",
    image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800",
    desc: "Spa pedicure with callus removal, sugar scrub, mask, and gel polish.",
    featured: true,
    includes: [
      "Foot soak",
      "Callus removal",
      "Sugar scrub",
      "Foot mask",
      "Gel polish"
    ],
    addons: [
      { name: "Paraffin Wax", price: 50 },
      { name: "Nail Art", price: 60 }
    ]
  },
  {
    id: 8,
    name: "Acrylic Full Set",
    price: 200,
    duration: "90 mins",
    category: "Pedicure & Manicure",
    image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800",
    desc: "Acrylic nails with your choice of shape and length. Includes gel polish.",
    includes: [
      "Nail prep",
      "Acrylic application",
      "Shape & length",
      "Gel polish"
    ],
    addons: [
      { name: "Nail Art", price: 40 },
      { name: "Chrome Finish", price: 30 }
    ]
  },
  {
    id: 9,
    name: "Russian Manicure",
    price: 150,
    duration: "75 mins",
    category: "Pedicure & Manicure",
    image: "https://images.unsplash.com/photo-1519415387722-a1c3bbef716c?w=800",
    desc: "Detailed cuticle work with e-file for perfect, long-lasting manicure.",
    includes: [
      "E-file cuticle work",
      "Shape & buff",
      "Gel polish",
      "Cuticle oil"
    ]
  },

  // PERMANENT MAKEUP
  {
    id: 10,
    name: "Microblading",
    price: 1800,
    duration: "2.5 hours",
    category: "Permanent Makeup",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800",
    desc: "Semi-permanent eyebrow tattoo using hair-stroke technique. Lasts 1-3 years.",
    featured: true,
    includes: [
      "Consultation & mapping",
      "Numbing cream",
      "Microblading session",
      "Aftercare kit",
      "6-week touch-up"
    ]
  },
  {
    id: 11,
    name: "Lip Blush",
    price: 1500,
    duration: "2 hours",
    category: "Permanent Makeup",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800",
    desc: "Semi-permanent lip tint for natural color and definition.",
    includes: [
      "Color consultation",
      "Numbing",
      "Lip blush tattoo",
      "Aftercare balm"
    ]
  },
  {
    id: 12,
    name: "Eyeliner Tattoo",
    price: 1200,
    duration: "2 hours",
    category: "Permanent Makeup",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800",
    desc: "Permanent eyeliner for upper or lower lash line. Wake up ready.",
    includes: [
      "Style consultation",
      "Numbing",
      "Eyeliner tattoo",
      "Aftercare"
    ]
  },

  // SKIN CARE
  {
    id: 13,
    name: "HydraFacial",
    price: 600,
    duration: "60 mins",
    category: "Skin Care",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800",
    desc: "Medical-grade facial: cleanse, extract, hydrate. Instant glow, no downtime.",
    featured: true,
    includes: [
      "Deep cleanse",
      "Gentle peel",
      "Painless extractions",
      "Hydration infusion",
      "LED light therapy"
    ],
    addons: [
      { name: "Dermaplaning", price: 80 },
      { name: "Lip Perk", price: 50 }
    ]
  },
  {
    id: 14,
    name: "Chemical Peel",
    price: 500,
    duration: "45 mins",
    category: "Skin Care",
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=800",
    desc: "Professional chemical peel for acne, pigmentation, and texture.",
    includes: [
      "Skin prep",
      "Peel application",
      "Neutralizer",
      "Soothing mask",
      "SPF"
    ]
  },
  {
    id: 15,
    name: "Dermaplaning Facial",
    price: 350,
    duration: "50 mins",
    category: "Skin Care",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800",
    desc: "Removes dead skin and peach fuzz for ultra-smooth skin.",
    includes: [
      "Double cleanse",
      "Dermaplaning",
      "Hydrating mask",
      "Serum + SPF"
    ]
  }
];

export const serviceCategories = [
  "All",
  "Hair Services",
  "Medical Spa",
  "Pedicure & Manicure",
  "Permanent Makeup",
  "Skin Care"
];
