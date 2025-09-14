import React, { useState } from "react";
import FaNairaSign from "../icons/FaNairaSign";

function PropertyCard({ p }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Defensive fallback for images
  const hasImages = Array.isArray(p.images) && p.images.length > 0;
  const images = hasImages
    ? p.images
    : ["https://via.placeholder.com/400x300?text=No+Image"];

  const nextImage = () => {
    setCurrentIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden border hover:shadow-xl transition">
      {/* Image Section */}
      <div className="relative h-40 bg-gray-200">
        <img
          src={images[currentIndex]}
          alt={`${p.title} ${currentIndex + 1}`}
          className="w-full h-full object-cover"
        />

        {/* Carousel Controls */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white px-2 py-1 rounded-full hover:bg-black/60"
            >
              ◀
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white px-2 py-1 rounded-full hover:bg-black/60"
            >
              ▶
            </button>
          </>
        )}
      </div>

      {/* Details Section */}
      <div className="p-5">
        <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-1">
          {p.title || "Untitled Property"}
        </h3>
        <p className="text-gray-600 mb-2 line-clamp-1">
          {p.location || "Location not specified"}
        </p>
        <p className="text-green-700 font-bold mb-4 flex items-center gap-1">
          <FaNairaSign style={{ fontWeight: "bold", opacity: 0.9 }} />
          {p.price ? p.price.toLocaleString() : "N/A"}
        </p>

        <div className="grid grid-cols-3 gap-2 text-sm text-gray-600">
          <p>🛏 {p.bedrooms ?? 0} Beds</p>
          <p>🛁 {p.bathrooms ?? 0} Baths</p>
          <p>📐 {p.size ?? "N/A"} sqft</p>
        </div>
      </div>
    </div>
  );
}

export default PropertyCard;
