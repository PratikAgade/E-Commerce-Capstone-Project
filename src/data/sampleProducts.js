const sampleProducts = [
  {
    id: "1",    title: "Apple iPhone 14 Pro (256GB, Graphite)",    category: "electronics",    subcategory: "smartphones",    price: 114900,
    currency: "INR",    imageUrl: "https://images.unsplash.com/photo-1664478546384-d57e961dbb0d?q=80&w=2070&auto=format&fit=crop",    description: "A dramatically more powerful camera system. A display so responsive, every interaction feels new again. The world's fastest smartphone chip. All in a design that's unmatched.",    rating: 4.8,
    reviewCount: 1258,
    tags: ["apple", "smartphone", "premium", "tech", "gadgets", "iphone"],    priceRange: "high"  },
  {
    id: "2",    title: "Apple MacBook Pro 16-inch (M2 Pro, 32GB RAM, 1TB SSD)",    category: "electronics",    subcategory: "laptops",    price: 249900,
    currency: "INR",    imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=2026&auto=format&fit=crop",    description: "The most powerful MacBook Pro ever is here. With the blazing-fast M2 Pro chip — the first of its kind — you get groundbreaking performance and amazing battery life.",    rating: 4.9,
    reviewCount: 847,
    tags: ["apple", "laptop", "macbook", "premium", "tech", "gadgets"],    priceRange: "high"  },
  {
    id: "3",    title: "Apple iPad Pro 12.9-inch (M2, 512GB, Wi-Fi + Cellular)",    category: "electronics",     subcategory: "tablets",    price: 149900,
    currency: "INR",    imageUrl: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=2069&auto=format&fit=crop",    description: "The ultimate iPad experience with the blazing-fast M2 chip, 12.9-inch Liquid Retina XDR display, and support for Apple Pencil and Magic Keyboard.",    rating: 4.7,
    reviewCount: 632,
    tags: ["apple", "tablet", "ipad", "premium", "tech", "gadgets"],    priceRange: "high"  },
  {
    id: "4",    title: "Apple Watch Series 8 (GPS + Cellular, 45mm)",    category: "electronics",    subcategory: "wearables",    price: 48900,
    currency: "INR",    imageUrl: "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?q=80&w=2065&auto=format&fit=crop",    description: "Advanced health sensors and apps in a stunning design. Measure your blood oxygen, take an ECG, and track temperature changes for insights into your menstrual cycle.",    rating: 4.6,
    reviewCount: 913,
    tags: ["apple", "smartwatch", "watch", "premium", "tech", "gadgets", "wearable"],    priceRange: "medium"  },
  {
    id: "5",    title: "Apple AirPods Pro (2nd Generation)",    category: "electronics",    subcategory: "audio",    price: 26900,
    currency: "INR",    imageUrl: "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?q=80&w=2033&auto=format&fit=crop",    description: "Rethink what's possible with earbuds. Breakthrough audio quality with up to 2x more active noise cancellation than the previous generation.",    rating: 4.7,
    reviewCount: 1542,
    tags: ["apple", "audio", "earbuds", "airpods", "premium", "tech", "gadgets"],    priceRange: "medium"  },
  {
    id: "21",    title: "Apple iPhone SE (64GB, Black)",    category: "electronics",    subcategory: "smartphones",    price: 34900,
    currency: "INR",    imageUrl: "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?q=80&w=1974&auto=format&fit=crop",    description: "iPhone SE packs our most powerful chip into our most popular size at our most affordable price. It's just what you've been waiting for.",    rating: 4.5,
    reviewCount: 896,
    tags: ["apple", "smartphone", "budget", "tech", "gadgets", "iphone"],    priceRange: "medium"  },
  {
    id: "22",    title: "Apple iPad (9th generation, 64GB, Wi-Fi)",    category: "electronics",    subcategory: "tablets",    price: 29900,
    currency: "INR",    imageUrl: "https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?q=80&w=1964&auto=format&fit=crop",    description: "Powerful. Easy to use. Versatile. The new iPad is designed for all the things you love to do. Work, play, create, learn, stay connected, and more.",    rating: 4.6,
    reviewCount: 743,
    tags: ["apple", "tablet", "ipad", "budget", "tech", "gadgets"],    priceRange: "medium"  },
  {
    id: "6",    title: "Samsung Galaxy S23 Ultra (512GB, Phantom Black)",    category: "electronics",    subcategory: "smartphones",    price: 124999,
    currency: "INR",    imageUrl: "https://images.unsplash.com/photo-1675785732629-eddd4ae8052a?q=80&w=2074&auto=format&fit=crop",    description: "Meet the Samsung Galaxy S23 Ultra with an embedded S Pen, Nightography camera, and powerful performance on our smoothest display.",    rating: 4.7,
    reviewCount: 1087,
    tags: ["samsung", "smartphone", "premium", "tech", "gadgets", "galaxy"],    priceRange: "high"  },
  {
    id: "7",    title: "Samsung Galaxy Book3 Ultra (16-inch, Core i9, 32GB, 1TB)",    category: "electronics",    subcategory: "laptops",    price: 198999,
    currency: "INR",    imageUrl: "https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?q=80&w=2070&auto=format&fit=crop",    description: "The ultimate PC experience with the powerful Intel Core i9 processor and NVIDIA RTX graphics card, all in a premium, thin design.",    rating: 4.5,
    reviewCount: 326,
    tags: ["samsung", "laptop", "premium", "tech", "gadgets"],    priceRange: "high"  },
  {
    id: "8",    title: "Samsung Galaxy Tab S9 Ultra (512GB, Graphite)",    category: "electronics",    subcategory: "tablets",    price: 119999,
    currency: "INR",    imageUrl: "https://images.unsplash.com/photo-1662219708489-dd8f9b4d8076?q=80&w=1974&auto=format&fit=crop",    description: "The most epic Galaxy Tab ever. With the largest screen and most powerful chip in a Galaxy tablet, plus S Pen included.",    rating: 4.6,
    reviewCount: 418,
    tags: ["samsung", "tablet", "premium", "tech", "gadgets"],    priceRange: "high"  },
  {
    id: "9",    title: "Samsung Galaxy Watch5 Pro (Titanium, LTE)",    category: "electronics",    subcategory: "wearables",    price: 44999,
    currency: "INR",    imageUrl: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=2072&auto=format&fit=crop",    description: "Our most advanced outdoor watch yet. With a durable titanium design, extended battery life, and advanced GPS tracking.",    rating: 4.4,
    reviewCount: 782,
    tags: ["samsung", "smartwatch", "watch", "premium", "tech", "gadgets", "wearable"],    priceRange: "medium"  },
  {
    id: "10",    title: "Samsung Galaxy Buds2 Pro (Graphite)",    category: "electronics",    subcategory: "audio",    price: 17999,
    currency: "INR",    imageUrl: "https://images.unsplash.com/photo-1627424097420-7813333cad90?q=80&w=2004&auto=format&fit=crop",    description: "Our best earbuds yet with Hi-Fi sound quality, intelligent ANC, and enhanced 360 audio for a more immersive experience.",    rating: 4.5,
    reviewCount: 916,
    tags: ["samsung", "audio", "earbuds", "premium", "tech", "gadgets"],    priceRange: "medium"  },
  {
    id: "23",    title: "Samsung Galaxy A54 (128GB, Awesome Black)",    category: "electronics",    subcategory: "smartphones",    price: 38999,
    currency: "INR",    imageUrl: "https://images.unsplash.com/photo-1610945264803-c22b62d2a7b3?q=80&w=1974&auto=format&fit=crop",    description: "Awesome camera. Awesome battery. Awesome Galaxy. Experience clear photos with the 64MP OIS Camera, smooth scrolling on a 120Hz display, and a long-lasting battery.",    rating: 4.3,
    reviewCount: 649,
    tags: ["samsung", "smartphone", "budget", "tech", "gadgets", "galaxy"],    priceRange: "medium"  },
  {
    id: "24",    title: "Samsung Galaxy Tab A8 (64GB, Wi-Fi)",    category: "electronics",    subcategory: "tablets",    price: 17999,
    currency: "INR",    imageUrl: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=1972&auto=format&fit=crop",    description: "Immerse in a world of rich content. Enjoy having all your entertainment needs right at your fingertips with the Galaxy Tab A8.",    rating: 4.2,
    reviewCount: 512,
    tags: ["samsung", "tablet", "budget", "tech", "gadgets"],    priceRange: "low"  },
  {
    id: "11",    title: "PlayStation 5 (Disc Edition)",    category: "electronics",    subcategory: "gaming",    price: 54990,
    currency: "INR",    imageUrl: "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?q=80&w=2027&auto=format&fit=crop",    description: "Experience lightning-fast loading, deeper immersion with haptic feedback, adaptive triggers, and stunning 4K graphics with the next-gen PlayStation console.",    rating: 4.8,
    reviewCount: 2154,
    tags: ["gaming", "console", "playstation", "sony", "premium", "tech", "gadgets"],    priceRange: "medium"  },
  {
    id: "12",    title: "Xbox Series X",    category: "electronics",    subcategory: "gaming",    price: 49990,
    currency: "INR",    imageUrl: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?q=80&w=1932&auto=format&fit=crop",    description: "The fastest, most powerful Xbox ever. Experience 4K gaming at up to 120 frames per second, advanced 3D spatial sound, and more.",    rating: 4.7,
    reviewCount: 1879,
    tags: ["gaming", "console", "xbox", "microsoft", "premium", "tech", "gadgets"],    priceRange: "medium"  },
  {
    id: "13",    title: "Nintendo Switch OLED Model",    category: "electronics",    subcategory: "gaming",    price: 34999,
    currency: "INR",    imageUrl: "https://images.unsplash.com/photo-1643813811810-62d6963a4590?q=80&w=1974&auto=format&fit=crop",    description: "Enhanced gaming experience with a vibrant 7-inch OLED screen, wide adjustable stand, wired LAN port, and enhanced audio.",    rating: 4.6,
    reviewCount: 1652,
    tags: ["gaming", "console", "nintendo", "handheld", "tech", "gadgets"],    priceRange: "medium"  },
  {
    id: "14",    title: "Razer Blade 17 Gaming Laptop (RTX 4090, 32GB RAM, 1TB SSD)",    category: "electronics",    subcategory: "gaming",    price: 399999,
    currency: "INR",    imageUrl: "https://images.unsplash.com/photo-1603574670812-d24560880210?q=80&w=2060&auto=format&fit=crop",    description: "Ultimate gaming laptop with NVIDIA GeForce RTX 4090 graphics, Intel Core i9 processor, and a 17-inch 240Hz QHD display.",    rating: 4.8,
    reviewCount: 438,
    tags: ["gaming", "laptop", "razer", "premium", "tech", "gadgets"],    priceRange: "high"  },
  {
    id: "15",    title: "Oculus Quest 2 - Advanced VR Headset",    category: "electronics",    subcategory: "gaming",    price: 35999,
    currency: "INR",    imageUrl: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?q=80&w=2070&auto=format&fit=crop",    description: "All-in-one VR gaming with no PC or console needed. Experience immersive entertainment with our most advanced all-in-one VR system yet.",    rating: 4.7,
    reviewCount: 1243,
    tags: ["gaming", "vr", "oculus", "meta", "tech", "gadgets"],    priceRange: "medium"  },
  {
    id: "25",    title: "Xbox Series S",    category: "electronics",    subcategory: "gaming",    price: 29990,
    currency: "INR",    imageUrl: "https://images.unsplash.com/photo-1621259182685-1f0f891dc865?q=80&w=1932&auto=format&fit=crop",    description: "Experience next-gen speed and performance with the Xbox Series S. The most compact Xbox ever, with games from four generations.",    rating: 4.5,
    reviewCount: 1254,
    tags: ["gaming", "console", "xbox", "microsoft", "budget", "tech", "gadgets"],    priceRange: "medium"  },
  {
    id: "26",    title: "Sony PlayStation 4 Slim (1TB)",    category: "electronics",    subcategory: "gaming",    price: 29990,
    currency: "INR",    imageUrl: "https://images.unsplash.com/photo-1578303101084-a1e8d74e909e?q=80&w=1974&auto=format&fit=crop",    description: "Incredible games, non-stop entertainment. The slim PS4 has streamlined design and a thrilling gaming experience.",    rating: 4.6,
    reviewCount: 2587,
    tags: ["gaming", "console", "playstation", "sony", "budget", "tech", "gadgets"],    priceRange: "medium"  },
  {
    id: "16",    title: "Dyson V15 Detect Cordless Vacuum Cleaner",    category: "electronics",    subcategory: "household",    price: 65900,
    currency: "INR",    imageUrl: "https://images.unsplash.com/photo-1558317374-067fb5f30001?q=80&w=2070&auto=format&fit=crop",    description: "The most powerful, intelligent cordless vacuum. Detect and remove dust you didn't even know was there with laser dust detection.",    rating: 4.8,
    reviewCount: 874,
    tags: ["household", "appliance", "dyson", "premium", "tech", "gadgets", "cleaning"],    priceRange: "high"  },
  {
    id: "17",    title: "LG C2 65-inch OLED 4K Smart TV",    category: "electronics",    subcategory: "household",    price: 189990,
    currency: "INR",    imageUrl: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=2070&auto=format&fit=crop",    description: "Experience stunning picture quality with perfect blacks, infinite contrast, and over a billion colors, powered by the advanced α9 Gen5 AI Processor.",    rating: 4.9,
    reviewCount: 1324,
    tags: ["household", "tv", "lg", "premium", "tech", "gadgets", "entertainment"],    priceRange: "high"  },
  {
    id: "18",    title: "Philips Smart WiFi LED Lighting Starter Kit",    category: "electronics",    subcategory: "household",    price: 12999,
    currency: "INR",    imageUrl: "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=2070&auto=format&fit=crop",    description: "Transform your home with millions of colors and shades of white light. Control via app or voice and create the perfect ambiance for any moment.",    rating: 4.5,
    reviewCount: 752,
    tags: ["household", "lighting", "smart-home", "philips", "tech", "gadgets"],    priceRange: "low"  },
  {
    id: "19",    title: "Bose Smart Soundbar 900 with Dolby Atmos",    category: "electronics",    subcategory: "household",    price: 104900,
    currency: "INR",    imageUrl: "https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=2070&auto=format&fit=crop",    description: "The most immersive Bose soundbar yet. With Dolby Atmos, proprietary spatial technologies, and Alexa and Google Assistant built-in.",    rating: 4.7,
    reviewCount: 586,
    tags: ["household", "audio", "speakers", "bose", "premium", "tech", "gadgets", "entertainment"],    priceRange: "high"  },
  {
    id: "20",    title: "Instant Pot Duo Plus 9-in-1 Electric Pressure Cooker",    category: "electronics",    subcategory: "household",    price: 14999,
    currency: "INR",    imageUrl: "https://images.unsplash.com/photo-1600490036275-35c83f4c4672?q=80&w=2069&auto=format&fit=crop",    description: "9 appliances in 1: pressure cooker, slow cooker, rice cooker, steamer, sauté pan, yogurt maker, warmer, sterilizer and sous vide. With 15 customizable programs.",    rating: 4.8,
    reviewCount: 1935,
    tags: ["household", "kitchen", "appliance", "cooking", "gadgets"],    priceRange: "low"  },
  {
    id: "27",    title: "Samsung 43-inch Crystal 4K UHD Smart TV",    category: "electronics",    subcategory: "household",    price: 35990,
    currency: "INR",    imageUrl: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?q=80&w=1969&auto=format&fit=crop",    description: "Dynamic Crystal Color and a powerful 4K UHD processor optimize color, contrast, and HDR. Smart features let you find your favorite content fast.",    rating: 4.4,
    reviewCount: 952,
    tags: ["household", "tv", "samsung", "budget", "tech", "gadgets", "entertainment"],    priceRange: "medium"  },
  {
    id: "28",    title: "Xiaomi Mi Robot Vacuum Mop",    category: "electronics",    subcategory: "household",    price: 24999,
    currency: "INR",    imageUrl: "https://images.unsplash.com/photo-1593916086971-033f8232d205?q=80&w=2071&auto=format&fit=crop",    description: "2-in-1 sweeping and mopping, intelligent planning, app control, and automatic recharging. Makes cleaning effortless with smart mapping technology.",    rating: 4.3,
    reviewCount: 431,
    tags: ["household", "appliance", "xiaomi", "budget", "tech", "gadgets", "cleaning"],    priceRange: "medium"  },
  {
    id: "29",    title: "OnePlus 11 5G (16GB RAM, 256GB, Titan Black)",    category: "electronics",    subcategory: "smartphones",    price: 59999,
    currency: "INR",    imageUrl: "https://images.unsplash.com/photo-1682687980918-3c66d5972d9a?q=80&w=1974&auto=format&fit=crop",    description: "Experience the power of Snapdragon 8 Gen 2, Hasselblad Camera for Mobile, super-fast 100W charging, and vibrant 120Hz display.",    rating: 4.6,
    reviewCount: 792,
    tags: ["oneplus", "smartphone", "premium", "tech", "gadgets"],    priceRange: "medium"  },
  {
    id: "30",    title: "OnePlus Nord 3 5G (8GB RAM, 128GB, Tempest Gray)",    category: "electronics",    subcategory: "smartphones",    price: 28999,
    currency: "INR",    imageUrl: "https://images.unsplash.com/photo-1684989627005-53ef03baf2f7?q=80&w=1974&auto=format&fit=crop",    description: "Featuring MediaTek Dimensity 9000, 120Hz AMOLED display, 50MP main camera, 5000mAh battery, and 80W fast charging.",    rating: 4.4,
    reviewCount: 587,
    tags: ["oneplus", "smartphone", "budget", "tech", "gadgets"],    priceRange: "medium"  },
  {
    id: "31",    title: "Xiaomi 13 Pro (12GB RAM, 256GB, Ceramic Black)",    category: "electronics",    subcategory: "smartphones",    price: 74999,
    currency: "INR",    imageUrl: "https://images.unsplash.com/photo-1611070916679-275d95b25f50?q=80&w=1974&auto=format&fit=crop",    description: "Co-engineered with Leica, featuring 1-inch Sony IMX989 camera sensor, Snapdragon 8 Gen 2, and 120W HyperCharge.",    rating: 4.5,
    reviewCount: 426,
    tags: ["xiaomi", "smartphone", "premium", "tech", "gadgets"],    priceRange: "high"  },
  {
    id: "32",    title: "Xiaomi Redmi Note 12 Pro (8GB RAM, 128GB, Glacier Blue)",    category: "electronics",    subcategory: "smartphones",    price: 19999,
    currency: "INR",    imageUrl: "https://images.unsplash.com/photo-1646644189970-85af979736af?q=80&w=1970&auto=format&fit=crop",    description: "Featuring 108MP camera, 120Hz AMOLED display, 5000mAh battery, and 67W turbo charging for all-day performance.",    rating: 4.3,
    reviewCount: 1254,
    tags: ["xiaomi", "smartphone", "budget", "tech", "gadgets", "redmi"],    priceRange: "low"  },
  {
    id: "33",    title: "Acer Aspire 5 (Core i5, 8GB RAM, 512GB SSD)",    category: "electronics",    subcategory: "laptops",    price: 49999,
    currency: "INR",    imageUrl: "https://images.unsplash.com/photo-1525971977657-26294633e3f0?q=80&w=1974&auto=format&fit=crop",    description: "Powerful everyday computing with 11th Gen Intel Core i5, 15.6-inch Full HD display, and long battery life.",    rating: 4.2,
    reviewCount: 823,
    tags: ["acer", "laptop", "budget", "tech", "gadgets"],    priceRange: "medium"  },
  {
    id: "34",    title: "Lenovo IdeaPad Slim 3 (Ryzen 5, 8GB RAM, 512GB SSD)",    category: "electronics",    subcategory: "laptops",    price: 44999,
    currency: "INR",    imageUrl: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=1932&auto=format&fit=crop",    description: "Reliable performance meets portability with AMD Ryzen 5, integrated Radeon graphics, and rapid charge technology.",    rating: 4.1,
    reviewCount: 659,
    tags: ["lenovo", "laptop", "budget", "tech", "gadgets"],    priceRange: "medium"  }
];

