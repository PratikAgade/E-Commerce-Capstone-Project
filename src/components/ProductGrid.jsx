import React from 'react';
import ProductCard from './ProductCard';

const ProductGrid = ({ products, title, emptyMessage = "No products to display" }) => {
  if (!products || products.length === 0) {
    return (
      <div className="product-grid-container">
        {title && <h2 className="section-title">{title}</h2>}
        <div className="empty-state">
          <p>{emptyMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="product-grid-container">
      {title && <h2 className="section-title">{title}</h2>}
      <div className="product-grid">
        {products.map(product => (
          <ProductCard key={product.asin} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid; 