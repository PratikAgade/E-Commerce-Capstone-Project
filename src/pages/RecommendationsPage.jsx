import { useState, useEffect } from 'react';
import { useShopContext } from '../context/ShopContext';
import ProductGrid from '../components/ProductGrid';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import '../styles/RecommendationsPage.css';

const RecommendationsPage = () => {
  const { 
    getRecommendations, 
    getAllBrands, 
    updateUserPreferences,
    userPreferences 
  } = useShopContext();
  
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [availableBrands, setAvailableBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Local state for current filters
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [recommendationLimit, setRecommendationLimit] = useState(8);
  
  // Price range options
  const priceRangeOptions = [
    { value: 'low', label: 'Budget' },
    { value: 'medium', label: 'Mid-Range' },
    { value: 'high', label: 'Premium' }
  ];

  // Load brands on component mount
  useEffect(() => {
    const loadBrands = async () => {
      try {
        const brands = await getAllBrands();
        setAvailableBrands(brands);
      } catch (error) {
        console.error('Error loading brands:', error);
        setError('Failed to load brand options');
      }
    };
    
    loadBrands();
  }, [getAllBrands]);
  
  // Initialize selected filters from user preferences
  useEffect(() => {
    if (userPreferences) {
      setSelectedBrands(userPreferences.preferredBrands || []);
      setSelectedPriceRanges(userPreferences.preferredPriceRanges || []);
    }
  }, [userPreferences]);

  // Load recommended products based on filters
  useEffect(() => {
    const loadRecommendedProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const recommendations = await getRecommendations({
          brands: selectedBrands,
          priceRange: selectedPriceRanges,
          limit: recommendationLimit
        });
        
        setRecommendedProducts(recommendations);
      } catch (error) {
        console.error('Error loading recommendations:', error);
        setError('Failed to load recommendations');
      } finally {
        setLoading(false);
      }
    };

    loadRecommendedProducts();
  }, [getRecommendations, selectedBrands, selectedPriceRanges, recommendationLimit]);

  // Handler for brand selection change
  const handleBrandChange = (brand) => {
    setSelectedBrands(prevSelected => {
      // If already selected, remove it; otherwise add it
      const newSelection = prevSelected.includes(brand)
        ? prevSelected.filter(b => b !== brand)
        : [...prevSelected, brand];
      
      // Update user preferences
      updateUserPreferences({ preferredBrands: newSelection });
      
      return newSelection;
    });
  };

  // Handler for price range selection change
  const handlePriceRangeChange = (range) => {
    setSelectedPriceRanges(prevSelected => {
      // If already selected, remove it; otherwise add it
      const newSelection = prevSelected.includes(range)
        ? prevSelected.filter(r => r !== range)
        : [...prevSelected, range];
      
      // Update user preferences
      updateUserPreferences({ preferredPriceRanges: newSelection });
      
      return newSelection;
    });
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSelectedBrands([]);
    setSelectedPriceRanges([]);
    updateUserPreferences({ 
      preferredBrands: [], 
      preferredPriceRanges: [] 
    });
  };

  return (
    <div className="recommendations-page">
      <div className="page-header">
        <h1>Personalized Recommendations</h1>
        <p>Discover products tailored to your preferences</p>
      </div>
      
      <div className="recommendations-container">
        <div className="filter-sidebar">
          <div className="filter-section">
            <h2>Filter Options</h2>
            <button 
              className="reset-filters-btn" 
              onClick={handleResetFilters}
              disabled={selectedBrands.length === 0 && selectedPriceRanges.length === 0}
            >
              Reset All Filters
            </button>
          </div>
          
          <div className="filter-section">
            <h3>Price Range</h3>
            <div className="filter-options">
              {priceRangeOptions.map(range => (
                <button
                  key={range.value}
                  className={`filter-btn ${selectedPriceRanges.includes(range.value) ? 'active' : ''}`}
                  onClick={() => handlePriceRangeChange(range.value)}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h3>Brands</h3>
            <div className="filter-options">
              {availableBrands.map(brand => (
                <button
                  key={brand}
                  className={`filter-btn ${selectedBrands.includes(brand) ? 'active' : ''}`}
                  onClick={() => handleBrandChange(brand)}
                >
                  {brand.charAt(0).toUpperCase() + brand.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          <div className="filter-section">
            <h3>Show Items</h3>
            <select 
              value={recommendationLimit} 
              onChange={(e) => setRecommendationLimit(Number(e.target.value))}
              className="limit-select"
            >
              <option value={4}>4 products</option>
              <option value={8}>8 products</option>
              <option value={12}>12 products</option>
              <option value={16}>16 products</option>
            </select>
          </div>
        </div>
        
        <div className="recommendations-content">
          {loading ? (
            <Loading message="Finding the perfect products for you..." />
          ) : error ? (
            <ErrorMessage message={error} />
          ) : recommendedProducts.length === 0 ? (
            <div className="no-results">
              <h2>No products match your filters</h2>
              <p>Try adjusting your filter selections or <button onClick={handleResetFilters} className="text-button">reset all filters</button>.</p>
            </div>
          ) : (
            <>
              <div className="results-header">
                <h2>
                  {selectedBrands.length > 0 || selectedPriceRanges.length > 0 
                    ? 'Filtered Recommendations' 
                    : 'Recommended For You'}
                </h2>
                <p>{recommendedProducts.length} products found</p>
              </div>
              <ProductGrid products={recommendedProducts} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecommendationsPage; 