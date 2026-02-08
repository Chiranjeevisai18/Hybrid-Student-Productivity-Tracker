type Props = {
  onCreate: () => void;
};

const EmptyState = ({ onCreate }: Props) => {
  return (
    <div className="mt-20 text-center fade-in">
      <h3 className="text-xl font-semibold text-textPrimary">
        No goals yet
      </h3>

      <p className="mt-2 text-sm text-textSecondary">
        Create your first goal and start tracking progress.
      </p>
      <button
        onClick={onCreate}
        className="
      mt-6 rounded-xl bg-primary px-6 py-2.5
      text-sm font-semibold text-white
      transition-all duration-300
      hover:bg-primaryHover
      shadow-lg shadow-primary/25
      hover:shadow-glow
      hover:-translate-y-0.5
      active:scale-95
      "
      >
        + Create Goal
      </button>
    </div >
  );
};

export default EmptyState;
