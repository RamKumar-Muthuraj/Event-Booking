import { createContext, useContext, useEffect, useState } from "react";
import eventsData from "../events.json";
import { getEventStatus } from "../components/utils/eventStatus";

const EventBookingContext = createContext();

export function EventBookingProvider({ children }) {
  const [allEvents, setAllEvents] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("events")) || [];

    const jsonIds = eventsData.map((e) => e.id);

    const restoredDefaults = eventsData.filter(
      (jsonEvent) =>
        !stored.some((storedEvent) => storedEvent.id === jsonEvent.id),
    );

    const mergedEvents = [...stored, ...restoredDefaults].map((event) => ({
      ...event,
      booked: event.booked || [],
      status: getEventStatus(event.date),
    }));

    setAllEvents(mergedEvents);

    localStorage.setItem("events", JSON.stringify(mergedEvents));
  }, []);

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(allEvents));
  }, [allEvents]);

  const addEvent = (event) => {
    setAllEvents((prev) => [...prev, { ...event, booked: [] }]);
  };

  const editEvent = (updatedEvent) => {
    setAllEvents((prev) =>
      prev.map((event) =>
        event.id === updatedEvent.id
          ? {
              ...updatedEvent,
              status: getEventStatus(updatedEvent.date),
            }
          : event,
      ),
    );
  };

  const deleteEvent = (id) => {
    setAllEvents((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <EventBookingContext.Provider
      value={{
        allEvents,
        addEvent,
        editEvent,
        deleteEvent,
      }}
    >
      {children}
    </EventBookingContext.Provider>
  );
}

export const useEventBooking = () => useContext(EventBookingContext);
