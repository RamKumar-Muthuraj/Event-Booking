import React from "react";
import NavBar from "./NavBar";
import { useLocation, matchPath } from "react-router-dom";
import Footer from "./Footer";

export default function MainLayout({ children }) {

  const location = useLocation();

  const hideNav =
    location.pathname === "/login" ||
    location.pathname === "/" ||
    matchPath("/event/:id/seats", location.pathname);

  return (
    <div className="min-h-screen flex flex-col">

      {!hideNav && <NavBar />}

      <main className="flex-1">
        {children}
      </main>

      <Footer />
    </div>
  );
}