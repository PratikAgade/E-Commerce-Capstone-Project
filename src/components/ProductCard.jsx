import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { useShopContext } from '../context/ShopContext';
const ProductCard = memo(({ product, showAddToWishlist = true }) => {
  const { isInWishlist, toggleWishlist, addToRecentlyViewed } = useShopContext();
  if (!product || !product.id) {
    return null; 
  }
  const inWishlist = isInWishlist(product.id);
  const productId = product.id;
  const imageUrl = product.imageUrl || 'https:
  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(product.price);
  const handleCardClick = () => {
    addToRecentlyViewed(productId);
  };
  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(productId);
  };
  return (
    <div className="product-card">
      <Link 
        to={`/product/${productId}`} 
        className="product-link"
        onClick={handleCardClick}
      >
        <div className="product-image-container">
          <img 
            src={imageUrl} 
            alt={product.title} 
            className="product-image"
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https:
            }}
          />
          {showAddToWishlist && (
            <button 
              className={`wishlist-button ${inWishlist ? 'in-wishlist' : ''}`}
              onClick={handleWishlistToggle}
              aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
            >
              <FontAwesomeIcon 
                icon={inWishlist ? solidHeart : regularHeart} 
                className="wishlist-icon"
              />
            </button>
          )}
        </div>
        <div className="product-info">
          <h3 className="product-title">{product.title}</h3>
          <div className="product-price">{formattedPrice}</div>
          {product.rating > 0 && (
            <div className="product-rating">
              <span className="stars" style={{ '--rating': product.rating }}>★★★★★</span>
              <span className="review-count">({product.reviewCount || 0})</span>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
});
ProductCard.displayName = 'ProductCard';
export default ProductCard; 