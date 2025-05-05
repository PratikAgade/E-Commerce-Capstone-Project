import { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import * as productData from '../data/sampleProducts';

const ShopContext = createContext();

export const useShopContext = () => {
  return useContext(ShopContext);
};

export const ShopProvider = ({ children }) => {
  // Load data from localStorage or initialize empty arrays
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });
  
  const [recentlyViewed, setRecentlyViewed] = useState(() => {
    const savedRecentlyViewed = localStorage.getItem('recentlyViewed');
    return savedRecentlyViewed ? JSON.parse(savedRecentlyViewed) : [];
  });

  const [purchaseHistory, setPurchaseHistory] = useState(() => {
    const savedPurchaseHistory = localStorage.getItem('purchaseHistory');
    return savedPurchaseHistory ? JSON.parse(savedPurchaseHistory) : [];
  });

  // User preferences for filtering and recommendations
  const [userPreferences, setUserPreferences] = useState(() => {
    const savedPreferences = localStorage.getItem('userPreferences');
    return savedPreferences ? JSON.parse(savedPreferences) : {
      preferredBrands: [],
      preferredPriceRanges: [],
      preferredCategories: []
    };
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  useEffect(() => {
    localStorage.setItem('purchaseHistory', JSON.stringify(purchaseHistory));
  }, [purchaseHistory]);

  useEffect(() => {
    localStorage.setItem('userPreferences', JSON.stringify(userPreferences));
  }, [userPreferences]);

  // Add product to wishlist
  const addToWishlist = (id) => {
    if (!wishlist.includes(id)) {
      setWishlist([...wishlist, id]);
    }
  };

  // Remove product from wishlist
  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter(itemId => itemId !== id));
  };

  // Check if product is in wishlist
  const isInWishlist = (id) => {
    return wishlist.includes(id);
  };

  // Toggle product in wishlist
  const toggleWishlist = (id) => {
    if (isInWishlist(id)) {
      removeFromWishlist(id);
    } else {
      addToWishlist(id);
    }
  };

  // Add product to recently viewed
  const addToRecentlyViewed = (id) => {
    // Remove if already exists to avoid duplicates
    const filtered = recentlyViewed.filter(itemId => itemId !== id);
    // Add to beginning of array (most recent first)
    // Limit to 10 most recent items
    setRecentlyViewed([id, ...filtered].slice(0, 10));
  };

  // Simulate purchase
  const addToPurchaseHistory = (id) => {
    setPurchaseHistory([...purchaseHistory, {
      id: uuidv4(),
      productId: id,
      date: new Date().toISOString()
    }]);
  };

  // Get wishlist products
  const getWishlistProducts = async () => {
    try {
      // Get product details for items in wishlist
      const products = await Promise.all(
        wishlist.map(id => productData.getProductById(id))
      );
      // Filter out any null results and only keep electronics
      return products.filter(product => Boolean(product) && product.category === 'electronics');
    } catch (error) {
      console.error('Error fetching wishlist products:', error);
      return [];
    }
  };

  // Get recently viewed products
  const getRecentlyViewedProducts = async () => {
    try {
      const products = await Promise.all(
        recentlyViewed.map(id => productData.getProductById(id))
      );
      // Filter to only show electronics products
      return products.filter(product => Boolean(product) && product.category === 'electronics');
    } catch (error) {
      console.error('Error fetching recently viewed products:', error);
      return [];
    }
  };

  // Update user preferences
  const updateUserPreferences = (newPreferences) => {
    setUserPreferences({
      ...userPreferences,
      ...newPreferences
    });
  };

  // Get all available brands
  const getAllBrands = async () => {
    try {
      return await productData.getAllBrands();
    } catch (error) {
      console.error('Error fetching brands:', error);
      return [];
    }
  };

  // Get all available categories
  const getAllCategories = async () => {
    try {
      return await productData.getAllCategories();
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  };

  // Get recommendations based on wishlist, recently viewed, and user preferences
  const getRecommendations = async (options = {}) => {
    try {
      // Extract user preferences for brands and price ranges
      const { preferredBrands, preferredPriceRanges } = userPreferences;
      
      // Analyze user behavior to get categories they're interested in
      const [wishlistProducts, recentProducts] = await Promise.all([
        getWishlistProducts(),
        getRecentlyViewedProducts()
      ]);
      
      // Extract categories from user behavior
      const categories = new Set();
      [...wishlistProducts, ...recentProducts].forEach(product => {
        if (product) {
          categories.add(product.category);
          categories.add(product.subcategory);
        }
      });
      
      // Use advanced recommendation system
      return await productData.getRecommendedProducts({
        categories: Array.from(categories),
        excludeIds: wishlist,
        brands: options.brands || preferredBrands,
        priceRange: options.priceRange || preferredPriceRanges,
        limit: options.limit || 5
      });
    } catch (error) {
      console.error('Error getting recommendations:', error);
      return [];
    }
  };

  // Generate wishlist share URL
  const generateWishlistShareUrl = () => {
    const baseUrl = window.location.origin;
    // Create a simple encoded string of the wishlist
    const encodedWishlist = btoa(JSON.stringify(wishlist));
    return `${baseUrl}/shared-wishlist/${encodedWishlist}`;
  };

  // Decode a shared wishlist
  const decodeSharedWishlist = (encodedString) => {
    try {
      return JSON.parse(atob(encodedString));
    } catch (error) {
      console.error("Error decoding shared wishlist:", error);
      return [];
    }
  };

  // Search products using sample data
  const searchProducts = async (query, category = 'electronics') => {
    try {
      return await productData.searchProducts(query, category);
    } catch (error) {
      console.error('Error searching products:', error);
      return { searchResults: [], totalResults: 0 };
    }
  };

  // Advanced search with filters
  const searchProductsAdvanced = async (options = {}) => {
    try {
      return await productData.searchProductsAdvanced(options);
    } catch (error) {
      console.error('Error in advanced search:', error);
      return { 
        products: [], 
        pagination: { page: 1, limit: 10, totalPages: 0, totalResults: 0 },
        searchInfo: {}
      };
    }
  };

  // Get related products for a specific product
  const getRelatedProducts = async (id, options = {}) => {
    try {
      // First get basic related products
      const relatedProducts = await productData.getRelatedProducts(id);
      
      // If filters specified, apply them
      if (options.brands || options.priceRange) {
        return relatedProducts.filter(product => {
          let passesFilters = true;
          
          // Apply brand filter if specified
          if (options.brands && options.brands.length > 0) {
            const hasBrand = product.tags.some(tag => options.brands.includes(tag.toLowerCase()));
            passesFilters = passesFilters && hasBrand;
          }
          
          // Apply price range filter if specified
          if (options.priceRange && options.priceRange.length > 0) {
            passesFilters = passesFilters && options.priceRange.includes(product.priceRange);
          }
          
          return passesFilters;
        });
      }
      
      return relatedProducts;
    } catch (error) {
      console.error('Error getting related products:', error);
      return [];
    }
  };

  // Get products by price range
  const getProductsByPriceRange = async (range) => {
    try {
      return await productData.getProductsByPriceRange(range);
    } catch (error) {
      console.error('Error getting products by price range:', error);
      return [];
    }
  };

  // Get products by brand
  const getProductsByBrand = async (brand) => {
    try {
      return await productData.getProductsByBrand(brand);
    } catch (error) {
      console.error('Error getting products by brand:', error);
      return [];
    }
  };

  const value = {
    wishlist,
    recentlyViewed,
    purchaseHistory,
    userPreferences,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    toggleWishlist,
    addToRecentlyViewed,
    addToPurchaseHistory,
    getWishlistProducts,
    getRecentlyViewedProducts,
    updateUserPreferences,
    getAllBrands,
    getAllCategories,
    getRecommendations,
    generateWishlistShareUrl,
    decodeSharedWishlist,
    searchProducts,
    searchProductsAdvanced,
    getRelatedProducts,
    getProductsByPriceRange,
    getProductsByBrand
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
}; 