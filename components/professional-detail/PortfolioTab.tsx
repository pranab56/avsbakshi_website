export default function PortfolioTab() {
  const portfolioPhotos = [
    "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1583001809873-a1284d56338b?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=800&q=80",
  ];

  return (
    <div className="p-6 sm:p-8 rounded-lg space-y-4 animate-in fade-in duration-150">
      <p className="text-xs text-muted-foreground font-medium">
        {portfolioPhotos.length} photos &mdash; Click to enlarge
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {portfolioPhotos.map((img, idx) => (
          <div
            key={idx}
            className="relative h-48 rounded-lg overflow-hidden shadow-xs hover:opacity-90 transition-opacity cursor-pointer border border-border group"
          >
            <img src={img} alt={`Portfolio ${idx}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          </div>
        ))}
      </div>
    </div>
  );
}

