import { Armchair } from "lucide-react";
import React from "react";

export default function ConfirmModal({
  IsOpen,
  setIsConfirmOpen,
  handleBookSeats,
  displaySeats,
  price,
}) {
  if (!IsOpen) return;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setIsConfirmOpen(false)}
      />
      <div
        className="relative z-10 w-full max-w-lg bg-(--text-primary-color) rounded-xl p-5 sm:p-6 shadow-xl flex flex-col
          gap-6"
      >
        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-semibold text-(--accent-color)">
          Confirm Booking
        </h2>

        {/* Selected Seats */}
        <div className="flex flex-col gap-3">
          <p className="text-sm text-(--accent-color) font-medium">
            Selected Seats
          </p>

          <div className="flex flex-wrap justify-center gap-3 max-h-40 overflow-y-auto scrollbar-thin mt-3">
            {displaySeats.map((seat) => (
              <div key={seat} className="flex flex-col items-center gap-1">
                <div className="w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center rounded-md bg-blue-500">
                  <Armchair className="w-5 h-5 text-white" />
                </div>

                <span className="text-xs text-(--accent-color)">{seat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Price */}
        <div className="flex justify-between items-center text-sm sm:text-base text-gray-400 font-medium border-t pt-3">
          <span>Total Price</span>

          <span className="text-(--accent-color) font-semibold">
            ${displaySeats.length * price}
          </span>
        </div>

        {/* Buttons */}
        <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end text-xs">
          <button
            onClick={() => setIsConfirmOpen(false)}
            className="w-full sm:w-auto px-3 py-2.5 rounded bg-gray-600 hover:bg-gray-500 transition"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              handleBookSeats();
              setIsConfirmOpen(false);
            }}
            className="w-full sm:w-auto px-3 py-2.5 rounded bg-(--purple-color) text-white hover:opacity-90 transition"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
