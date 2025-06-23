import { useEffect } from 'react';

const Modal = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 flex items-center justify-center backdrop-blur-md bg-white/30'>
      <div className='bg-white rounded-2xl shadow-xl p-6 w-96 max-w-lg relative'>
        <header className='flex justify-between items-center border-b pb-3 mb-4'>
          <h2 className='text-xl font-semibold text-gray-800'>{title}</h2>
          <button
            onClick={onClose}
            className='text-gray-500 hover:text-gray-700 text-2xl font-bold'
          >
            &times;
          </button>
        </header>
        <div className='text-gray-700 leading-relaxed'>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
