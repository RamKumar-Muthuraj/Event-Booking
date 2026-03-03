export const getEventStatus = (eventDate) => {

  if (!eventDate) return "Upcoming";

  const now = new Date();
  const event = new Date(eventDate);

  const next24Hours = new Date(
    now.getTime() + 24 * 60 * 60 * 1000
  );

  const today = new Date();
  today.setHours(0,0,0,0);

  const eventDay = new Date(eventDate);
  eventDay.setHours(0,0,0,0);

  if (eventDay.getTime() === today.getTime()) {
    return "Live";
  }

  if (event > now && event <= next24Hours) {
    return "Upcoming";
  }

  if (event < now) {
    return "Ended";
  }

  return "Future";
};