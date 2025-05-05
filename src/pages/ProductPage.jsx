import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import ProductGrid from '../components/ProductGrid';
import { useShopContext } from '../context/ShopContext';
import * as productDataService from '../data/sampleProducts';
const ProductPage = () => {
  const { id } = useParams();
  const { 
    isInWishlist, 
    toggleWishlist, 
    addToPurchaseHistory,
    getRelatedProducts,
    addToRecentlyViewed
  } = useShopContext();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      try {
        if (!id) {
          if (mounted) {
            setError("No product ID provided");
            setLoading(false);
          }
          return;
        }
        const productData = await productDataService.getProductById(id);
        if (!mounted) return;
        if (productData) {
          setProduct(productData);
          addToRecentlyViewed(id);
          try {
            const related = await getRelatedProducts(id);
            if (mounted) {
              setRelatedProducts(related);
            }
          } catch (relatedError) {
            console.error("Failed to load related products:", relatedError);
          }
        } else {
          setError("Product not found");
        }
      } catch (err) {
        if (mounted) {
          setError(err.message || "Failed to load product");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };
    fetchData();
    return () => {
      mounted = false;
    };
  }, [id, addToRecentlyViewed, getRelatedProducts]);
  const getFormattedPrice = () => {
    if (!product || typeof product.price !== 'number') return '';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(product.price);
  };
  const handleBuyNow = () => {
    if (!product) return;
    addToPurchaseHistory(product.id);
    alert(`You've purchased: ${product.title}`);
  };
  const handleWishlistToggle = () => {
    if (!product) return;
    toggleWishlist(product.id);
  };
  if (loading) {
    return (
      <div className="product-page loading">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading product details...</p>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="product-page error">
        <div className="error-state">
          <h2>Error Loading Product</h2>
          <p>{error}</p>
          <Link to="/">
            <button>Return to Homepage</button>
          </Link>
        </div>
      </div>
    );
  }
  if (!product) {
    return (
      <div className="product-page error">
        <div className="error-state">
          <h2>Product Not Found</h2>
          <p>Please check the product ID or try another product.</p>
          <Link to="/">
            <button>Return to Homepage</button>
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="product-page">
      <div className="product-details">
        <div className="product-image-gallery">
          <img 
            src={product.imageUrl} 
            alt={product.title} 
            className="product-detail-image"
            loading="eager"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https:
            }}
          />
        </div>
        <div className="product-info">
          <h1 className="product-title">{product.title}</h1>
          {product.rating && (
            <div className="product-rating">
              <span className="stars" style={{ '--rating': product.rating }}>★★★★★</span>
              <span className="review-count">({product.reviewCount} reviews)</span>
            </div>
          )}
          <div className="product-price">{getFormattedPrice()}</div>
          <p className="product-description">{product.description}</p>
          <div className="product-actions">
            <button onClick={handleBuyNow} className="buy-now-button">
              Buy Now
            </button>
            <button 
              onClick={handleWishlistToggle} 
              className={`wishlist-toggle-button ${isInWishlist(product.id) ? 'in-wishlist' : ''}`}
            >
              <FontAwesomeIcon 
                icon={isInWishlist(product.id) ? solidHeart : regularHeart} 
                className="wishlist-icon"
              />
              <span>{isInWishlist(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}</span>
            </button>
          </div>
          {product.tags && product.tags.length > 0 && (
            <div className="product-tags">
              {product.tags.map(tag => (
                <span key={tag} className="product-tag">{tag}</span>
              ))}
            </div>
          )}
        </div>
      </div>
      {relatedProducts.length > 0 && (
        <div className="related-products-section">
          <ProductGrid 
            products={relatedProducts} 
            title="You May Also Like" 
            emptyMessage="No related products found"
          />
        </div>
      )}
    </div>
  );
};
export default ProductPage; 