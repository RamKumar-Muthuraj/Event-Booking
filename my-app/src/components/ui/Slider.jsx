import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import React, { useEffect, useState } from "react";

export default function Slider({
  slides,
  autoPlay = true,
  autoPlayTime = 3000,
}) {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, autoPlayTime);

    return () => clearInterval(timer);
  }, [autoPlay, autoPlayTime, slides.length]);

  return (
    <div className="relative w-full h-60 sm:h-80 md:h-120 overflow-hidden shadow-lg">
      {/* Slides Wrapper */}
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="w-full h-full shrink-0 relative">
            <div className={`relative w-full h-full flex ${slide.bgColor}`}>
              <div className="absolute inset-0 bg-black/40 z-0" />

              <div className="absolute bottom-6 sm:bottom-10 left-4 sm:left-10 w-[90%] sm:w-1/2 z-10 text-white">
                <h2 className="text-xl sm:text-2xl md:text-4xl font-bold mb-2">
                  {slide.title}
                </h2>

                <p className="text-xs font-medium mb-2">{slide.description}</p>

                {(slide.date || slide.location) && (
                  <span className="text-xs sm:text-sm md:text-base text-gray-200">
                    {slide.date} {slide.date && "|"} {slide.location}
                  </span>
                )}
              </div>
              <img
                src={slide.imageOne}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 transition p-2 sm:p-3 rounded-full"
      >
        <ChevronLeftIcon className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 transition p-2 sm:p-3 rounded-full"
      >
        <ChevronRightIcon className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
      </button>
    </div>
  );
}
