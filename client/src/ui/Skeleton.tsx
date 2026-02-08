type Props = {
  className?: string;
};

const Skeleton = ({ className = "" }: Props) => {
  return (
    <div
      className={`animate-pulse rounded-lg bg-white/10 ${className}`}
    />
  );
};

export default Skeleton;
