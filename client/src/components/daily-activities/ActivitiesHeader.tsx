type Props = {
  onAdd: () => void;
};

const ActivitiesHeader = ({ onAdd }: Props) => {
  return (
    <div className="flex items-center justify-between fade-in">
      <div>
        <h1 className="text-2xl font-bold text-textPrimary">
          Daily Activities
        </h1>
        <p className="mt-1 text-sm text-textSecondary">
          Capture what you do — like a personal memory log.
        </p>
      </div>

      <button
        onClick={onAdd}
        className="
          rounded-xl bg-blue-600 px-5 py-2.5
          text-sm font-semibold text-white
          transition-all duration-300
          hover:bg-blue-700
          shadow-lg shadow-blue-500/25
          hover:shadow-glow
          hover:-translate-y-0.5
          active:scale-95
        "
      >
        + New Activity
      </button>
    </div>
  );
};

export default ActivitiesHeader;
