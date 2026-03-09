export function trackModalOpen(modalName) {
  window.gtag?.("event", "modal_open", {
    modal_name: modalName
  });
}