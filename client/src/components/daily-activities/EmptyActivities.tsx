const EmptyActivities = ({ onCreate }: { onCreate: () => void }) => (
  <div className="text-center mt-20 fade-in">
    <h3 className="text-xl font-semibold text-textPrimary">
      No activities yet
    </h3>
    <p className="mt-2 text-textSecondary">
      Start capturing your day like a memory.
    </p>

    <button
      onClick={onCreate}
      className="
        mt-6 rounded-xl
        bg-blue-600 px-6 py-2.5
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
  </div >
);

export default EmptyActivities;
