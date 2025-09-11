import React, { useState } from "react";
import { FaHome, FaMapMarkerAlt, FaDollarSign } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const PropertySearch = () => {
  const [activeTab, setActiveTab] = useState("buy");
  const [propertyType, setPropertyType] = useState("");
  const [location, setLocation] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const navigate = useNavigate();

  const handleSearch = () => {
    const params= new URLSearchParams();
    params.set("category", activeTab);
    
    if (propertyType) params.set("propertyType", propertyType);
  if (location) params.set("location", location);
  if (minPrice) params.set("minPrice", minPrice);
  if (maxPrice) params.set("maxPrice", maxPrice);
    
    navigate(`/properties?${params.toString()}`);
  };
  const addProperty=()=>{
    navigate("/add-property");
  }

  return (
    <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-full max-w-5xl px-4 z-25">
      <div className="bg-white shadow-2xl rounded-2xl p-4 sm:p-6 ">
        
        {/* Tabs */}
        <div className="flex space-x-8 border-b pb-3 mb-6">
          {["buy", "rent", "sell"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`capitalize font-semibold pb-2 transition ${
                activeTab === tab
                  ? "border-b-1 border-green-600 text-green-600"
                  : "text-gray-500 hover:text-green-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Dynamic Search Form */}
        {activeTab === "buy" && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {/* Property Type */}
            <div className="relative">
              <FaHome className="absolute left-3 top-3 text-gray-400" />
              <select
              value={propertyType}
              onChange={(e)=>setPropertyType(e.target.value)}
              className="border  rounded-lg  pl-10 pr-4 py-2 sm:py-3 w-full focus:ring-2 focus:ring-green-600">
                <option>Property Type</option>
                <option>Duplex</option>
                <option>Bungalow</option>
                <option>Apartment</option>
                <option>Land</option>
              </select>
            </div>

            {/* Location */}
            <div className="relative">
              <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e)=>setLocation(e.target.value)}
                className="border rounded-lg pl-10 pr-4 py-2 sm:py-3 w-full focus:ring-2 focus:ring-green-600"
              />
            </div>

            {/* Min Price */}
            <div className="relative">
              <FaDollarSign className="absolute left-3 top-3 text-gray-400" />
              <input
                type="number"
                placeholder="Min Price"
                value={minPrice}
                onChange={(e)=>setMinPrice(e.target.value)}
                className="border rounded-lg pl-10 pr-4 py-2 sm:py-3 w-full focus:ring-2 focus:ring-green-600"
              />
            </div>

            {/* Max Price */}
            <div className="relative">
              <FaDollarSign className="absolute left-3 top-3 text-gray-400" />
              <input
                type="number"
                placeholder="Max Price"
                value={maxPrice}
                onChange={(e)=>setMaxPrice(e.target.value)}
                className="border rounded-lg pl-10 pr-4 py-2 sm:py-3 w-full focus:ring-2 focus:ring-green-600"
              />
            </div>

            {/* Search Button */}
            <button 
            onClick={handleSearch}
            className=" bg-green-600 text-white font-semibold rounded-lg py-2 sm:py-3 w-full md:w-auto  hover:bg-green-700 transition">
              Search
            </button>
          </div>
        )}

        {activeTab === "rent" && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Location */}
            <div className="relative">
              <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e)=>setLocation(e.target.value)}
                className="border rounded-lg pl-10 pr-4 py-2 sm:py-3 w-full focus:ring-2 focus:ring-green-600"
              />
            </div>

            {/* Property Type */}
            <div className="relative">
              <FaHome className="absolute left-3 top-3 text-gray-400" />
              <select
              value={propertyType }
              onChange={(e)=>setPropertyType(e.target.value)}
              className="border rounded-lg pl-10 pr-4 py-2 sm:py-3 w-full focus:ring-2 focus:ring-green-600">
                <option>Property Type</option>
                <option>Apartment</option>
                <option>Studio</option>
                <option>Duplex</option>
              </select>
            </div>

            {/* Budget */}
            <div className="relative">
              <FaDollarSign className="absolute left-3 top-3 text-gray-400" />
              <input
                type="number"
                placeholder="Max Budget"
                value={maxPrice}
                onChange={(e)=>setMaxPrice(e.target.value)}
                className="border rounded-lg pl-10 pr-4 py-3 w-full focus:ring-2 focus:ring-green-600"

              />
            </div>

            <button
            onClick={handleSearch}
             className="bg-green-600 text-white font-semibold rounded-lg py-2 sm:py-3 w-full md:w-auto  hover:bg-green-700 transition">
              Search
            </button>
          </div>
        )}

        {activeTab === "sell" && (
          <div className="grid md:grid-cols-3 gap-4">
            {/* Property Type */}
            <div className="relative">
              <FaHome className="absolute left-3 top-3 text-gray-400" />
              <select
              value={propertyType}
              onChange={(e)=>setPropertyType(e.target.value)}
              className="border rounded-lg pl-10 pr-4 py-3 w-full focus:ring-2 focus:ring-green-600">
                <option>Property Type</option>
                <option>Duplex</option>
                <option>Bungalow</option>
                <option>Apartment</option>
              </select>
            </div>

            {/* Location */}
            <div className="relative">
              <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Property Location"
                value={location}
                onChange={(e)=>setLocation(e.target.value)}
                className="border rounded-lg pl-10 pr-4 py-3 w-full focus:ring-2 focus:ring-green-600"
              />
            </div>

            <button
            onClick={addProperty}
            className="bg-green-600 text-white font-semibold rounded-lg py-2 sm:py-3 w-full md:w-auto  hover:bg-green-700 transition">
              List Property
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertySearch;
