import React, { useEffect, useState } from "react";
import Cards from "../ui/Cards";
import Modal from "../ui/Modal";
import Form from "../ui/Form";
import { v4 as uuid } from "uuid";
import { useEventBooking } from "../../context/EventBooking";
import NotFound from "../ui/NotFound";

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
    type: "text",
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
    max: 200,
  },
];

export default function Booking({ filteredEvents, currentUser, isModalOpen, setIsModalOpen }) {
  const { editEvent, deleteEvent } = useEventBooking();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { addEvent } = useEventBooking();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageOne: "",
    imageTwo: "",
    date: "",
    location: "",
    price: "",
    seats: 0,
  });

  const handleSubmit = (data) => {
    if (selectedEvent) {
      const updatedEvent = {
        ...selectedEvent,
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
      imageTwo: "",
      date: "",
      location: "",
      price: "",
      seats: 0,
    });

    setSelectedEvent(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (selectedEvent) {
      setFormData({
        title: selectedEvent.title || "",
        description: selectedEvent.description || "",
        imageOne: selectedEvent.imageOne || "",
        imageTwo: selectedEvent.imageTwo || "",
        date: selectedEvent.date
          ? new Date(selectedEvent.date).toISOString().split("T")[0]
          : "",
        location: selectedEvent.location || "",
        price: selectedEvent.price || "",
        seats: selectedEvent.seats || 0,
      });
    }
  }, [selectedEvent]);

  return (
    <div className="p-2 lg:p-6 min-h-screen space-y-3">
      <div className="text-5xl text-(--text-primary-color) py-2 font-bold">
        Events
      </div>

      {filteredEvents.length === 0 ? (
        <div className="w-full flex items-center justify-center mx-auto">
          <NotFound
            title="No Events Available"
            description="Try changing filters or check again later."
          />
        </div>
      ) : (
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 mt-5">
        {filteredEvents.map((event) => (
          <Cards
            key={event.id}
            event={event}
            action={`/event/${event.id}/seats`}
            onEdit={() => {
              setIsModalOpen(true);
              setSelectedEvent(event);
            }}
            role={currentUser.role}
            onDelete={() => deleteEvent(event.id)}
          />
        ))}
      </div>)}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        size={"max-w-xl"}
        modalName="BookingFormModal"
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