export default sampleProducts;

export const getAllProducts = () => {
  return Promise.resolve(sampleProducts);
};

export const getProductById = (id) => {
  const product = sampleProducts.find(product => product.id.toString() === id.toString());
  return Promise.resolve(product || null);
};

export const getProductsByCategory = (category) => {
  const products = sampleProducts.filter(product => product.subcategory === category);
  return Promise.resolve(products);
};

export const searchProducts = (query, category = 'all') => {
  const normalizedQuery = query.toLowerCase();
  
  let filteredProducts = sampleProducts;
  
  if (category !== 'all') {
    filteredProducts = filteredProducts.filter(product => 
      product.subcategory === category || product.category === category
    );
  }
  
  const results = filteredProducts.filter(product => {
    return (
      product.title.toLowerCase().includes(normalizedQuery) ||
      product.description.toLowerCase().includes(normalizedQuery) ||
      product.tags.some(tag => tag.toLowerCase().includes(normalizedQuery))
    );
  });
  
  return Promise.resolve({
    searchResults: results,
    totalResults: results.length,
    searchInfo: {
      query,
      category,
      timestamp: new Date().toISOString()
    }
  });
};

export const getRelatedProducts = (id) => {
  const product = sampleProducts.find(p => p.id.toString() === id.toString());
  
  if (!product) {
    return Promise.resolve([]);
  }
  
  const relatedProducts = sampleProducts.filter(p => 
    p.subcategory === product.subcategory && p.id.toString() !== id.toString()
  ).slice(0, 4);
  
  return Promise.resolve(relatedProducts);
};

