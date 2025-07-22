import React, { useState, useEffect } from 'react';
import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/clerk-react';
import { Heart, Share2, Filter, ShoppingCart, Star, TrendingUp } from 'lucide-react';
import './App.css';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

function ShoppingApp() {
  const { user } = useUser();
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [browsedProducts, setBrowsedProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeTab, setActiveTab] = useState('home');
  const [loading, setLoading] = useState(true);

  // Fetch products from both APIs
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const [dummyResponse, fakeStoreResponse] = await Promise.all([
          fetch('https://dummyjson.com/products'),
          fetch('https://fakestoreapi.com/products')
        ]);
        
        const dummyData = await dummyResponse.json();
        const fakeStoreData = await fakeStoreResponse.json();
        
        // List of non-vegetarian items to filter out
        const nonVegItems = [
          'beef', 'chicken', 'fish', 'meat', 'egg', 'pork', 'lamb', 'turkey', 
          'bacon', 'ham', 'sausage', 'seafood', 'shrimp', 'crab', 'lobster'
        ];
        
        // Filter function to remove non-veg items
        const isVegetarian = (product) => {
          const title = product.title.toLowerCase();
          const description = (product.description || '').toLowerCase();
          return !nonVegItems.some(item => 
            title.includes(item) || description.includes(item)
          );
        };
        
        // Normalize data structure and filter out non-veg items
        const normalizedDummy = dummyData.products
          .filter(isVegetarian)
          .map(product => ({
            ...product,
            image: product.thumbnail,
            rating: { rate: product.rating, count: product.stock }
          }));
        
        const normalizedFakeStore = fakeStoreData
          .filter(isVegetarian)
          .map(product => ({
            ...product,
            thumbnail: product.image,
            rating: product.rating || { rate: 4, count: 100 }
          }));
        
        // Add some vegetarian food items
        const vegFoodItems = [
          {
            id: 'veg-1',
            title: 'Organic Mixed Vegetables',
            price: 4.99,
            category: 'groceries',
            image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300&h=300&fit=crop',
            thumbnail: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300&h=300&fit=crop',
            description: 'Fresh organic mixed vegetables including carrots, broccoli, and bell peppers',
            rating: { rate: 4.5, count: 120 }
          },
          {
            id: 'veg-2',
            title: 'Fresh Fruit Salad Bowl',
            price: 6.99,
            category: 'groceries',
            image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=300&h=300&fit=crop',
            thumbnail: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=300&h=300&fit=crop',
            description: 'Healthy mix of seasonal fruits - apples, oranges, grapes, and berries',
            rating: { rate: 4.7, count: 95 }
          },
          {
            id: 'veg-3',
            title: 'Quinoa & Vegetable Bowl',
            price: 8.99,
            category: 'groceries',
            image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&h=300&fit=crop',
            thumbnail: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&h=300&fit=crop',
            description: 'Nutritious quinoa bowl with roasted vegetables and herbs',
            rating: { rate: 4.6, count: 78 }
          },
          {
            id: 'veg-4',
            title: 'Avocado Toast Special',
            price: 7.49,
            category: 'groceries',
            image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=300&h=300&fit=crop',
            thumbnail: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=300&h=300&fit=crop',
            description: 'Artisan bread topped with fresh avocado, tomatoes, and herbs',
            rating: { rate: 4.4, count: 156 }
          },
          {
            id: 'veg-5',
            title: 'Green Smoothie Bowl',
            price: 5.99,
            category: 'groceries',
            image: 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=300&h=300&fit=crop',
            thumbnail: 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=300&h=300&fit=crop',
            description: 'Healthy green smoothie bowl with spinach, banana, and chia seeds',
            rating: { rate: 4.8, count: 89 }
          },
          {
            id: 'veg-6',
            title: 'Mediterranean Veggie Wrap',
            price: 6.49,
            category: 'groceries',
            image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=300&fit=crop',
            thumbnail: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=300&fit=crop',
            description: 'Fresh wrap with hummus, vegetables, and Mediterranean herbs',
            rating: { rate: 4.3, count: 134 }
          }
        ];
        
        setProducts([...normalizedDummy, ...normalizedFakeStore, ...vegFoodItems]);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Load user data from localStorage
  useEffect(() => {
    if (user) {
      const savedWishlist = localStorage.getItem(`wishlist_${user.id}`);
      const savedBrowsed = localStorage.getItem(`browsed_${user.id}`);
      
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
      if (savedBrowsed) setBrowsedProducts(JSON.parse(savedBrowsed));
    }
  }, [user]);

  // Save to localStorage whenever wishlist or browsed products change
  useEffect(() => {
    if (user) {
      localStorage.setItem(`wishlist_${user.id}`, JSON.stringify(wishlist));
    }
  }, [wishlist, user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(`browsed_${user.id}`, JSON.stringify(browsedProducts));
    }
  }, [browsedProducts, user]);

  const addToWishlist = (product) => {
    if (!wishlist.find(item => item.id === product.id)) {
      setWishlist([...wishlist, product]);
    }
  };

  const removeFromWishlist = (productId) => {
    setWishlist(wishlist.filter(item => item.id !== productId));
  };

  const addToBrowsed = (product) => {
    const existing = browsedProducts.find(item => item.id === product.id);
    if (!existing) {
      setBrowsedProducts([product, ...browsedProducts.slice(0, 19)]); // Keep last 20
    }
  };

  const getRecommendations = () => {
    if (wishlist.length === 0 && browsedProducts.length === 0) {
      return products.slice(0, 8);
    }

    const userCategories = [...new Set([
      ...wishlist.map(p => p.category),
      ...browsedProducts.map(p => p.category)
    ])];

    const recommended = products.filter(product => 
      userCategories.includes(product.category) && 
      !wishlist.find(w => w.id === product.id)
    );

    return recommended.slice(0, 8);
  };

  const getCategories = () => {
    const categories = [...new Set(products.map(p => p.category))];
    return ['all', ...categories];
  };

  const getFilteredProducts = () => {
    if (selectedCategory === 'all') return products;
    return products.filter(p => p.category === selectedCategory);
  };

  const getElectronicsProducts = () => {
    return products.filter(p => 
      p.category === 'electronics' || 
      p.category === 'smartphones' || 
      p.category === 'laptops' ||
      p.category === 'tablets'
    );
  };

  const getFashionProducts = () => {
    return products.filter(p => 
      p.category === "men's clothing" || 
      p.category === "women's clothing" ||
      p.category === 'tops' ||
      p.category === 'womens-dresses' ||
      p.category === 'mens-shirts' ||
      p.category === 'womens-bags' ||
      p.category === 'mens-shoes' ||
      p.category === 'womens-shoes'
    );
  };

  const getFoodProducts = () => {
    return products.filter(p => 
      p.category === 'groceries' ||
      p.category === 'food'
    );
  };

  // Convert USD to INR (approximate rate: 1 USD = 83 INR)
  const convertToINR = (usdPrice) => {
    const inrPrice = usdPrice * 83;
    return Math.round(inrPrice);
  };

  const formatPrice = (price) => {
    const inrPrice = convertToINR(price);
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(inrPrice);
  };

  const shareWishlist = () => {
    const wishlistText = wishlist.map(item => `${item.title} - ${formatPrice(item.price)}`).join('\n');
    const shareData = {
      title: 'My Wishlist',
      text: `Check out my wishlist:\n${wishlistText}`,
      url: window.location.href
    };

    if (navigator.share) {
      navigator.share(shareData);
    } else {
      navigator.clipboard.writeText(`${shareData.title}\n${shareData.text}`);
      alert('Wishlist copied to clipboard!');
    }
  };

  const ProductCard = ({ product, isWishlisted = false, showRemove = false }) => (
    <div className="product-card" onClick={() => addToBrowsed(product)}>
      <div className="product-image">
        <img src={product.image || product.thumbnail} alt={product.title} />
        <button 
          className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            if (showRemove) {
              removeFromWishlist(product.id);
            } else {
              isWishlisted ? removeFromWishlist(product.id) : addToWishlist(product);
            }
          }}
        >
          <Heart 
            size={42} 
            fill={isWishlisted ? '#ffffff' : 'none'} 
            stroke={isWishlisted ? '#ffffff' : '#666'}
            strokeWidth={2}
          />
        </button>
      </div>
      <div className="product-info">
        <h3>{product.title}</h3>
        <p className="category">{product.category}</p>
        <div className="rating">
          <Star fill="#ffd700" size={16} />
          <span>{product.rating?.rate || product.rating || 4}</span>
        </div>
        <div className="price">{formatPrice(product.price)}</div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <h1>🛍️ ShopWish</h1>
          <nav className="nav">
            <button 
              className={activeTab === 'home' ? 'active' : ''}
              onClick={() => setActiveTab('home')}
            >
              Home
            </button>
            <button 
              className={activeTab === 'electronics' ? 'active' : ''}
              onClick={() => setActiveTab('electronics')}
            >
              📱 Electronics
            </button>
            <button 
              className={activeTab === 'fashion' ? 'active' : ''}
              onClick={() => setActiveTab('fashion')}
            >
              👕 Fashion
            </button>
            <button 
              className={activeTab === 'food' ? 'active' : ''}
              onClick={() => setActiveTab('food')}
            >
              🥗 Food
            </button>
            <button 
              className={activeTab === 'wishlist' ? 'active' : ''}
              onClick={() => setActiveTab('wishlist')}
            >
              Wishlist ({wishlist.length})
            </button>
            <button 
              className={activeTab === 'recommendations' ? 'active' : ''}
              onClick={() => setActiveTab('recommendations')}
            >
              <TrendingUp size={16} /> Recommended
            </button>
          </nav>
          <UserButton afterSignOutUrl="/" />
        </div>
      </header>

      <main className="main">
        {activeTab === 'home' && (
          <>
            <div className="filters">
              <div className="filter-group">
                <Filter size={20} />
                <select 
                  value={selectedCategory} 
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {getCategories().map(category => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="products-grid">
              {getFilteredProducts().map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  isWishlisted={wishlist.some(w => w.id === product.id)}
                />
              ))}
            </div>
          </>
        )}

        {activeTab === 'wishlist' && (
          <div className="wishlist-section">
            <div className="wishlist-header">
              <h2>My Wishlist ({wishlist.length} items)</h2>
              {wishlist.length > 0 && (
                <button className="share-btn" onClick={shareWishlist}>
                  <Share2 size={16} /> Share Wishlist
                </button>
              )}
            </div>
            
            {wishlist.length === 0 ? (
              <div className="empty-state">
                <Heart size={64} />
                <h3>Your wishlist is empty</h3>
                <p>Start adding products you love!</p>
              </div>
            ) : (
              <div className="products-grid">
                {wishlist.map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    isWishlisted={true}
                    showRemove={true}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'electronics' && (
          <div className="category-section">
            <h2>📱 Electronics & Tech</h2>
            <p>Discover the latest gadgets, smartphones, laptops and more</p>
            
            <div className="products-grid">
              {getElectronicsProducts().map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  isWishlisted={wishlist.some(w => w.id === product.id)}
                />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'fashion' && (
          <div className="category-section">
            <h2>👕 Fashion & Style</h2>
            <p>Explore trendy clothing, shoes, bags and accessories</p>
            
            <div className="products-grid">
              {getFashionProducts().map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  isWishlisted={wishlist.some(w => w.id === product.id)}
                />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'food' && (
          <div className="category-section">
            <h2>🥗 Fresh & Healthy Food</h2>
            <p>Discover fresh vegetables, fruits, and healthy vegetarian meals</p>
            
            <div className="products-grid">
              {getFoodProducts().map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  isWishlisted={wishlist.some(w => w.id === product.id)}
                />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'recommendations' && (
          <div className="recommendations-section">
            <h2>Recommended for You</h2>
            <p>Based on your wishlist and browsing history</p>
            
            <div className="products-grid">
              {getRecommendations().map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  isWishlisted={wishlist.some(w => w.id === product.id)}
                />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function App() {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <SignedOut>
        <div className="auth-container">
          <div className="auth-card">
            <h1>🛍️ Welcome to ShopWish</h1>
            <p>Your personal shopping companion with smart recommendations</p>
            <SignInButton mode="modal">
              <button className="sign-in-btn">Sign In to Continue</button>
            </SignInButton>
          </div>
        </div>
      </SignedOut>
      <SignedIn>
        <ShoppingApp />
      </SignedIn>
    </ClerkProvider>
  );
}

export default App;
