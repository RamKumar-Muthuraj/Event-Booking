import { Armchair, MapPinIcon } from "lucide-react";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CinemaScreen from "../components/ui/CinemaScreen";
import { useEventBooking } from "../context/EventBooking";
import { useAuth } from "../context/AuthContext";
import { v4 as uuid } from "uuid";
import DisplayCard from "../components/ui/DisplayCard";
import ConfirmModal from "../components/ui/ConfirmModal";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import ToolTip from "../components/ui/ToolTip";
import { trackBooking } from "../components/utils/trackBooking";

export default function BookingTicket() {
  const { id } = useParams();

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const { allEvents, editEvent } = useEventBooking();
  const event = allEvents.find((e) => e.id === id);

  const { currentUser } = useAuth();

  const {
    title,
    imageOne,
    imageTwo,
    date,
    description,
    location,
    price,
    seats,
  } = event || {};

  const InfoSeats = [
    { id: 1, name: "Available", color: "bg-gray-500" },
    { id: 2, name: "Booked", color: "bg-red-500" },
    { id: 3, name: "Selected", color: "bg-blue-500" },
  ];

  const navigate = useNavigate();

  useEffect(() => {
    if (!event) return;

    window.gtag?.("event", "view_event", {
      event_name: title,
      event_id: id,
      location: location,
      price: price,
    });
  }, [event]);

  const generateSeats = (totalSeats) => {
    return Array.from({ length: totalSeats }, (_, i) => {
      const row = String.fromCharCode(65 + Math.floor(i / 10));
      const number = (i % 10) + 1;
      return `${row}${number}`;
    });
  };

  const myBookedSeats =
    event?.booked
      ?.filter((b) => b.userId === currentUser.id)
      ?.flatMap((b) => b.seats) || [];

  const bookedSeat = event?.booked?.flatMap((b) => b.seats) || [];

  const displaySeats = [...new Set([...myBookedSeats, ...selectedSeats])];

  const handleSelectedSeats = (seat) => {
    if (bookedSeat?.includes(seat) && !myBookedSeats?.includes(seat)) {
      return;
    }

    window.gtag?.("event", "select_seat", {
      seat_id: seat,
      event_id: id,
    });

    setSelectedSeats((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat],
    );
  };

  const handleBookSeats = () => {
    if (selectedSeats.length === 0) return;

    const bookings = event.booked || [];

    const validSeats = selectedSeats.filter(
      (seat) => !bookedSeat.includes(seat),
    );

    if (validSeats.length === 0) return;

    const existingUserBooking = bookings.find(
      (b) => b.userId === currentUser.id,
    );

    const updatedBookings = existingUserBooking
      ? bookings.map((b) =>
          b.userId === currentUser.id
            ? {
                ...b,
                seats: [...new Set([...b.seats, ...validSeats])],
              }
            : b,
        )
      : [
          ...bookings,
          {
            id: uuid(),
            userId: currentUser.id,
            seats: validSeats,
            bookingDate: new Date().toISOString(),
          },
        ];

    editEvent({
      ...event,
      booked: updatedBookings,
    });

    trackBooking(id, validSeats, price);
  };

  return (
    <div className="relative min-h-screen bg-(--text-primary-color) pb-15">
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />

      <div
        className="absolute flex items-center gap-2 top-5 left-5 z-50 rounded-full text-(--accent-color) font-medium bg-white/30 backdrop-blur-md px-3 py-2 cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <ArrowLeftIcon className="w-5 h-5" /> Back
      </div>
      <div className="relative w-full h-55 sm:h-90 overflow-hidden">
        <img
          src={imageOne}
          alt={title}
          className="w-full h-full object-cover
          mask-l-from-60% mask-r-from-60% mask-b-from-60%"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr]  gap-8 px-4 sm:px-6 py-8">
        <div className="flex flex-col gap-6 items-center lg:items-start">
          <DisplayCard
            image={imageTwo}
            title={title}
            description={description}
            date={date}
            location={location}
            seats={seats}
            price={price}
          />

          <h2 className="text-xl sm:text-2xl text-(--accent-color) font-semibold">
            Selected Seats
          </h2>

          <div className="w-full flex flex-wrap justify-center lg:justify-start gap-2">
            {displaySeats.length === 0 && (
              <div className="flex flex-col items-center gap-2 text-gray-400">
                <Armchair className="w-12 h-12" />
                <p className="text-sm">No seats selected</p>
              </div>
            )}

            {displaySeats.map((seat) => (
              <div
                key={seat}
                className="w-10 h-10 flex items-center justify-center bg-gray-500 font-medium rounded text-(--accent-color)"
              >
                {seat}
              </div>
            ))}
          </div>

          <button
            disabled={selectedSeats.length === 0}
            onClick={() => setIsConfirmOpen(true)}
            className="w-full sm:w-auto lg:w-full px-6 py-3 bg-(--text-secondary-color) text-white rounded-md             hover:bg-(--purple-color) transition"
          >
            Book Seats
          </button>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap justify-center  gap-4 text-sm">
            {InfoSeats.map((seat) => (
              <div key={seat.id} className="flex items-center gap-2 p-2 ">
                <Armchair className={`${seat.color} w-5 h-5 rounded`} />
                <span className="font-medium text-(--accent-color)">
                  {seat.name}
                </span>
              </div>
            ))}
          </div>

          <div className="w-full px-2 sm:px-6">
            <CinemaScreen />
          </div>

          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 max-w-3xl mx-auto">
            {generateSeats(seats).map((seat) => (
              <ToolTip
                key={seat}
                content={seat}
                config={{
                  position: "top",
                  trigger: "hover",
                  delay: 200,
                }}
              >
                <div className="max-w-xl flex flex-col items-center gap-2">
                  <button
                    onClick={() => handleSelectedSeats(seat)}
                    disabled={
                      bookedSeat.includes(seat) && !myBookedSeats.includes(seat)
                    }
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-sm transition ${
                      myBookedSeats.includes(seat)
                        ? "bg-blue-500"
                        : bookedSeat.includes(seat)
                          ? "bg-red-500 cursor-not-allowed"
                          : selectedSeats.includes(seat)
                            ? "bg-blue-400"
                            : "bg-gray-500 hover:bg-blue-400"
                    }
  `}
                  >
                    <Armchair className="w-6 h-6 text-white mx-auto" />
                  </button>

                  <span className="text-xs text-(--accent-color) font-medium">
                    {seat}
                  </span>
                </div>
              </ToolTip>
            ))}
          </div>
        </div>
      </div>

      <ConfirmModal
        IsOpen={isConfirmOpen}
        setIsConfirmOpen={setIsConfirmOpen}
        handleBookSeats={handleBookSeats}
        displaySeats={selectedSeats}
        price={price}
      />
    </div>
  );
}
