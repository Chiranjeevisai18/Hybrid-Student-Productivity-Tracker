import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useDailyActivities } from "../../context/DailyActivityContext";
import { useDebounce } from "../../hooks/useDebounce";
import { uploadToCloudinary } from "../../utils/cloudinary";

const ActivityDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { activities, updateActivity, deleteActivity } =
    useDailyActivities();

  const activity = activities.find((a) => a.id === id);

  /* =========================
     LOCAL STATE
  ========================= */
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [links, setLinks] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  /* =========================
     DEBOUNCED VALUES
  ========================= */
  const dTitle = useDebounce(title, 600);
  const dNotes = useDebounce(notes, 600);
  const dLinks = useDebounce(links, 600);

  const initialized = useRef(false);

  /* =========================
     LOAD ACTIVITY (ONCE)
  ========================= */
  useEffect(() => {
    if (!activity) return;

    // Fix: Only load initial data once. 
    // This prevents the auto-save response from overwriting 
    // local state while the user is still typing.
    if (initialized.current) return;

    setTitle(activity.title);
    setNotes(activity.notes || "");
    setLinks(activity.links || []);
    setImages(activity.images || []);

    initialized.current = true;
  }, [activity]);

  /* =========================
     AUTOSAVE (SAFE)
  ========================= */
  useEffect(() => {
    if (!initialized.current || !activity) return;

    updateActivity(activity.id, {
      title: dTitle,
      notes: dNotes,
      links: dLinks,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dTitle, dNotes, dLinks]);

  /* =========================
     IMAGE UPLOAD
  ========================= */
  const handleImageUpload = async (file: File) => {
    setUploading(true);
    try {
      const url = await uploadToCloudinary(file);
      const updated = [...images, url];
      setImages(updated);

      await updateActivity(activity!.id, {
        images: updated,
      });
    } finally {
      setUploading(false);
    }
  };

  /* =========================
     DELETE ACTIVITY
  ========================= */
  const handleDelete = async () => {
    await deleteActivity(activity!.id);
    navigate("/dashboard/daily-activities");
  };

  if (!activity) {
    return (
      <div className="p-6 text-center text-slate-400 fade-in">
        Activity not found 🚫
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 fade-in">
      {/* Back */}
      <button
        onClick={() => navigate("/dashboard/daily-activities")}
        className="text-sm text-primary hover:underline transition-colors"
      >
        ← Back to Activities
      </button>

      {/* Card */}
      <div
        className="
          mx-auto max-w-3xl
          rounded-2xl border border-border
          bg-card p-6
          shadow-glow
          space-y-5
        "
      >
        {/* Title */}
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="
            w-full text-2xl font-bold
            bg-transparent text-textPrimary
            outline-none border-b
            border-border/50 pb-2
            focus:border-primary
            placeholder-textMuted
            transition-colors
          "
        />

        {/* Date */}
        <div className="text-xs text-textMuted">
          {activity.date}
        </div>
        <p className="text-xs text-textMuted">
          Changes are saved automatically
        </p>

        {/* Notes */}
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Write notes here..."
          rows={6}
          className="
            w-full rounded-lg bg-surface/50
            px-4 py-3 text-sm text-textPrimary
            outline-none ring-1 ring-border
            focus:ring-primary/50 resize-none
            placeholder-textMuted
            transition-all
          "
        />

        {/* Images */}
        <div>
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-textPrimary">
              Images
            </h4>

            <label
              htmlFor="imageUpload"
              className="
                cursor-pointer text-xs text-primary
                hover:underline
              "
            >
              {uploading ? "Uploading..." : "+ Add image"}
            </label>

            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  handleImageUpload(e.target.files[0]);
                }
              }}
            />
          </div>

          {/* Image Grid */}
          <div className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-3">
            {images.map((img, i) => (
              <div
                key={i}
                className="
                  group relative overflow-hidden
                  rounded-xl border border-border
                "
              >
                <img
                  src={img}
                  alt="activity"
                  className="h-36 w-full object-cover"
                />

                <button
                  onClick={async () => {
                    const updated = images.filter(
                      (_, idx) => idx !== i
                    );
                    setImages(updated);
                    await updateActivity(activity.id, {
                      images: updated,
                    });
                  }}
                  className="
                    absolute top-2 right-2
                    rounded-full bg-black/60
                    px-2 py-1 text-xs text-white
                    opacity-0 group-hover:opacity-100
                    transition-opacity
                  "
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between pt-4 border-t border-border/50">
          <button
            onClick={handleDelete}
            className="text-sm text-red-500 hover:text-red-600 hover:underline transition-colors"
          >
            Delete Activity
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActivityDetails;