export const getRecommendedProducts = (options = {}) => {
  const { 
    categories = [], 
    excludeIds = [], 
    brands = [], 
    priceRange = [], 
    limit = 5 
  } = options;
  
  let recommendations = [];
  
  if (categories && categories.length > 0) {
    for (const category of categories) {
      const categoryProducts = sampleProducts.filter(p => 
        p.category === category || p.subcategory === category
      );
      recommendations.push(...categoryProducts);
    }
  } else {
    recommendations = [...sampleProducts];
  }
  
  if (brands && brands.length > 0) {
    recommendations = recommendations.filter(product => {
      return product.tags.some(tag => brands.includes(tag.toLowerCase()));
    });
  }
  
  if (priceRange && priceRange.length > 0) {
    recommendations = recommendations.filter(product => {
      return priceRange.includes(product.priceRange);
    });
  }
  
  const excludeIdSet = new Set(excludeIds.map(id => id.toString()));
  const uniqueRecommendations = [];
  const seenIds = new Set();
  
  for (const product of recommendations) {
    const productId = product.id.toString();
    if (!excludeIdSet.has(productId) && !seenIds.has(productId)) {
      uniqueRecommendations.push(product);
      seenIds.add(productId);
    }
  }
  
  return Promise.resolve(uniqueRecommendations.slice(0, limit));
};

