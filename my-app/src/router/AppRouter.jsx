import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/login";
import ProtectedRoute from "./ProtectedRoute";
import EventBooking from "../pages/EventBooking";
import BookingTicket from "../pages/BookingTicket";

export default function AppRouter() {
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
        path="event/:id/seats"
        element={
          <ProtectedRoute>
            <BookingTicket />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
