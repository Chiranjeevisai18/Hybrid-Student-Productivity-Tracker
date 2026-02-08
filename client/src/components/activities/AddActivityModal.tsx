import { useState } from "react";
import { useProductivity } from "../../context/ProductivityContext";
import type { Activity } from "../../types/activity";

type Props = {
  goalId: string;
  onClose: () => void;
};

const AddActivityModal = ({ goalId, onClose }: Props) => {
  const { addActivity } = useProductivity();

  const [title, setTitle] = useState("");
  const [estimatedMinutes, setEstimatedMinutes] = useState(30);

  const handleSubmit = () => {
    if (!title || estimatedMinutes <= 0) return;

    const newActivity: Activity = {
      id: crypto.randomUUID(),
      goalId,
      title,
      estimatedMinutes,
      spentMinutes: 0,
      completed: false,
    };

    addActivity(newActivity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div
        className="
          fade-in 
          w-full max-w-md rounded-2xl
          border border-aiBlue/30
          bg-[#0B0F14] p-6
          shadow-[0_0_30px_rgba(59,130,246,0.25)]
        "
      >
        <h2 className="text-lg font-semibold text-white">
          Add Activity
        </h2>

        <div className="mt-4 space-y-4">
          <input
            type="text"
            placeholder="Activity title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="
              w-full rounded-lg
              border border-white/10
              bg-black/40 px-3 py-2
              text-white
            "
          />

          <input
            type="number"
            min={5}
            step={5}
            value={estimatedMinutes}
            onChange={(e) =>
              setEstimatedMinutes(Number(e.target.value))
            }
            className="
              w-full rounded-lg
              border border-white/10
              bg-black/40 px-3 py-2
              text-white
            "
          />
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="text-sm text-slate-400 hover:text-white"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="
              rounded-lg bg-aiBlue px-4 py-2
              text-sm font-medium text-white
              hover:shadow-[0_0_20px_rgba(59,130,246,0.6)]
            "
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddActivityModal;
