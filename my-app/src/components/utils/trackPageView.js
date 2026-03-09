export const trackPageView = (url, eventId = null) => {
  window.gtag?.("event", "page_view", {
    page_path: url,
    event_id: eventId
  });
};