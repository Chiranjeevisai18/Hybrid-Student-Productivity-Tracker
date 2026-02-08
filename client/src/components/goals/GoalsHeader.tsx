type Props = {
  onAddGoal: () => void;
};

const GoalsHeader = ({ onAddGoal }: Props) => {
  return (
    <div className="fade-in flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-textPrimary">
          Goals
        </h1>
        <p className="mt-1 text-sm text-textSecondary">
          Track what truly matters.
        </p>
      </div>

      <button
        onClick={onAddGoal}
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
        + New Goal
      </button>
    </div>
  );
};

export default GoalsHeader;
