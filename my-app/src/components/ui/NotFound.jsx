import React from "react";
import { SearchX } from "lucide-react";

export default function NotFound({
  title = "No Data Found",
  description = "We couldn't find anything matching your request.",
  buttonText,
  onAction,
  image = "/Vector.png",
}) {
  return (
    <div className="w-full min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      {/* Illustration */}
      <div className="w-52 sm:w-64 md:w-72 lg:w-100  mb-6 opacity-90">
        <img
          src={image}
          alt="No data"
          className="w-full h-full object-cover"
        />
      </div>
      {!image && <SearchX className="w-16 h-16 text-gray-400 mb-4" />}
      <h2 className="text-xl sm:text-2xl font-semibold text-(--accent-color)">
        {title}
      </h2>
      <p className="text-gray-400 text-sm sm:text-base mt-2 max-w-md">
        {description}
      </p>
      {buttonText && (
        <button
          onClick={onAction}
          className="px-6 py-2 rounded-md
          bg-(--purple-color)
          text-white
          hover:opacity-90
          transition"
        >
          {buttonText}
        </button>
      )}
    </div>
  );
}
