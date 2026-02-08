type StatCardProps = {
  title: string;
  value: string | number;
  subtext?: string;
};

const StatCard = ({ title, value, subtext }: StatCardProps) => {
  return (
    <div className="bg-card border border-border rounded-xl p-5 shadow-sm hover:scale-[1.02] transition-all">
      <p className="text-textSecondary text-sm">{title}</p>
      <h2 className="text-2xl font-bold mt-2 text-textPrimary">{value}</h2>
      {subtext && <p className="text-xs text-textMuted mt-1">{subtext}</p>}
    </div>
  );
};

export default StatCard;