export const getElectronicsProducts = () => {
  return Promise.resolve(sampleProducts);
};

export const getAllCategories = () => {
  const categories = [...new Set(sampleProducts.map(product => product.subcategory))];
  return Promise.resolve(categories);
};

export const getAllBrands = () => {
  const brandSet = new Set();
  
  sampleProducts.forEach(product => {
    const brandTags = product.tags.filter(tag => 
      !["tech", "gadgets", "premium", "budget", "smartphone", "laptop", "tablet", "audio", "gaming"].includes(tag)
    );
    
    if (brandTags.length > 0) {
      brandTags.forEach(brand => brandSet.add(brand));
    }
  });
  
  return Promise.resolve(Array.from(brandSet).sort());
};

export const getProductsByPriceRange = (range) => {
  if (!range) return Promise.resolve(sampleProducts);
  
  const filteredProducts = sampleProducts.filter(product => product.priceRange === range);
  return Promise.resolve(filteredProducts);
};

export const getProductsByBrand = (brand) => {
  if (!brand) return Promise.resolve(sampleProducts);
  
  const normalizedBrand = brand.toLowerCase();
  const filteredProducts = sampleProducts.filter(product => 
    product.tags.some(tag => tag.toLowerCase() === normalizedBrand)
  );
  
  return Promise.resolve(filteredProducts);
};

