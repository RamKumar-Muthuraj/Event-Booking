import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Login from "../pages/login";
import ProtectedRoute from "./ProtectedRoute";
import EventBooking from "../pages/EventBooking";
import BookingTicket from "../pages/BookingTicket";
import { trackPageView } from "../components/utils/trackPageView";

export default function AppRouter() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;

    const eventMatch = path.match(/event\/(.*?)\/seats/);
    const eventId = eventMatch ? eventMatch[1] : null;

    trackPageView(path, eventId);
  }, [location]);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Login />} />

      <Route
        path="/event"
        element={
          <ProtectedRoute>
            <EventBooking />
          </ProtectedRoute>
        }
      />

      <Route
        path="/event/:id/seats"
        element={
          <ProtectedRoute>
            <BookingTicket />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}