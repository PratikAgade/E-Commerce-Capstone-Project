import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-section about">
          <h3>About ElectroVerse</h3>
          <p>
            Your premier destination for high-quality electronics. 
            Browse our selection of premium electronics from Apple, Samsung, 
            and other top brands. Save your favorites to your wishlist!
          </p>
        </div>
        
        <div className="footer-section links">
          <h3>Electronics</h3>
          <ul>
            <li><Link to="/?category=smartphones">Smartphones</Link></li>
            <li><Link to="/?category=laptops">Laptops</Link></li>
            <li><Link to="/?category=gaming">Gaming</Link></li>
            <li><Link to="/?category=household">Smart Home</Link></li>
          </ul>
        </div>
        
        <div className="footer-section brands">
          <h3>Top Brands</h3>
          <ul>
            <li><Link to="/?brand=apple">Apple</Link></li>
            <li><Link to="/?brand=samsung">Samsung</Link></li>
            <li><Link to="/?brand=sony">Sony</Link></li>
            <li><Link to="/?brand=microsoft">Microsoft</Link></li>
          </ul>
        </div>
        
        <div className="footer-section legal">
          <h3>Legal</h3>
          <ul>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms of Service</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {currentYear} ElectroVerse. All rights reserved.</p>
        <p className="demo-disclaimer">
          This is a demo app built with React. All product data is simulated.
          No real transactions are processed.
        </p>
      </div>
    </footer>
  );
};

export default Footer; 