import { useCallback, useMemo, useState } from "react";
import { ArrowUpDown, Filter, Search } from "lucide-react";
import CarCard from "./CarCard";
import ComparisonModal from "./ComparisonModal";
import CarDetailModal from "./CarDetailModal";
import carsData from "../dummyData/carsData.json";
import Layout from "./Layouts";
import NoDataFound from "./shared/NoDataFound";

// Main App Component
const CarComparisonDashboard = () => {
    const [cars] = useState(carsData);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
      brand: '',
      type: '',
      priceRange: [0, 300000],
      minRating: 0
    });
    const [sortBy, setSortBy] = useState('price');
    const [sortOrder, setSortOrder] = useState('asc');
    const [selectedCars, setSelectedCars] = useState([]);
    const [showComparison, setShowComparison] = useState(false);
    const [selectedCar, setSelectedCar] = useState(null);
    const [showMobileFilters, setShowMobileFilters] = useState(false);
  
    // SEO optimization
    const seoTitle = selectedCars.length > 0 
      ? `Compare ${selectedCars.map(car => `${car.brand} ${car.model}`).join(' vs ')} - Car Comparison`
      : 'Car Comparison Dashboard - Compare Cars by Price, Performance & Features';
    
    const seoDescription = selectedCars.length > 0
      ? `Compare ${selectedCars.map(car => `${car.brand} ${car.model}`).join(' vs ')} side by side. View detailed specifications, prices, and performance metrics.`
      : 'Compare cars by price, performance, features and ratings. Find the perfect car with our comprehensive comparison tool featuring detailed specifications and reviews.';
  
    // Filter and sort cars
    const filteredAndSortedCars = useMemo(() => {
      let filtered = cars.filter(car => {
        const matchesSearch = car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             car.model.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesBrand = !filters.brand || car.brand === filters.brand;
        const matchesType = !filters.type || car.type === filters.type;
        const matchesPrice = car.price >= filters.priceRange[0] && car.price <= filters.priceRange[1];
        const matchesRating = car.rating >= filters.minRating;
        
        return matchesSearch && matchesBrand && matchesType && matchesPrice && matchesRating;
      });
  
      // Sort cars
      filtered.sort((a, b) => {
        let aValue, bValue;
        
        switch (sortBy) {
          case 'price':
            aValue = a.price;
            bValue = b.price;
            break;
          case 'rating':
            aValue = a.rating;
            bValue = b.rating;
            break;
          case 'weight':
            aValue = a.weight;
            bValue = b.weight;
            break;
          case 'year':
            aValue = a.year;
            bValue = b.year;
            break;
          default:
            aValue = a.brand;
            bValue = b.brand;
        }
  
        if (sortOrder === 'asc') {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });
  
      return filtered;
    }, [cars, searchTerm, filters, sortBy, sortOrder]);
  
    // Get unique brands and types for filters
    const uniqueBrands = [...new Set(cars.map(car => car.brand))].sort();
    const uniqueTypes = [...new Set(cars.map(car => car.type))].sort();
  
    const handleCompare = (car) => {
      if (selectedCars.find(c => c.id === car.id)) {
        setSelectedCars(selectedCars.filter(c => c.id !== car.id));
      } else if (selectedCars.length < 3) {
        setSelectedCars([...selectedCars, car]);
      }
    };
  
    const handleSort = (newSortBy) => {
      if (sortBy === newSortBy) {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
      } else {
        setSortBy(newSortBy);
        setSortOrder('asc');
      }
    };
  
    const resetFilters = useCallback(() => {
      setFilters({
        brand: '',
        type: '',
        priceRange: [0, 300000],
        minRating: 0
      });
      setSearchTerm('');
    }, []);
  
    return (
      <>
        <Layout seoTitle = {seoTitle} seoDescription={seoDescription} selectedCars={selectedCars} setShowComparison={setShowComparison}>

          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Search and Filters */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-6">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search cars by brand or model..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    aria-label="Search cars"
                  />
                </div>
    
                {/* Mobile Filter Toggle */}
                <button
                  onClick={() => setShowMobileFilters(!showMobileFilters)}
                  className="lg:hidden flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </button>
    
                {/* Desktop Filters */}
                <div className={`flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 ${showMobileFilters ? 'block' : 'hidden lg:flex'}`}>
                  <select
                    value={filters.brand}
                    onChange={(e) => setFilters({...filters, brand: e.target.value})}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    aria-label="Filter by brand"
                  >
                    <option value="">All Brands</option>
                    {uniqueBrands.map(brand => (
                      <option key={brand} value={brand}>{brand}</option>
                    ))}
                  </select>
    
                  <select
                    value={filters.type}
                    onChange={(e) => setFilters({...filters, type: e.target.value})}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    aria-label="Filter by type"
                  >
                    <option value="">All Types</option>
                    {uniqueTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
    
                  <select
                    value={`${sortBy}-${sortOrder}`}
                    onChange={(e) => {
                      const [newSortBy, newSortOrder] = e.target.value.split('-');
                      setSortBy(newSortBy);
                      setSortOrder(newSortOrder);
                    }}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    aria-label="Sort by"
                  >
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating-desc">Rating: High to Low</option>
                    <option value="rating-asc">Rating: Low to High</option>
                    <option value="year-desc">Year: Newest First</option>
                    <option value="year-asc">Year: Oldest First</option>
                    <option value="weight-asc">Weight: Light to Heavy</option>
                    <option value="weight-desc">Weight: Heavy to Light</option>
                  </select>
    
                  <button
                    onClick={resetFilters}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-blue-50 
                    rounded-lg transition-colors duration-200"
                    aria-label="Reset filters"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
    
            {/* Results Summary */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {filteredAndSortedCars.length} {filteredAndSortedCars.length === 1 ? 'Car' : 'Cars'} Found
              </h2>
              
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleSort('price')}
                  className={`flex items-center px-3 py-2 rounded-lg transition-colors duration-200 ${
                    sortBy === 'price' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Price
                  <ArrowUpDown className="w-4 h-4 ml-1" />
                </button>
                
                <button
                  onClick={() => handleSort('rating')}
                  className={`flex items-center px-3 py-2 rounded-lg transition-colors duration-200 ${
                    sortBy === 'rating' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Rating
                  <ArrowUpDown className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
    
            {/* Car Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredAndSortedCars.map(car => (
                <CarCard
                  key={car.id}
                  car={car}
                  onCompare={handleCompare}
                  isSelected={selectedCars.some(c => c.id === car.id)}
                  onView={setSelectedCar}
                />
              ))}
            </div>
    
            {/* No Results */}
            {filteredAndSortedCars.length === 0 && (
              <NoDataFound resetFilters={resetFilters}/>
            )}
          </main>
          
          {/* Comparison Modal */}
          {showComparison && (
            <ComparisonModal
              cars={selectedCars}
              onClose={() => setShowComparison(false)}
            />
          )}
    
          {/* Car Detail Modal */}
          {selectedCar && (
            <CarDetailModal
              car={selectedCar}
              onClose={() => setSelectedCar(null)}
            />
          )}
        </Layout>
      </>
    );
  };
  
  export default CarComparisonDashboard;