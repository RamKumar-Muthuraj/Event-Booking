import { createContext, useContext, useEffect, useState } from "react";
import { getEventStatus } from "../components/utils/eventStatus";

const EventBookingContext = createContext();

export function EventBookingProvider({ children }) {
  const [allEvents, setAllEvents] = useState(() => {
    const storedEvents = localStorage.getItem("events");
    return storedEvents && storedEvents !== "undefined"
      ? JSON.parse(storedEvents)
      : [];
  });

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(allEvents));
  }, [allEvents]);

  const addEvent = (eventData) => {
    setAllEvents((prev) => [...prev, eventData]);
  };

  const editEvent = (updatedEvent) => {
    setAllEvents((prev) =>
      prev.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event,
      ),
    );
  };

  const deleteEvent = (eventId) => {
    setAllEvents((prev) => prev.filter((event) => event.id !== eventId));
  };

  useEffect(() => {
    const updatedEvents = allEvents.map((event) => ({
      ...event,
      status: getEventStatus(event.date),
    }));

    setAllEvents(updatedEvents);
  }, []);

  return (
    <EventBookingContext.Provider
      value={{ allEvents, addEvent, editEvent, deleteEvent }}
    >
      {children}
    </EventBookingContext.Provider>
  );
}

export const useEventBooking = () => useContext(EventBookingContext);
