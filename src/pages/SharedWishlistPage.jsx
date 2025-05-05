import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid';
import { useShopContext } from '../context/ShopContext';
import * as productData from '../data/sampleProducts';
const SharedWishlistPage = () => {
  const { encodedWishlist } = useParams();
  const { decodeSharedWishlist } = useShopContext();
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const loadSharedWishlist = async () => {
      try {
        setLoading(true);
        const productIds = decodeSharedWishlist(encodedWishlist);
        if (!productIds || !Array.isArray(productIds) || productIds.length === 0) {
          setError('Invalid or empty wishlist');
          return;
        }
        const products = await Promise.all(
          productIds.map(id => productData.getProductById(id))
        );
        const electronicsProducts = products.filter(
          product => Boolean(product) && product.category === 'electronics'
        );
        if (electronicsProducts.length === 0) {
          setError('No electronics products found in this wishlist');
          return;
        }
        setWishlistProducts(electronicsProducts);
      } catch (error) {
        console.error('Error loading shared wishlist:', error);
        setError('Could not load the shared wishlist');
      } finally {
        setLoading(false);
      }
    };
    if (encodedWishlist) {
      loadSharedWishlist();
    }
  }, [encodedWishlist, decodeSharedWishlist]);
  if (loading) {
    return (
      <div className="loading-state">
        <div className="loading-spinner"></div>
        <p>Loading shared electronics wishlist...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="error-state">
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={() => window.location.href = '/'}>
          Return to Homepage
        </button>
      </div>
    );
  }
  return (
    <div className="shared-wishlist-page">
      <div className="shared-wishlist-header">
        <h1>Shared Electronics Wishlist</h1>
        <p>Someone shared their electronics wishlist with you!</p>
      </div>
      <ProductGrid 
        products={wishlistProducts} 
        emptyMessage="This electronics wishlist is empty or could not be loaded."
      />
    </div>
  );
};
export default SharedWishlistPage; 