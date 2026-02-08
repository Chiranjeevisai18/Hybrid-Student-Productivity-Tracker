type Props = {
  children: React.ReactNode;
  loading?: boolean;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
};

const GlowButton = ({
  children,
  loading,
  onClick,
  className = "",
  type = "button",
}: Props) => {
  return (
    <button
      type={type}
      disabled={loading}
      onClick={onClick}
      className={`
        rounded-lg px-4 py-2
        bg-aiBlue text-white text-sm font-medium
        transition-all
        hover:shadow-[0_0_20px_rgba(59,130,246,0.6)]
        disabled:opacity-60 disabled:cursor-not-allowed
        ${className}
      `}
    >
      {loading ? "Please wait…" : children}
    </button>
  );
};

export default GlowButton;
