import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { DollarSignIcon, MapPinIcon } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

function Cards({ event, action, onEdit, onDelete, role }) {
  if (!event) return null;

  const { imageTwo, title, description, status, date, location, price } = event;
  const navigate = useNavigate();

  return (
    <div
      className="bg-(--gray-color) rounded shadow-md overflow-hidden 
                    hover:shadow-xl hover:-translate-y-1 
                    transition-all duration-300 flex flex-row h-60 relative group cursor-pointer"
    >
      <div
        className={`absolute -top-20 right-5 text-[200px] text-[#E961FEB6] opacity-45 transition-opacity duration-300 z-10 text-outline pointer-events-none   select-none`}
      >
        {title.charAt(0).toUpperCase()}
      </div>

      {role === "admin" && (
        <div className="absolute flex items-center justify-between top-3 right-3 gap-2">
          <div
            onClick={onEdit}
            className="border-(--purple-color) rounded-full bg-white/60 backdrop-blur-sm p-3 text-(--text-secondary-color)"
          >
            <Pencil1Icon className="w-4 h-4" />
          </div>
          <div
            onClick={onDelete}
            className="border-(--purple-color) rounded-full bg-red-300 backdrop-blur-sm p-3 text-(--text-secondary-color)"
          >
            <TrashIcon className="w-4 h-4" />
          </div>
        </div>
      )}

      {/* Image Section */}
      <div className="relative h-full w-40 sm:w-48 md:w-52">
        <img
          src={imageTwo}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover"
        />

        {status && (
          <span
            className="absolute top-3 left-3 
                           bg-(--gray-color) text-(--accent-color) font-semibold
                           text-[10px] sm:text-xs 
                           px-3 py-1 rounded"
          >
            {status}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-2 sm:p-4 flex flex-col grow justify-between min-w-0 overflow-hidden">
        <div className="grow flex flex-col min-h-0 overflow-hidden">
          <h3
            className="text-lg sm:text-xl md:text-2xl font-bold 
                         text-(--accent-color) mb-2"
          >
            {title}
          </h3>

          {description && (
            <p
              className="text-gray-300 font-medium
             text-xs sm:text-sm mb-2
             max-h-16 overflow-y-auto pr-1
             scrollbar-thin"
            >
              {description}
            </p>
          )}
          <div className="flex items-center flex-wrap gap-2 text-xs font-medium mb-4">
            {location && (
              <div className="flex items-center gap bg-(--accent-color) text-(--gray-color) px-2 py-1 rounded shadow-sm text-xs">
                <MapPinIcon className="w-4 h-4" /> {location}
              </div>
            )}

            {price && (
              <span className="flex items-center gap bg-(--accent-color) text-(--gray-color) px-2 py-1 rounded shadow-sm text-xs">
                <DollarSignIcon className="w-4 h-4" /> {price}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            {date && (
              <span className="flex items-center gap-1 bg-(--text-accent-color) px-3 py-2 rounded shadow-sm text-sm font-medium text-gray-800 border">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                {date}
              </span>
            )}
          </div>
          <button
            disabled={status === "Upcoming" || status === "Ended" || status === "Future"}
            onClick={() => navigate(action)}
            className={`${status === "Ended" ? "bg-gray-600" : "bg-(--purple-color)"} text-white px-6 py-2 rounded 
                             hover:bg-primary/90 transition-colors duration-300 
                             text-sm font-medium`}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Cards);
