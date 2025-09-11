import React, { useState, useEffect, useMemo } from 'react';
import { FaHome, FaMapMarkerAlt, FaDollarSign, FaFilter, FaBed, FaBath, FaSearch } from 'react-icons/fa';
import {useLocation, useNavigate} from 'react-router-dom';
import { getProperties } from '../services/api';
import QuickSearch from '../components/QuickSearch';



const PropertyFilterSystem = () => {
  const locationHook= useLocation();
  const navigate= useNavigate();

  const [properties, setProperties] = useState([]);  // start empty, will load from MongoDB
  const [loading, setLoading] = useState(true);

  const [quickSearch, setQuickSearch] = useState("");
    // Search and display states
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('price-low');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  
  // Filter states
  const [filters, setFilters] = useState({
    category: 'buy', // buy, rent, sell
    propertyType: '',
    location: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    bathrooms: '',
    minSize: '',
    maxSize: ''
  });

  useEffect(()=>{
    const fetchData = async ()=>{
      try {
        const res =await getProperties();
        setProperties(res.data);

    } catch (err) {
      alert(`can not fetch from database or ${err}`)
    } finally{
      setLoading(false);
    }
    };
    fetchData();
    
  }, []);

  useEffect(() => {
  const params = new URLSearchParams();

  if (filters.category) params.set("category", filters.category);
  if (filters.location) params.set("location", filters.location);
  if (filters.minPrice) params.set("minPrice", filters.minPrice);
  if (filters.maxPrice) params.set("maxPrice", filters.maxPrice);
  navigate(`/properties?${params.toString()}`, { replace: true });
}, [filters, navigate]);

  useEffect(()=>{
    const params = new URLSearchParams(locationHook.search);
    
    setFilters((prev)=>({
      ...prev,
      category: params.get("category") || prev.category,
      location: params.get("location") || "",
      minPrice: params.get("minPrice") ||"",
      maxPrice: params.get("maxPrice") ||"",
    }));
    setQuickSearch(params.get("search") || "");
  },[locationHook.search]);



  // Core filtering algorithm
  const filteredProperties = useMemo(() => {
    return properties.filter(property => {
       // Quick Search filter (fast check by title/location/description)
    const matchesQuickSearch = quickSearch
      ? property.type.toLowerCase().includes(quickSearch.toLowerCase()) ||
        property.location.toLowerCase().includes(quickSearch.toLowerCase()) ||
        property.description.toLowerCase().includes(quickSearch.toLowerCase())
      : true;
      // Category filter
      const categoryMatch = () => {
        if (filters.category === 'buy') return property.status === 'for-sale' && property.type !== 'land';
        if (filters.category === 'rent') return property.status === 'for-rent';
        if (filters.category === 'sell') return property.status === 'for-sale';
        return true;
      };

      // Property type filter
      const typeMatch = !filters.propertyType || 
        property.type.toLowerCase() === filters.propertyType.toLowerCase();

      // Location filter (fuzzy search)
      const locationMatch = !filters.location || 
        property.location.toLowerCase().includes(filters.location.toLowerCase());

      // Price filter
      const priceMatch = () => {
        const propertyPrice = filters.category === 'rent' ? property.rentPrice : property.price;
        const min = filters.minPrice ? parseFloat(filters.minPrice) : 0;
        const max = filters.maxPrice ? parseFloat(filters.maxPrice) : Infinity;
        return propertyPrice >= min && propertyPrice <= max;
      };

      // Bedroom filter
      const bedroomMatch = !filters.bedrooms || 
        property.bedrooms >= parseInt(filters.bedrooms);

      // Bathroom filter
      const bathroomMatch = !filters.bathrooms || 
        property.bathrooms >= parseInt(filters.bathrooms);

      // Size filter
      const sizeMatch = () => {
        const min = filters.minSize ? parseFloat(filters.minSize) : 0;
        const max = filters.maxSize ? parseFloat(filters.maxSize) : Infinity;
        return property.size >= min && property.size <= max;
      };

      // Search query filter
      const searchMatch = !searchQuery || 
        property.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.description.toLowerCase().includes(searchQuery.toLowerCase());

      return categoryMatch() && typeMatch && locationMatch && priceMatch() && 
             bedroomMatch && bathroomMatch && sizeMatch() && searchMatch && matchesQuickSearch;
    });
  }, [properties, filters, searchQuery,quickSearch]);

  // Sorting algorithm
  const sortedProperties = useMemo(() => {
    const sorted = [...filteredProperties];
    
    switch (sortBy) {
      case 'price-low':
        return sorted.sort((a, b) => {
          const priceA = filters.category === 'rent' ? a.rentPrice : a.price;
          const priceB = filters.category === 'rent' ? b.rentPrice : b.price;
          return priceA - priceB;
        });
      case 'price-high':
        return sorted.sort((a, b) => {
          const priceA = filters.category === 'rent' ? a.rentPrice : a.price;
          const priceB = filters.category === 'rent' ? b.rentPrice : b.price;
          return priceB - priceA;
        });
      case 'size-large':
        return sorted.sort((a, b) => b.size - a.size);
      case 'size-small':
        return sorted.sort((a, b) => a.size - b.size);
      case 'bedrooms':
        return sorted.sort((a, b) => (b.bedrooms || 0) - (a.bedrooms || 0));
      default:
        return sorted;
    }
  }, [filteredProperties, sortBy, filters.category]);

  // Filter update handlers
  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      category: 'buy',
      propertyType: '',
      location: '',
      minPrice: '',
      maxPrice: '',
      bedrooms: '',
      bathrooms: '',
      minSize: '',
      maxSize: ''
    });
    setSearchQuery('');
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(price);
  };

  if (loading) return<p className='text-center mt-20'>Loading Properties....</p>
