import { LucideIcon, ArrowRight } from "lucide-react";

export interface CategoryItem {
  icon: LucideIcon;
  title: string;
  count: string;
  key: string;
}

interface CategoriesGridProps {
  categories: CategoryItem[];
  selectedCategory: string | null;
  setSelectedCategory: (catKey: string | null) => void;
}

export default function CategoriesGrid({
  categories,
  selectedCategory,
  setSelectedCategory,
}: CategoriesGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
      {categories.map((cat, idx) => {
        const Icon = cat.icon;
        const isSelected = selectedCategory === cat.key;

        return (
          <button
            type="button"
            key={idx}
            onClick={() => setSelectedCategory(isSelected ? null : cat.key)}
            className={`p-4 rounded-lg border text-left flex items-center justify-between transition-all cursor-pointer group ${
              isSelected
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card hover:bg-accent text-foreground border-border"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                  isSelected
                    ? "bg-white/20 text-white"
                    : "bg-accent text-primary"
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <div>
                <h4
                  className={`font-semibold text-xs sm:text-sm ${
                    isSelected ? "text-primary-foreground" : "text-foreground"
                  }`}
                >
                  {cat.title}
                </h4>
                <p
                  className={`text-[11px] ${
                    isSelected ? "text-primary-foreground/80" : "text-muted-foreground"
                  }`}
                >
                  {cat.count}
                </p>
              </div>
            </div>
            <ArrowRight
              className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${
                isSelected ? "text-primary-foreground" : "text-muted-foreground"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}

