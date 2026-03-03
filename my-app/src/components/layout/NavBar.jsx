import React, { useEffect, useState } from "react";
import { Bell, LogOut, Menu, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const { logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 120) {
        setShowNav(true);
      } else {
        setShowNav(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`
        fixed top-0 left-0 right-0
        h-16 z-50
        bg-(--primary-color)/90
        backdrop-blur-md
        shadow-md
        border-b border-white/10
         ${
           showNav ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
         }
      `}
    >
      <div className="max-w-7xl mx-auto h-full px-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="logo" className="w-40 object-contain" />
        </div>

        <div className="hidden md:flex items-center gap-8">
          {/* Notification */}
          <div className="relative cursor-pointer">
            <Bell className="w-6 h-6 text-(--text-primary-color)" />
            <span
              className="
                absolute -top-1 -right-1
                bg-red-500 text-white
                text-[10px]
                px-1.5 rounded-full
              "
            >
              3
            </span>
          </div>

          {/* Profile */}
          <img
            src="https://i.pravatar.cc/40?img?1"
            alt="profile"
            className="
              w-9 h-9
              rounded-full
              object-cover
              cursor-pointer
              border-2 border-(--text-primary-color)
            "
          />
          <div onClick={() => logout()}>
            <LogOut className="w-7 h-7 object-cover text-red-600 hover:text-red-500" />
         </div>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-(--accent-color)"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <div
          className="
            md:hidden
            bg-(--text-primary-color)
            border-t border-white/10
            px-4 py-4
            flex flex-col gap-4
          "
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-(--accent-color)" />
              <span className="text-(--accent-color)">Notifications</span>
            </div>

            <img
              src="https://i.pravatar.cc/40?img=12"
              alt="profile"
              className="w-9 h-9 rounded-full"
            />
          </div>
        </div>
      )}
    </header>
  );
}
