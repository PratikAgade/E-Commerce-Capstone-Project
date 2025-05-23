import { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import * as productData from '../data/sampleProducts';
const ShopContext = createContext();
export const useShopContext = () => {
  return useContext(ShopContext);
};
export const ShopProvider = ({ children }) => {
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
  const [userPreferences, setUserPreferences] = useState(() => {
    const savedPreferences = localStorage.getItem('userPreferences');
    return savedPreferences ? JSON.parse(savedPreferences) : {
      preferredBrands: [],
      preferredPriceRanges: [],
      preferredCategories: []
    };
  });
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
  const addToWishlist = (id) => {
    if (!wishlist.includes(id)) {
      setWishlist([...wishlist, id]);
    }
  };
  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter(itemId => itemId !== id));
  };
  const isInWishlist = (id) => {
    return wishlist.includes(id);
  };
  const toggleWishlist = (id) => {
    if (isInWishlist(id)) {
      removeFromWishlist(id);
    } else {
      addToWishlist(id);
    }
  };
  const addToRecentlyViewed = (id) => {
    const filtered = recentlyViewed.filter(itemId => itemId !== id);
    setRecentlyViewed([id, ...filtered].slice(0, 10));
  };
  const addToPurchaseHistory = (id) => {
    setPurchaseHistory([...purchaseHistory, {
      id: uuidv4(),
      productId: id,
      date: new Date().toISOString()
    }]);
  };
  const getWishlistProducts = async () => {
    try {
      const products = await Promise.all(
        wishlist.map(id => productData.getProductById(id))
      );
      return products.filter(product => Boolean(product) && product.category === 'electronics');
    } catch (error) {
      console.error('Error fetching wishlist products:', error);
      return [];
    }
  };
  const getRecentlyViewedProducts = async () => {
    try {
      const products = await Promise.all(
        recentlyViewed.map(id => productData.getProductById(id))
      );
      return products.filter(product => Boolean(product) && product.category === 'electronics');
    } catch (error) {
      console.error('Error fetching recently viewed products:', error);
      return [];
    }
  };
  const updateUserPreferences = (newPreferences) => {
    setUserPreferences({
      ...userPreferences,
      ...newPreferences
    });
  };
  const getAllBrands = async () => {
    try {
      return await productData.getAllBrands();
    } catch (error) {
      console.error('Error fetching brands:', error);
      return [];
    }
  };
  const getAllCategories = async () => {
    try {
      return await productData.getAllCategories();
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  };
  const getRecommendations = async (options = {}) => {
    try {
      const { preferredBrands, preferredPriceRanges } = userPreferences;
      const [wishlistProducts, recentProducts] = await Promise.all([
        getWishlistProducts(),
        getRecentlyViewedProducts()
      ]);
      const categories = new Set();
      [...wishlistProducts, ...recentProducts].forEach(product => {
        if (product) {
          categories.add(product.category);
          categories.add(product.subcategory);
        }
      });
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
  const generateWishlistShareUrl = () => {
    const baseUrl = window.location.origin;
    const encodedWishlist = btoa(JSON.stringify(wishlist));
    return `${baseUrl}/shared-wishlist/${encodedWishlist}`;
  };
  const decodeSharedWishlist = (encodedString) => {
    try {
      return JSON.parse(atob(encodedString));
    } catch (error) {
      console.error("Error decoding shared wishlist:", error);
      return [];
    }
  };
  const searchProducts = async (query, category = 'electronics') => {
    try {
      return await productData.searchProducts(query, category);
    } catch (error) {
      console.error('Error searching products:', error);
      return { searchResults: [], totalResults: 0 };
    }
  };
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
  const getRelatedProducts = async (id, options = {}) => {
    try {
      const relatedProducts = await productData.getRelatedProducts(id);
      if (options.brands || options.priceRange) {
        return relatedProducts.filter(product => {
          let passesFilters = true;
          if (options.brands && options.brands.length > 0) {
            const hasBrand = product.tags.some(tag => options.brands.includes(tag.toLowerCase()));
            passesFilters = passesFilters && hasBrand;
          }
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
  const getProductsByPriceRange = async (range) => {
    try {
      return await productData.getProductsByPriceRange(range);
    } catch (error) {
      console.error('Error getting products by price range:', error);
      return [];
    }
  };
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