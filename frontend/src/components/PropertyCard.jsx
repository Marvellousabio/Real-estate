import React, { useState } from "react";

function PropertyCard({ p }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) =>
      prev === p.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? p.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden border hover:shadow-xl transition">
      <div className="relative h-40 bg-gray-200">
        {p.images && p.images.length > 0 ? (
          <>
            <img
              src={p.images[currentIndex]}
              alt={`${p.title} ${currentIndex + 1}`}
              className="w-full h-full object-cover"
            />

            {/* Left Arrow */}
            {p.images.length > 1 && (
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white px-2 py-1 rounded-full hover:bg-black/60"
              >
                ◀
              </button>
            )}

            {/* Right Arrow */}
            {p.images.length > 1 && (
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white px-2 py-1 rounded-full hover:bg-black/60"
              >
                ▶
              </button>
            )}
          </>
        ) : (
          <div className="flex items-center justify-center w-full h-full text-gray-500">
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
  );
}

export default PropertyCard;
