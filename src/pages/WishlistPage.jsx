import React, { useState, useEffect } from 'react';
import ProductGrid from '../components/ProductGrid';
import WishlistShare from '../components/WishlistShare';
import { useShopContext } from '../context/ShopContext';

const WishlistPage = () => {
  const { getWishlistProducts } = useShopContext();
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadWishlist = async () => {
      try {
        setLoading(true);
        const products = await getWishlistProducts();
        setWishlistProducts(products);
      } catch (error) {
        console.error('Error loading wishlist:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadWishlist();
  }, [getWishlistProducts]);

  return (
    <div className="wishlist-page">
      <div className="wishlist-header">
        <h1>My Electronics Wishlist</h1>
        {wishlistProducts.length > 0 && <WishlistShare />}
      </div>
      
      {loading ? (
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading electronics wishlist...</p>
        </div>
      ) : (
        <ProductGrid 
          products={wishlistProducts} 
          emptyMessage="Your electronics wishlist is empty. Add products by clicking the heart icon on any electronics product card."
        />
      )}
    </div>
  );
};

export default WishlistPage; 