return (
    <div className="max-w-7xl mx-auto p-4 mt-20">
      {/* Header */}
      {/* 🔍 Quick Search Section */}
    <QuickSearch
    searchQuery={searchQuery}
    setSearchQuery={setSearchQuery}
    quickSearch={quickSearch}
    />

      <div className="mb-6">

        <h1 className="text-3xl font-bold text-gray-800 mb-2">Find Your Perfect Property</h1>
        <p className="text-gray-600">Discover properties that match your needs</p>
      </div>

      {/* Category Tabs */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex space-x-1 mb-4">
          {['buy', 'rent', 'sell'].map((category) => (
            <button
              key={category}
              onClick={() => updateFilter('category', category)}
              className={`px-6 py-2 rounded-lg font-medium capitalize transition-all ${
                filters.category === category
                  ? 'bg-green-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Basic Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          {/* Property Type */}
          <div className="relative">
            <FaHome className="absolute left-3 top-3 text-gray-400 z-10" />
            <select
              value={filters.propertyType}
              onChange={(e) => updateFilter('propertyType', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="">Property Type</option>
              <option value="apartment">Apartment</option>
              <option value="duplex">Duplex</option>
              <option value="bungalow">Bungalow</option>
              {filters.category === 'sell' && <option value="land">Land</option>}
            </select>
          </div>

          {/* Location */}
          <div className="relative">
            <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400 z-10" />
            <input
              type="text"
              placeholder="Location"
              value={filters.location}
              onChange={(e) => updateFilter('location', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          {/* Price Range */}
          <div className="relative">
            <FaDollarSign className="absolute left-3 top-3 text-gray-400 z-10" />
            <input
              type="number"
              placeholder={`Min ${filters.category === 'rent' ? 'Rent' : 'Price'}`}
              value={filters.minPrice}
              onChange={(e) => updateFilter('minPrice', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div className="relative">
            <FaDollarSign className="absolute left-3 top-3 text-gray-400 z-10" />
            <input
              type="number"
              placeholder={`Max ${filters.category === 'rent' ? 'Rent' : 'Price'}`}
              value={filters.maxPrice}
              onChange={(e) => updateFilter('maxPrice', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
        </div>

        {/* Advanced Filters Toggle */}
        <button
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          className="flex items-center space-x-2 text-green-600 hover:text-green-700 mb-4"
        >
          <FaFilter />
          <span>Advanced Filters</span>
        </button>

        {/* Advanced Filters */}
        {showAdvancedFilters && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
            {filters.category !== 'sell' && (
              <>
                <div className="relative">
                  <FaBed className="absolute left-3 top-3 text-gray-400 z-10" />
                  <select
                    value={filters.bedrooms}
                    onChange={(e) => updateFilter('bedrooms', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Bedrooms</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                    <option value="4">4+</option>
                    <option value="5">5+</option>
                  </select>
                </div>

                <div className="relative">
                  <FaBath className="absolute left-3 top-3 text-gray-400 z-10" />
                  <select
                    value={filters.bathrooms}
                    onChange={(e) => updateFilter('bathrooms', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Bathrooms</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                    <option value="4">4+</option>
                  </select>
                </div>
              </>
            )}

            <input
              type="number"
              placeholder="Min Size (sqm)"
              value={filters.minSize}
              onChange={(e) => updateFilter('minSize', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            />

            <input
              type="number"
              placeholder="Max Size (sqm)"
              value={filters.maxSize}
              onChange={(e) => updateFilter('maxSize', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>
        )}

        <button
          onClick={clearFilters}
          className="text-gray-500 hover:text-gray-700 underline"
        >
          Clear all filters
        </button>
      </div>

      {/* Search and Sort Bar */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search properties..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            >
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="size-large">Size: Large to Small</option>
              <option value="size-small">Size: Small to Large</option>
              {filters.category !== 'sell' && <option value="bedrooms">Bedrooms: Most to Least</option>}
            </select>
          </div>
        </div>
        
        <div className="mt-2 text-sm text-gray-600">
          Found {sortedProperties.length} properties
        </div>
      </div>

      {/* Property Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedProperties.map(property => (
          <div key={property.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold text-gray-800 capitalize">
                  {property.type} in {property.location}
                </h3>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  property.status === 'for-sale' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {property.status}
                </span>
              </div>
              
              <p className="text-gray-600 mb-4">{property.description}</p>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Price:</span>
                  <span className="font-semibold text-green-600">
                    {formatPrice(filters.category === 'rent' ? property.rentPrice : property.price)}
                    {filters.category === 'rent' && '/month'}
                  </span>
                </div>
                
                {property.bedrooms && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Bedrooms:</span>
                    <span>{property.bedrooms}</span>
                  </div>
                )}
                
                {property.bathrooms && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Bathrooms:</span>
                    <span>{property.bathrooms}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span className="text-gray-500">Size:</span>
                  <span>{property.size} sqm</span>
                </div>
              </div>
              
              <button className="w-full mt-4 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {sortedProperties.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No properties found matching your criteria.</p>
          <button
            onClick={clearFilters}
            className="mt-4 text-green-600 hover:text-green-700 underline"
          >
            Clear filters and try again
          </button>
        </div>
      )}
    </div>
  );
};

export default PropertyFilterSystem;