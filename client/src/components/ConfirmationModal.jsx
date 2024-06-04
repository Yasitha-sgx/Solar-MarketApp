const ConfirmationModal = ({ show, onClose, onConfirm, message }) => {
  if (!show) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-10 flex items-center justify-center px-8 bg-gray-600 bg-opacity-50"
      onClick={handleOverlayClick}
    >
      <div className="w-full max-w-md px-3 overflow-hidden bg-white rounded-lg shadow-xl">
        <div className="p-4">
          <p className="text-lg text-gray-800">{message}</p>
        </div>
        <div className="flex flex-wrap justify-center gap-2 p-4 md:justify-end">
          <button
            onClick={onClose}
            className="px-[32px] py-[8px] btn-fill !bg-gray-500 rounded hover:!bg-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-[32px] py-[8px] btn-fill !bg-red-500 rounded hover:!bg-red-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};
export default ConfirmationModal;
