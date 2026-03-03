import React, { useEffect, useState } from "react";
import { Search, Plus } from "lucide-react";
import Cards from "../ui/Cards";
import Modal from "../ui/Modal";
import Form from "../ui/Form";
import { v4 as uuid } from "uuid";
import { useEventBooking } from "../../context/EventBooking";
import { getEventStatus } from "../utils/eventStatus";
import { useAuth } from "../../context/AuthContext";

const BookingForm = [
    {
      name: "title",
      label: "Title",
      required: true,
      type: "text",
      maxLength: 50,
    },
    {
      name: "description",
      label: "Description",
      required: true,
      type: "text",
      maxLength: 150,
    },
    {
      name: "imageOne",
      label: "Image URL 1",
      required: true,
      type: "text",
    },
    {
      name: "imageTwo",
      label: "Image URL 2",
      required: true,
      type: "text"
    },
    {
      name: "date",
      label: "Date",
      required: true,
      type: "date",
    },
    {
      name: "location",
      label: "Location",
      required: true,
      type: "text",
    },
    {
      name: "price",
      label: "Price",
      required: true,
      type: "number",
      match: /^\d+(\.\d{1,2})?$/,
    },
    {
      name: "seats",
      label: "Seats",
      required: true,
      type: "number",
      match: /^\d+$/,
      min: 1,
      max: 60
    }
  ];


export default function Booking() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("Live");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { editEvent, deleteEvent } = useEventBooking();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { currentUser } = useAuth();
  const { addEvent, allEvents } = useEventBooking();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageOne: "",
    imageTwo:"",
    date: "",
    location: "",
    price: "",
    seats: 0,
  });



  const handleSubmit = (data) => {
    if (selectedEvent) {
      const updatedEvent = {
        id: selectedEvent.id,
        ...data,
      };
      editEvent(updatedEvent);
    } else {
    addEvent({
      id: uuid(),
      ...data,
    });
  }

    setFormData({
      title: "",
      description: "",
      imageOne: "",
      imageTwo:"",
      date: "",
      location: "",
      price: "",
      seats: 0,
    });

    setSelectedEvent(null);
    setIsModalOpen(false);
  };

  const filters = ["All", "Live", "Upcoming", "Ended"];

  const filteredEvents = allEvents
    .map((event) => ({
      ...event,
      status: getEventStatus(event.date),
    }))
    .filter((event) => {
      const matchFilter =
        activeFilter === "All" || event.status === activeFilter;
      const matchSearch =
        event.title.toLowerCase().includes(search.toLowerCase()) ||
        event.description.toLowerCase().includes(search.toLowerCase()) ||
        event.location.toLowerCase().includes(search.toLowerCase());
      return matchFilter && matchSearch;
    });

  useEffect(() => {
    if (selectedEvent) {
      setFormData({
        title: selectedEvent.title || "",
        description: selectedEvent.description || "",
        imageOne: selectedEvent.imageOne || "",
        imageTwo: selectedEvent.imageTwo || "",
        date: selectedEvent.date ? new Date(selectedEvent.date).toISOString().split("T")[0] : "",
        location: selectedEvent.location || "",
        price: selectedEvent.price || "",
        seats: selectedEvent.seats || 0,
      });
    }
  }, [selectedEvent]);

  return (
    <div className="p-2 lg:p-6 min-h-screen space-y-3">
      <div
        className="flex flex-col sm:flex-row items-center sm:justify-between 
                    gap-3 rounded px-3 lg:px-7 py-2 w-full 
                    bg-(--gray-color)"
      >
        {/* Tabs */}
        <div className="flex items-center gap md:gap-2 lg:gap-3 overflow-hidden">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter?.(filter)}
              className={`px-4 py-2 cursor-pointer text-sm font-medium rounded transition-all
                ${
                  activeFilter === filter
                    ? "bg-(--purple-color) text-(--accent-color)"
                    : "text-gray-600 hover:bg-white/50"
                }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2  bg-white rounded px-3 py-2 w-full sm:w-64">
            <Search className="w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search events..."
              onChange={(e) => setSearch(e.target.value)}
              className="outline-none bg-transparent p-0.5 w-full text-sm"
            />
          </div>

        {currentUser && currentUser.role === "admin" && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-2 bg-(--green-color) text-(--accent-color)               font-medium px-4 py-3 sm:py-2 rounded hover:opacity-90 transition"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add Event</span>
          </button>
        )}
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 mt-5">
        {filteredEvents.map((event) => (
          <Cards key={event.id} event={event} action={`/event/${event.id}/seats`} onEdit={() => {
                setIsModalOpen(true);
                setSelectedEvent(event);
              }} role={currentUser.role} onDelete={() => deleteEvent(event.id)} />
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        size={"max-w-xl"}
      >
        <Form
          fields={BookingForm}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          direction="grid grid-cols-2"
          buttonText={selectedEvent ? "Update Event" : "Create Event"}
          bgColor="bg-(--primary-color)"
        />
      </Modal>
    </div>
  );
}