export const searchProductsAdvanced = (options = {}) => {
  const {
    query = '',
    category = 'all',
    brands = [],
    priceRanges = [],
    sortBy = 'relevance',
    page = 1,
    limit = 10
  } = options;
  
  const normalizedQuery = query.toLowerCase();
  
  let filteredProducts = [...sampleProducts];
  
  if (category !== 'all') {
    filteredProducts = filteredProducts.filter(product => 
      product.subcategory === category || product.category === category
    );
  }
  
  if (brands && brands.length > 0) {
    filteredProducts = filteredProducts.filter(product => 
      product.tags.some(tag => brands.includes(tag.toLowerCase()))
    );
  }
  
  if (priceRanges && priceRanges.length > 0) {
    filteredProducts = filteredProducts.filter(product => 
      priceRanges.includes(product.priceRange)
    );
  }
  
  if (normalizedQuery) {
    filteredProducts = filteredProducts.filter(product => {
      return (
        product.title.toLowerCase().includes(normalizedQuery) ||
        product.description.toLowerCase().includes(normalizedQuery) ||
        product.tags.some(tag => tag.toLowerCase().includes(normalizedQuery))
      );
    });
  }
  
  switch (sortBy) {
    case 'price_low_to_high':
      filteredProducts.sort((a, b) => a.price - b.price);
      break;
    case 'price_high_to_low':
      filteredProducts.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      filteredProducts.sort((a, b) => b.rating - a.rating);
      break;
    case 'popularity':
      filteredProducts.sort((a, b) => b.reviewCount - a.reviewCount);
      break;
    default:
      break;
  }
  
  const totalResults = filteredProducts.length;
  const totalPages = Math.ceil(totalResults / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedResults = filteredProducts.slice(startIndex, endIndex);
  
  return Promise.resolve({
    products: paginatedResults,
    pagination: {
      page,
      limit,
      totalPages,
      totalResults
    },
    searchInfo: {
      query,
      category,
      brands,
      priceRanges,
      sortBy,
      timestamp: new Date().toISOString()
    }
  });
}; 