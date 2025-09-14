import React, { useEffect, useState } from "react";
import { getProperties } from "../services/api";
import PropertyCard from "../components/PropertyCard"
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

      {Array.isArray(properties) && properties.length > 0 ? (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {properties.map((p) => (
      <PropertyCard key={p._id || p.id} p={p} />
    ))}
  </div>
) : (
  <p className="text-center text-gray-600">
    No properties found. Please add one!
  </p>
)}
    </div>
  );
}
