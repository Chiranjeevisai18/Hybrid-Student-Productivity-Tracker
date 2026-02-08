type StatCardProps = {
  title: string;
  value: string | number;
  subtext?: string;
};

const StatCard = ({ title, value, subtext }: StatCardProps) => {
  return (
    <div className="bg-slate-800 rounded-xl p-5 shadow-md hover:scale-[1.02] transition">
      <p className="text-slate-400 text-sm">{title}</p>
      <h2 className="text-2xl font-bold mt-2">{value}</h2>
      {subtext && <p className="text-xs text-slate-500 mt-1">{subtext}</p>}
    </div>
  );
};

export default StatCard;
