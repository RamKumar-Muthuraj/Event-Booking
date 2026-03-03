export const getEventStatus = (eventDate) => {
  if (!eventDate) {
    return "Upcoming";
  }

  const now = new Date();
  const eventDateObj = new Date(eventDate);

  now.setHours(0, 0, 0, 0);
  eventDateObj.setHours(0, 0, 0, 0);

  if (eventDateObj > now) {
    return "Upcoming";
  } else if (eventDateObj.toDateString() === now.toDateString()) {
    return "Live";
  }

  return "Ended";
};
