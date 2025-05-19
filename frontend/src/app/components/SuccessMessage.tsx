import { CircleCheckBig } from "lucide-react";
import { useEffect } from "react";
import { motion } from "framer-motion";

interface SuccessMessageProps {
  message: string;
  onClose: () => void;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ message, onClose }) => {
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
      className="fixed top-5 right-5 flex items-center gap-3 rounded-xl bg-green-100 px-5 py-3 text-green-800 shadow-lg"
    >
      <CircleCheckBig className="h-6 w-6 text-green-700" />
      <span className="text-sm font-semibold">{message}</span>
      <button
        onClick={onClose}
        className="ml-3 text-green-700 hover:text-green-900 transition"
      >
        ✕
      </button>
    </motion.div>
  );
};

export default SuccessMessage;



