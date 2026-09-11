export interface StatItem {
  label: string;
  value: string;
  isHighlighted?: boolean;
}

interface OverviewStatsGridProps {
  stats: StatItem[];
}

export default function OverviewStatsGrid({ stats }: OverviewStatsGridProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className="bg-card border border-border rounded-lg p-4 sm:p-6 transition-all shadow-xs"
        >
          <div
            className={`font-title italic text-2xl sm:text-4xl font-normal mb-1.5 sm:mb-2.5 ${
              stat.isHighlighted ? "text-primary" : "text-foreground"
            }`}
          >
            {stat.value}
          </div>
          <p className="text-[11px] sm:text-xs md:text-sm text-muted-foreground font-normal leading-snug">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}

