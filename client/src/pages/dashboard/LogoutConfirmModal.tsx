import { FiLogOut, FiX } from "react-icons/fi";

type Props = {
  onConfirm: () => void;
  onCancel: () => void;
};

const LogoutConfirmModal = ({ onConfirm, onCancel }: Props) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:p-0">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 dark:bg-black/90 backdrop-blur-sm transition-colors duration-300"
        onClick={onCancel}
      />

      {/* Modal */}
      <div
        className="
          relative z-10 w-full max-w-sm
          fade-in
          rounded-2xl
          border border-border
          bg-card
          p-6
          shadow-glow
        "
      >
        <button
          onClick={onCancel}
          className="absolute right-4 top-4 text-textMuted hover:text-textPrimary transition-colors"
        >
          <FiX />
        </button>

        <div className="flex items-center gap-3">
          <div className="rounded-full bg-red-500/10 p-3 text-red-500">
            <FiLogOut size={20} />
          </div>

          <h2 className="text-lg font-semibold text-textPrimary">
            Confirm Logout
          </h2>
        </div>

        <p className="mt-4 text-sm text-textSecondary">
          Are you sure you want to log out?
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="
              rounded-lg px-4 py-2
              text-sm text-textSecondary
              hover:bg-surfaceElevated
              transition-colors
            "
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="
              rounded-lg bg-red-500 px-4 py-2
              text-sm font-medium text-white
              hover:bg-red-600
              hover:shadow-[0_0_20px_rgba(239,68,68,0.5)]
            "
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirmModal;
