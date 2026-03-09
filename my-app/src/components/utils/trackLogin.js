export function trackLogin(userDetails) {
  window.gtag?.("event", "login", {
    method: "email",
    user_id: userDetails.id,
    user_role: userDetails.role
  });
}