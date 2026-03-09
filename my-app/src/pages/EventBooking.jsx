import React, { useState } from "react";
import Slider from "../components/ui/Slider";
import Booking from "../components/layout/Booking";
import { useEventBooking } from "../context/EventBooking";
import { Plus, Search } from "lucide-react";
import { getEventStatus } from "../components/utils/eventStatus";
import { useAuth } from "../context/AuthContext";
import { trackSearch } from "../components/utils/trackSearchTerm";

export default function EventBooking() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("Live");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addEvent, allEvents } = useEventBooking();
  const { currentUser } = useAuth();

  const filters = ["All", "Live", "Upcoming", "Ended"];

  const statusOrder = {
    Live: 0,
    Upcoming: 1,
    Ended: 2,
  };

  const filteredEvents = allEvents
    .filter((event) => {
      const matchFilter =
        activeFilter === "All" || event.status === activeFilter;

      const matchSearch =
        event.title.toLowerCase().includes(search.toLowerCase()) ||
        event.location.toLowerCase().includes(search.toLowerCase());

      return matchFilter && matchSearch;
    })
    .sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);

  return (
    <div className="relative bg-(--primary-color) min-h-screen text-(--text-primary-color)">
      <div className="w-full">
        <Slider slides={allEvents} autoPlay={true} autoPlayTime={5000} />
      </div>

      <div
        className="absolute w-[90%] top-15 left-20 flex flex-col sm:flex-row items-center sm:justify-between 
                    gap-3 rounded-full px-3 lg:px-7 py-2  backdrop-blur-md
                    bg-transparent shadow-md border border-spacing-0.5 border-(--accent-color)"
      >
        {/* Tabs */}
        <div className="flex items-center gap md:gap-2 lg:gap-3 overflow-hidden">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter?.(filter)}
              className={`px-4 py-2 cursor-pointer text-sm text-(--accent-color) font-medium rounded-lg transition-all
                ${
                  activeFilter === filter
                    ? "bg-(--purple-color)"
                    : " hover:bg-white/50"
                }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2  bg-white rounded-lg px-3 py-2 w-full sm:w-64">
            <Search className="w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search events..."
              onChange={(e) => {
                const value = e.target.value;
                setSearch(value);
                if (value.length > 2) {
                  trackSearch(value);
                }
              }}
              className="outline-none bg-transparent p-0.5 w-full text-sm"
            />
          </div>

          {currentUser && currentUser.role === "admin" && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center justify-center gap-2 rounded-lg bg-(--green-color) text-(--accent-color)               font-medium px-4 py-3 sm:py-2 hover:opacity-90 transition"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add Event</span>
            </button>
          )}
        </div>
      </div>

      <div className="p-2 sm:p-">
        <Booking
          filteredEvents={filteredEvents}
          currentUser={currentUser}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      </div>
    </div>
  );
}
