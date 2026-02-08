import { useState } from "react";
import { useDailyActivities } from "../../context/DailyActivityContext";

type Props = {
  onClose: () => void;
};

const AddActivityModal = ({ onClose }: Props) => {
  const { addActivity } = useDailyActivities();

  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [_, setShake] = useState(false);


  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = async () => {
    if (!title.trim()) {
      setError("Please add a title to create the activity.");
      setShake(true);
      setTimeout(() => setShake(false), 300);
      return;
    }

    setError("");
    setLoading(true);

    try {
      await addActivity({
        title: title.trim(),
        notes: notes.trim(),
        links: [],
        images: [],
        date: today,
      });
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center pt-24 pb-75">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-white/80 dark:bg-black/60 backdrop-blur-sm transition-colors duration-300"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="
          relative z-10 w-full max-w-md
          fade-in
          rounded-2xl
          border border-border
          bg-surface
          p-6
          shadow-glow
        "
      >
        <h2 className="text-lg font-semibold text-textPrimary">
          New Activity
        </h2>

        {/* Error message */}
        {error && (
          <p className="mt-3 text-sm text-red-500">
            {error}
          </p>
        )}

        {/* Title */}
        <input
          autoFocus
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (error) setError("");
          }}
          placeholder="What did you do?"
          className={`
            mt-3 w-full rounded-lg
            bg-card
            px-4 py-2.5
            text-sm text-textPrimary
            outline-none
            ring-1
            ${error ? "ring-red-500 shake" : "ring-border"}
            focus:ring-primary
            transition-all
            placeholder-textMuted
          `}
        />


        {/* Notes */}
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add notes (optional)"
          rows={4}
          className="
            mt-3 w-full rounded-lg
            bg-card
            px-4 py-2.5
            text-sm text-textPrimary
            outline-none
            ring-1 ring-border
            focus:ring-primary
            resize-none
            transition-all
            placeholder-textMuted
          "
        />

        {/* Actions */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="text-sm text-textSecondary hover:text-textPrimary transition"
          >
            Cancel
          </button>

          <button
            disabled={loading}
            onClick={handleSubmit}
            className="
              rounded-lg bg-blue-600 px-4 py-2
              text-sm font-medium text-white
              transition-all
              hover:bg-blue-700
              hover:shadow-lg hover:shadow-blue-500/25
              disabled:opacity-50
            "
          >
            {loading ? "Saving..." : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddActivityModal;
