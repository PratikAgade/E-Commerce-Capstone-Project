import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faHome, faMobileAlt, faLaptop, faGamepad, faLightbulb, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { useShopContext } from '../context/ShopContext';
import * as productData from '../data/sampleProducts';

const Header = () => {
  const { wishlist } = useShopContext();
  
  // Get the subcategories
  const categories = [
    { id: 'smartphones', name: 'Smartphones', icon: faMobileAlt },
    { id: 'laptops', name: 'Laptops', icon: faLaptop },
    { id: 'gaming', name: 'Gaming', icon: faGamepad },
    { id: 'household', name: 'Smart Home', icon: faLightbulb }
  ];
  
  return (
    <header className="site-header">
      <div className="header-container">
        <div className="logo">
          <Link to="/" className="logo-link">
            <FontAwesomeIcon icon={faMobileAlt} className="logo-icon" />
            ElectroVerse
          </Link>
        </div>
        
        <nav className="main-nav">
          <ul className="nav-links">
            <li>
              <NavLink 
                to="/" 
                className={({ isActive }) => 
                  isActive ? 'nav-link active' : 'nav-link'
                }
              >
                <FontAwesomeIcon icon={faHome} />
                <span>Home</span>
              </NavLink>
            </li>
            {categories.map(category => (
              <li key={category.id}>
                <Link 
                  to={`/?category=${category.id}`}
                  className="nav-link"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = `/?category=${category.id}`;
                  }}
                >
                  <FontAwesomeIcon icon={category.icon} />
                  <span>{category.name}</span>
                </Link>
              </li>
            ))}
            <li>
              <NavLink 
                to="/recommendations" 
                className={({ isActive }) => 
                  isActive ? 'nav-link active' : 'nav-link'
                }
              >
                <FontAwesomeIcon icon={faThumbsUp} />
                <span>For You</span>
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/wishlist" 
                className={({ isActive }) => 
                  isActive ? 'nav-link active' : 'nav-link'
                }
              >
                <FontAwesomeIcon icon={faHeart} />
                <span>Wishlist</span>
                {wishlist.length > 0 && (
                  <span className="wishlist-badge">{wishlist.length}</span>
                )}
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header; 