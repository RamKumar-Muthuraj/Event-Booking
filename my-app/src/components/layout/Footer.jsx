import React from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-(--text-primary-color) text-(--accent-color) border-t border-white/10">
      
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid gap-10
                      grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">

        {/* Brand */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-wide">
            CineBook 🎬
          </h2>

          <p className="text-sm text-gray-400 leading-relaxed">
            Discover movies, concerts, and live experiences.
            Book your seats effortlessly and enjoy unforgettable moments.
          </p>

          <div className="flex gap-4 pt-2">
            <Facebook className="hover:text-blue-500 cursor-pointer" />
            <Instagram className="hover:text-pink-500 cursor-pointer" />
            <Twitter className="hover:text-sky-400 cursor-pointer" />
            <Youtube className="hover:text-red-500 cursor-pointer" />
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-4">
            Quick Links
          </h3>

          <ul className="space-y-2 text-gray-400 text-sm">
            <li className="hover:text-white cursor-pointer">
              Home
            </li>
            <li className="hover:text-white cursor-pointer">
              Events
            </li>
            <li className="hover:text-white cursor-pointer">
              Book Tickets
            </li>
            <li className="hover:text-white cursor-pointer">
              About Us
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-4">
            Categories
          </h3>

          <ul className="space-y-2 text-gray-400 text-sm">
            <li className="hover:text-white cursor-pointer">
              Movies
            </li>
            <li className="hover:text-white cursor-pointer">
              Music Shows
            </li>
            <li className="hover:text-white cursor-pointer">
              Comedy Nights
            </li>
            <li className="hover:text-white cursor-pointer">
              Festivals
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-4">
            Contact
          </h3>

          <div className="space-y-3 text-gray-400 text-sm">
            <div className="flex gap-2 items-center">
              <MapPin size={16} />
              Chennai, India
            </div>

            <div className="flex gap-2 items-center">
              <Mail size={16} />
              support@cinebook.com
            </div>

            <div className="flex gap-2 items-center">
              <Phone size={16} />
              +91 98765 43210
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10 text-center py-5 text-sm text-gray-500">
        © {new Date().getFullYear()} CineBook. All rights reserved.
      </div>
    </footer>
  );
}