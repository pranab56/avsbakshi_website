import Button from "../shared/Button";

interface FiltersSidebarProps {
  showMobileFilters: boolean;
  providerFilter: string;
  setProviderFilter: (val: string) => void;
  availabilityFilter: string[];
  toggleAvailability: (val: string) => void;
  distanceFilter: string;
  setDistanceFilter: (val: string) => void;
  clearAll: () => void;
}

export default function FiltersSidebar({
  showMobileFilters,
  providerFilter,
  setProviderFilter,
  availabilityFilter,
  toggleAvailability,
  distanceFilter,
  setDistanceFilter,
  clearAll,
}: FiltersSidebarProps) {
  return (
    <div className={`lg:col-span-3 space-y-6 ${showMobileFilters ? "block mb-6 lg:mb-0" : "hidden lg:block"}`}>
      <div className="bg-card rounded-xl border border-border p-6 space-y-6 shadow-xs text-card-foreground">
        <h3 className="font-title font-bold text-base text-foreground">
          Filters
        </h3>

        {/* Provider Radio Filter */}
        <div className="space-y-3">
          <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
            PROVIDER
          </label>
          <div className="space-y-2 text-xs text-foreground">
            {["All", "Professional", "Salon"].map((type) => (
              <label key={type} className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors">
                <input
                  type="radio"
                  name="provider"
                  checked={providerFilter === type.toLowerCase()}
                  onChange={() => setProviderFilter(type.toLowerCase())}
                  className="accent-primary"
                />
                <span>{type}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Availability Filter */}
        <div className="space-y-3 pt-4 border-t border-border">
          <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
            AVAILABILITY
          </label>
          <div className="space-y-2 text-xs text-foreground">
            {[
              { id: "today", label: "Today" },
              { id: "tomorrow", label: "Tomorrow" },
              { id: "this-week", label: "This Week" },
            ].map((item) => (
              <label key={item.id} className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors">
                <input
                  type="checkbox"
                  checked={availabilityFilter.includes(item.id)}
                  onChange={() => toggleAvailability(item.id)}
                  className="accent-primary rounded"
                />
                <span>{item.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Distance Filter */}
        <div className="space-y-3 pt-4 border-t border-border">
          <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
            DISTANCE
          </label>
          <div className="space-y-2 text-xs text-foreground">
            {["1 mile", "5 miles", "10 miles", "25 miles"].map((dist, idx) => (
              <label key={idx} className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors">
                <input
                  type="radio"
                  name="distance"
                  checked={distanceFilter === dist.split(" ")[0]}
                  onChange={() => setDistanceFilter(dist.split(" ")[0])}
                  className="accent-primary"
                />
                <span>{dist}</span>
              </label>
            ))}
          </div>
        </div>

        <Button
          type="button"
          variant="secondary"
          size="md"
          fullWidth
          onClick={clearAll}
        >
          Clear All Filters
        </Button>
      </div>
    </div>
  );
}
