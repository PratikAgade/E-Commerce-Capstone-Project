export const products = [
  {
    id: "1",
    name: "iPhone 14 Pro",
    category: "smartphones",
    price: 999,
    image: "https:
    description: "Apple's latest flagship smartphone with advanced features",
    tags: ["apple", "smartphone", "premium", "iOS"],
    relatedProducts: ["2", "5", "8", "10"]
  },
  {
    id: "2",
    name: "iPhone 14 Pro Case",
    category: "accessories",
    price: 49,
    image: "https:
    description: "Official Apple case for your iPhone 14 Pro",
    tags: ["apple", "case", "accessories", "iPhone"],
    relatedProducts: ["1", "3", "10"]
  },
  {
    id: "3",
    name: "AirPods Pro",
    category: "audio",
    price: 249,
    image: "https:
    description: "Wireless earbuds with noise cancellation technology",
    tags: ["apple", "audio", "wireless", "earbuds"],
    relatedProducts: ["1", "4", "10"]
  },
  {
    id: "4",
    name: "Apple Watch Series 8",
    category: "wearables",
    price: 399,
    image: "https:
    description: "The latest Apple Watch with health tracking features",
    tags: ["apple", "smartwatch", "wearable", "health"],
    relatedProducts: ["1", "3", "10"]
  },
  {
    id: "5",
    name: "MagSafe Charger",
    category: "accessories",
    price: 39,
    image: "https:
    description: "Fast wireless charging for your iPhone",
    tags: ["apple", "charging", "accessories", "wireless"],
    relatedProducts: ["1", "6", "10"]
  },
  {
    id: "6",
    name: "20W USB-C Power Adapter",
    category: "accessories",
    price: 19,
    image: "https:
    description: "Fast charging adapter for Apple devices",
    tags: ["apple", "charging", "accessories", "adapter"],
    relatedProducts: ["1", "5", "10"]
  },
  {
    id: "7",
    name: "MacBook Pro 14\"",
    category: "computers",
    price: 1999,
    image: "https:
    description: "Powerful laptop with M2 Pro chip",
    tags: ["apple", "laptop", "premium", "macOS"],
    relatedProducts: ["9", "11", "12"]
  },
  {
    id: "8",
    name: "iPhone Screen Protector",
    category: "accessories",
    price: 19,
    image: "https:
    description: "Tempered glass protection for your iPhone",
    tags: ["accessories", "protection", "screen", "iPhone"],
    relatedProducts: ["1", "2", "10"]
  },
  {
    id: "9",
    name: "MacBook Sleeve",
    category: "accessories",
    price: 49,
    image: "https:
    description: "Stylish protection for your MacBook",
    tags: ["accessories", "protection", "laptop", "macbook"],
    relatedProducts: ["7", "11", "12"]
  },
  {
    id: "10",
    name: "iPhone MagSafe Battery Pack",
    category: "accessories",
    price: 99,
    image: "https:
    description: "Portable battery pack that attaches magnetically",
    tags: ["apple", "battery", "accessories", "portable", "iPhone"],
    relatedProducts: ["1", "5", "6"]
  },
  {
    id: "11",
    name: "Magic Mouse",
    category: "accessories",
    price: 79,
    image: "https:
    description: "Wireless mouse for Mac computers",
    tags: ["apple", "accessories", "mouse", "macbook"],
    relatedProducts: ["7", "9", "12"]
  },
  {
    id: "12",
    name: "Magic Keyboard",
    category: "accessories",
    price: 99,
    image: "https:
    description: "Wireless keyboard for Mac computers",
    tags: ["apple", "accessories", "keyboard", "macbook"],
    relatedProducts: ["7", "9", "11"]
  }
];
export const categories = [
  { id: "smartphones", name: "Smartphones" },
  { id: "accessories", name: "Accessories" },
  { id: "audio", name: "Audio" },
  { id: "wearables", name: "Wearables" },
  { id: "computers", name: "Computers" }
];
export const getProductById = (id) => {
  return products.find(product => product.id === id);
};
export const getRelatedProducts = (productId) => {
  const product = getProductById(productId);
  if (!product) return [];
  return product.relatedProducts.map(id => getProductById(id));
};
export const getProductsByCategory = (categoryId) => {
  return products.filter(product => product.category === categoryId);
};
export const getProductsByTags = (tags, excludeId = null) => {
  return products
    .filter(product => {
      if (product.id === excludeId) return false;
      return product.tags.some(tag => tags.includes(tag));
    })
    .sort((a, b) => {
      const aMatches = a.tags.filter(tag => tags.includes(tag)).length;
      const bMatches = b.tags.filter(tag => tags.includes(tag)).length;
      return bMatches - aMatches;
    })
    .slice(0, 4); 
}; 