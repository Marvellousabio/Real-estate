import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getProperties } from "../services/api";
import QuickSearch from "../components/QuickSearch";

const PropertyFilterSystem = () => {
  const locationHook = useLocation();
  const navigate = useNavigate();

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters and search
  const [filters, setFilters] = useState({
    category: "buy",
    propertyType: "",
    location: "",
    minPrice: "",
    maxPrice: "",
    bedrooms: "",
    bathrooms: "",
    minSize: "",
    maxSize: "",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("price-low");

  // Load filters and search query from URL
  useEffect(() => {
    const params = new URLSearchParams(locationHook.search);

    setFilters((prev) => ({
      ...prev,
      category: params.get("category") || prev.category,
      location: params.get("location") || "",
      minPrice: params.get("minPrice") || "",
      maxPrice: params.get("maxPrice") || "",
      bedrooms: params.get("bedrooms") || "",
      bathrooms: params.get("bathrooms") || "",
      minSize: params.get("minSize") || "",
      maxSize: params.get("maxSize") || "",
    }));

    setSearchQuery(params.get("search") || "");
    setSortBy(params.get("sortBy") || "price-low");
  }, [locationHook.search]);

  // Update URL whenever filters, searchQuery, or sortBy changes
  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.category) params.set("category", filters.category);
    if (filters.location) params.set("location", filters.location);
    if (filters.minPrice) params.set("minPrice", filters.minPrice);
    if (filters.maxPrice) params.set("maxPrice", filters.maxPrice);
    if (filters.bedrooms) params.set("bedrooms", filters.bedrooms);
    if (filters.bathrooms) params.set("bathrooms", filters.bathrooms);
    if (filters.minSize) params.set("minSize", filters.minSize);
    if (filters.maxSize) params.set("maxSize", filters.maxSize);
    if (searchQuery) params.set("search", searchQuery);
    if (sortBy) params.set("sortBy", sortBy);

    navigate(`/properties?${params.toString()}`, { replace: true });
  }, [filters, searchQuery, sortBy, navigate]);

  // Fetch properties from backend
  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const data = await getProperties({
          category: filters.category,
          propertyType: filters.propertyType,
          location: filters.location,
          minPrice: filters.minPrice,
          maxPrice: filters.maxPrice,
          bedrooms: filters.bedrooms,
          bathrooms: filters.bathrooms,
          minSize: filters.minSize,
          maxSize: filters.maxSize,
          search: searchQuery,
          sortBy: sortBy,
        });

        setProperties(data); // already filtered & sorted by backend
      } catch (err) {
        alert(`Cannot fetch properties: ${err}`);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [filters, searchQuery, sortBy]);

  // Format price
  const formatPrice = (price) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price);

  if (loading)
    return <p className="text-center mt-20">Loading Properties....</p>;

  return (
    <div className="max-w-7xl mx-auto p-4 mt-20">
      {/* Quick Search */}
      <QuickSearch
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filters={filters}
      />

      {/* Property Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {properties.length > 0 ? (
          properties.map((property) => (
            <div
              key={property._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-gray-800 capitalize">
                    {property.type} in {property.location}
                  </h3>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      property.status === "for-sale"
                        ? "bg-green-100 text-green-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {property.status}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{property.description}</p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Price:</span>
                    <span className="font-semibold text-green-600">
                      {formatPrice(property.price)}
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
          ))
        ) : (
          <div className="text-center py-12 text-gray-500">
            No properties found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyFilterSystem;
