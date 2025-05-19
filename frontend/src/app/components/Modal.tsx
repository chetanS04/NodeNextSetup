import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Modal = ({ isOpen, onClose,title, children }: {
  isOpen: boolean;
  onClose: () => void;
      title: string;
  children: React.ReactNode;
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-start py-5 justify-center bg-gray-800/10 z-50 overflow-y-auto">
          <motion.div
            key="modal"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/3 p-6 relative"
          >
            <button
              onClick={onClose}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              aria-label="Close modal"
            >
              ✕
            </button>
          <h2 className="text-2xl font-bold mb-4">{title}</h2>
            <div>{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
   

// import React from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// const Modal = ({
//   isOpen,
//   onClose,
//   title,
//   children,
// }: {
//   isOpen: boolean;
//   onClose: () => void;
//   title: string;
//   children: React.ReactNode;
// }) => {
//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <div className="fixed inset-0 flex items-start justify-end bg-gray-800/10 z-50 overflow-y-auto">
//           <motion.div
//             key="modal"
//             initial={{ x: '100%', opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             exit={{ x: '100%', opacity: 0 }}
//             transition={{ type: 'spring', damping: 25, stiffness: 300 }}
//             className="bg-white h-full md:h-auto md:my-10 md:rounded-lg shadow-lg w-full md:w-1/3 p-6 relative"
//           >
//             <button
//               onClick={onClose}
//               className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
//               aria-label="Close modal"
//             >
//               ✕
//             </button>

//             <h2 className="text-2xl font-bold mb-4">{title}</h2>

//             <div>{children}</div>
//           </motion.div>
//         </div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default Modal;
