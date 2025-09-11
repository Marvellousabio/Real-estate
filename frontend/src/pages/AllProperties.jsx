import React, { useEffect, useState } from "react";
import { getProperties } from "../services/api";
import { Link } from "react-router-dom"; // import Link

export default function PropertyList() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getProperties();
        setProperties(res.data);
      } catch (err) {
        console.error("Error fetching properties:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return (
      <div className="text-center py-10 mt-15 text-gray-600 font-medium">
        Loading properties...
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto mt-20 p-6">
      {/* Header with button */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">
          Available Properties
        </h2>

        {/* Add Property Button */}
        <Link
          to="/add-property"
          className="bg-green-600 text-white font-semibold px-5 py-2 rounded-lg hover:bg-green-700 transition"
        >
          + Add Property
        </Link>
      </div>

      {properties.length === 0 ? (
        <p className="text-center text-gray-600">
          No properties found. Please add one!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((p) => (
            <div
              key={p._id}
              className="bg-white shadow-lg rounded-xl overflow-hidden border hover:shadow-xl transition"
            >
              {/* Image placeholder */}
              <div className="h-40 bg-gray-200 flex items-center justify-center text-gray-500">
                
    {p.images && p.images.length > 0 ? (
    p.images.map((img, i) => (
      <img
        key={i}
        src={img}
        alt={`${p.title} ${i + 1}`}
        className="w-40 h-full object-cover mr-2"
      />
    ))
  ) : (
    <div className="flex items-center justify-center w-full text-gray-500">
      📷 No Image
    </div>
  )}
              </div>

              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {p.title}
                </h3>
                <p className="text-gray-600 mb-2">{p.location}</p>
                <p className="text-green-700 font-bold mb-4">
                  ${p.price.toLocaleString()}
                </p>

                <div className="grid grid-cols-3 gap-2 text-sm text-gray-600">
                  <p>🛏 {p.bedrooms} Beds</p>
                  <p>🛁 {p.bathrooms} Baths</p>
                  <p>📐 {p.size} sqft</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
