import React, { useState, useEffect } from 'react';
import ProductGrid from '../components/ProductGrid';
import { useShopContext } from '../context/ShopContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import * as productData from '../data/sampleProducts';

// Extract brands from tags
const extractBrands = (products) => {
  const brandSet = new Set();
  products.forEach(product => {
    if (product.tags) {
      product.tags.forEach(tag => {
        if (['apple', 'samsung', 'sony', 'microsoft', 'nintendo', 'dyson', 'lg', 'philips', 'bose', 'razer'].includes(tag)) {
          brandSet.add(tag);
        }
      });
    }
  });
  return Array.from(brandSet);
};

const HomePage = () => {
  const { 
    getRecentlyViewedProducts, 
    getRecommendations,
    searchProducts 
  } = useShopContext();

  const [recentProducts, setRecentProducts] = useState([]);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [electronicsProducts, setElectronicsProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [loading, setLoading] = useState(true);

  // Parse URL params on load
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const categoryParam = queryParams.get('category');
    const brandParam = queryParams.get('brand');
    
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
    
    if (brandParam) {
      setSelectedBrand(brandParam);
    }
  }, []);

  // Load initial data on mount
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);
        
        // Get all available subcategories
        const allCategories = await productData.getAllCategories();
        setCategories(allCategories);
        
        // Load electronics products
        const electronics = await productData.getElectronicsProducts();
        setElectronicsProducts(electronics);
        
        // Extract brands
        const brandList = extractBrands(electronics);
        setBrands(brandList);
        
        // Load recent products and recommendations
        const recentItems = await getRecentlyViewedProducts();
        setRecentProducts(recentItems);
        
        const recommendations = await getRecommendations();
        setRecommendedProducts(recommendations);
        
        // Apply initial filters if needed
        if (selectedCategory !== 'all' || selectedBrand !== 'all') {
          filterProducts(selectedCategory, selectedBrand);
        }
      } catch (error) {
        console.error('Error loading homepage data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadInitialData();
  }, [getRecentlyViewedProducts, getRecommendations]);
  
  // Filter products by category and brand
  const filterProducts = async (category, brand) => {
    try {
      setLoading(true);
      let filteredProducts;
      
      // First filter by category
      if (category === 'all') {
        filteredProducts = await productData.getElectronicsProducts();
      } else {
        filteredProducts = await productData.getProductsByCategory(category);
      }
      
      // Then filter by brand if needed
      if (brand !== 'all') {
        filteredProducts = filteredProducts.filter(product => 
          product.tags && product.tags.includes(brand.toLowerCase())
        );
      }
      
      setElectronicsProducts(filteredProducts);
    } catch (error) {
      console.error('Error filtering products:', error);
    } finally {
      setLoading(false);
    }
  };
  
  // Filter by category
  const filterByCategory = async (category) => {
    setSelectedCategory(category);
    filterProducts(category, selectedBrand);
    
    // Update URL
    const url = new URL(window.location);
    if (category === 'all') {
      url.searchParams.delete('category');
    } else {
      url.searchParams.set('category', category);
    }
    window.history.pushState({}, '', url);
  };
  
  // Filter by brand
  const filterByBrand = async (brand) => {
    setSelectedBrand(brand);
    filterProducts(selectedCategory, brand);
    
    // Update URL
    const url = new URL(window.location);
    if (brand === 'all') {
      url.searchParams.delete('brand');
    } else {
      url.searchParams.set('brand', brand);
    }
    window.history.pushState({}, '', url);
  };
  
  // Handle search form submission
  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) return;
    
    try {
      setIsSearching(true);
      
      const results = await searchProducts(searchQuery, selectedCategory !== 'all' ? selectedCategory : 'electronics');
      setSearchResults(results.searchResults);
    } catch (error) {
      console.error('Error searching products:', error);
    } finally {
      setIsSearching(false);
    }
  };
  
  // Clear search results
  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
  };
  
  // Get title based on filters
  const getTitle = () => {
    let title = '';
    
    if (selectedBrand !== 'all') {
      title += `${selectedBrand.charAt(0).toUpperCase() + selectedBrand.slice(1)} `;
    }
    
    if (selectedCategory === 'all') {
      title += 'Electronics';
    } else {
      title += selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1);
    }
    
    return title;
  };
  
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Discover amazing electronics</h1>
          <p>Browse our selection of electronics, add favorites to your wishlist, and get personalized recommendations</p>
          
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-input-container">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search electronics..."
                className="search-input"
              />
              <button 
                type="submit" 
                className="search-button"
                disabled={isSearching}
              >
                <FontAwesomeIcon icon={faSearch} />
                <span>Search</span>
              </button>
            </div>
          </form>
        </div>
      </section>
      
      <section className="category-filters">
        <div className="filter-buttons">
          <button 
            className={`filter-button ${selectedCategory === 'all' ? 'active' : ''}`}
            onClick={() => filterByCategory('all')}
          >
            All Electronics
          </button>
          
          {categories.map(category => (
            <button 
              key={category}
              className={`filter-button ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => filterByCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </section>
      
      {brands.length > 0 && (
        <section className="brand-filters">
          <div className="brand-title">Filter by Brand:</div>
          <div className="brand-buttons">
            <button 
              className={`brand-button ${selectedBrand === 'all' ? 'active' : ''}`}
              onClick={() => filterByBrand('all')}
            >
              All Brands
            </button>
            
            {brands.map(brand => (
              <button 
                key={brand}
                className={`brand-button ${selectedBrand === brand ? 'active' : ''}`}
                onClick={() => filterByBrand(brand)}
              >
                {brand.charAt(0).toUpperCase() + brand.slice(1)}
              </button>
            ))}
          </div>
        </section>
      )}
      
      {loading ? (
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading electronics products...</p>
        </div>
      ) : (
        <>
          {searchResults.length > 0 ? (
            <section className="search-results-section">
              <div className="section-header">
                <h2>Search Results</h2>
                <button onClick={clearSearch} className="clear-search-button">
                  Clear Search
                </button>
              </div>
              <ProductGrid 
                products={searchResults} 
                emptyMessage="No electronics products found matching your search."
              />
            </section>
          ) : (
            <>
              <section className="featured-products-section">
                <ProductGrid 
                  products={electronicsProducts} 
                  title={getTitle()} 
                  emptyMessage="No electronics products available in this category."
                />
              </section>
              
              {recommendedProducts.length > 0 && (
                <section className="recommendations-section">
                  <ProductGrid 
                    products={recommendedProducts} 
                    title="Recommended For You" 
                    emptyMessage="Add products to your wishlist or browse more to get recommendations."
                  />
                </section>
              )}
              
              {recentProducts.length > 0 && (
                <section className="recently-viewed-section">
                  <ProductGrid 
                    products={recentProducts} 
                    title="Recently Viewed" 
                    emptyMessage="You haven't viewed any products yet."
                  />
                </section>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default HomePage; 