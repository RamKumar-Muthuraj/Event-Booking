export const trackBooking = (eventId, seats, price) => {
  window.gtag?.("event", "booking_complete", {
    event_id: eventId,
    seats: seats.length,
    value: price * seats.length,
    currency: "USD"
  });
};