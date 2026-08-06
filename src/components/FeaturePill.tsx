export default function FeaturePill({
  label,
  className = '',
}: {
  label: string;
  className?: string;
}) {
  return (
    <span
      className={`bg-black/30 backdrop-blur-md text-white rounded-full border border-white/10 whitespace-nowrap ${className}`}
    >
      {label}
    </span>
  );
}