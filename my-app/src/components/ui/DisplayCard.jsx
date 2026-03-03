import { MapPinIcon } from "lucide-react";
import React from "react";

export default function DisplayCard({
  image,
  title,
  description,
  date,
  location,
  seats,
  price,
}) {
  return (
    <div className="w-full max-w-md mx-auto flex flex-col gap-4">
      {/* Image */}
      <div className="w-full hidden sm:flex aspect-4/5 sm:aspect-video rounded-xl overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>

      <div className="flex flex-col gap-3">
        <h1 className="text-xl sm:text-2xl font-bold text-(--accent-color)">
          {title}
        </h1>

        {/* Description */}
        <p className="text-sm text-gray-300 max-h-20 overflow-y-auto pr-1 scrollbar-thin">
          {description}
        </p>

        {/* Date , Location */}
        <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-400 font-medium">
          <span>{new Date(date).toLocaleDateString()}</span>

          <span className="hidden sm:inline">•</span>

          <div className="flex items-center gap-1 bg-(--accent-color) text-(--gray-color) px-2 py-1 rounded shadow-sm">
            <MapPinIcon className="w-4 h-4" />
            {location}
          </div>
        </div>

        {/* seats */}
        <div className="flex flex-wrap gap-2 text-xs sm:text-sm text-gray-400 font-medium">
          <span>Seats: {seats}</span>
          <span className="hidden sm:inline">•</span>
          <span>Price: ${price}</span>
        </div>
      </div>
    </div>
  );
}
