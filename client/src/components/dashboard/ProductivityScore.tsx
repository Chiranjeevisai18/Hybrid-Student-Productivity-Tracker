import { useAnalytics } from "../../hooks/useAnalytics";
import Skeleton from "../../ui/Skeleton";

const ProductivityScore = () => {
  const { data, loading } = useAnalytics();

  return (
    <div className="fade-in rounded-2xl border border-border bg-card p-6 shadow-glow transition-all duration-300 hover:border-primary/40">
      <h3 className="text-sm text-textMuted">Productivity Score</h3>

      {loading ? (
        <Skeleton className="mt-4 h-10 w-24" />
      ) : (
        <p className="mt-4 text-4xl font-bold text-textPrimary">
          {data?.productivityScore ?? 0}%
        </p>
      )}
    </div>
  );
};

export default ProductivityScore;
