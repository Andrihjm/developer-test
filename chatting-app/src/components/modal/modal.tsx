import { useEffect } from "react";

type ModalProps = {
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
};

const Modal = ({ onClose, title = "Modal Title", children }: ModalProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative w-[90%] max-w-md rounded-lg border border-[#242626] bg-[#161717] p-6 text-[#FAFAFA] shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 cursor-pointer text-2xl text-[#FAFAFA] hover:text-[#A5A5A5]"
        >
          &times;
        </button>

        <h2 className="mb-4 text-xl font-semibold">{title}</h2>

        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
