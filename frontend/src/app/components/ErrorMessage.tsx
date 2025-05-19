import {  BadgeX } from "lucide-react";
import { useEffect } from "react";
import { motion } from "framer-motion";

interface ErrorMessageProp {
  message: string;
  onClose: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProp> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.3 }}
      className="fixed top-5 right-5 flex items-center gap-3 rounded-xl bg-red-100 px-5 py-3 text-red-800 shadow-lg"
    >
      <BadgeX className="h-6 w-6 text-red-700" />
      <span className="text-sm font-semibold">{message}</span>
      <button
        onClick={onClose}
        className="ml-3 text-red-700 hover:text-red-900 transition"
      >
        ✕
      </button>
    </motion.div>
  );
};

export default ErrorMessage;



