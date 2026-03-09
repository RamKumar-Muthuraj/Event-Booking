import { useEffect } from "react";
import { trackModalOpen } from "../utils/trackModelTrigger";

export default function Modal({ isOpen, onClose, children, size, modalName }) {
  trackModalOpen(modalName);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
    }
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
      />
      <div
        className={`relative bg-(--primary-color) p-1 rounded w-full ${size} 
                      transform transition-all duration-300 scale-100`}
      >
        {children}
      </div>
    </div>
  );
}
