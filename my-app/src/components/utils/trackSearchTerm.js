export function trackSearch(term) {
  window.gtag?.("event", "search", {
    search_term: term
  });
}