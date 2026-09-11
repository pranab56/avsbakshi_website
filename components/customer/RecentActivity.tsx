import { Activity } from "lucide-react";

export interface ActivityItem {
  id: string;
  title: string;
  subtitle: string;
}

interface RecentActivityProps {
  recentActivities: ActivityItem[];
}

export default function RecentActivity({ recentActivities }: RecentActivityProps) {
  return (
    <div className="bg-card border border-border rounded-md p-5 sm:p-6 space-y-4 shadow-xs">
      <h2 className="font-title italic font-normal text-lg sm:text-xl text-foreground">
        Recent Activity
      </h2>

      <div className="divide-y divide-border">
        {recentActivities.map((act) => (
          <div
            key={act.id}
            className="py-3.5 first:pt-1 last:pb-1 flex items-start gap-3"
          >
            {/* Icon Badge */}
            <div className="w-11 h-11 rounded-sm bg-accent flex items-center justify-center text-muted-foreground shrink-0 mt-0.5">
              <Activity className="w-4 h-4 text-muted-foreground" />
            </div>

            {/* Text Details */}
            <div className="space-y-0.5 text-left">
              <p className="text-xs sm:text-sm font-medium text-foreground leading-snug">
                {act.title}
              </p>
              <p className="text-xs text-muted-foreground">{act.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

