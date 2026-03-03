import React from "react";
import Slider from "../components/ui/Slider";
import Booking from "../components/layout/Booking";
import { useEventBooking } from "../context/EventBooking";

export default function EventBooking() {
  const { allEvents } = useEventBooking();

  return (
    <div className="bg-(--primary-color) min-h-screen text-(--text-primary-color)">
      <div className="w-full">
        <Slider slides={allEvents} autoPlay={true} autoPlayTime={5000} />
      </div>

      <div className="p-2 sm:p-4">
        <Booking />
      </div>
    </div>
  );
}
