import React from 'react';
import './App.css';
function SimpleApp() {
  return (
    <div className="app-container">
      <header className="site-header">
        <div className="header-container">
          <div className="logo">
            <span className="logo-link">ElectroVerse</span>
          </div>
        </div>
      </header>
      <main className="main-content">
        <section className="hero-section">
          <div className="hero-content">
            <h1>Discover amazing products</h1>
            <p>Add your favorites to your wishlist and get personalized recommendations</p>
          </div>
        </section>
        <section className="product-grid-container">
          <h2 className="section-title">Featured Products</h2>
          <div className="product-grid">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="product-card">
                <div className="product-image-container">
                  <img 
                    src={`https://via.placeholder.com/300x300?text=Product+${i+1}`} 
                    alt={`Product ${i+1}`} 
                    className="product-image"
                  />
                </div>
                <div className="product-info">
                  <h3 className="product-title">Sample Product {i+1}</h3>
                  <div className="product-price">$99.99</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <div className="footer-container">
          <div className="footer-section about">
            <h3>About ElectroVerse</h3>
            <p>Your one-stop shop for electronics</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} ElectroVerse. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
export default SimpleApp; 