import { Image as ImageIcon } from "lucide-react";
import ChairImage from "@/components/shared/ChairImage";

interface PortfolioTabProps {
  proData?: any;
}

export default function PortfolioTab({ proData }: PortfolioTabProps) {
  const portfolioPhotos: string[] =
    Array.isArray(proData?.photos) && proData.photos.length > 0
      ? proData.photos
      : [];

  if (portfolioPhotos.length === 0) {
    return (
      <div className="p-12 bg-card rounded-2xl border border-border text-center space-y-3">
        <ImageIcon className="w-10 h-10 text-muted-foreground mx-auto" />
        <h4 className="text-base font-bold text-foreground">No Portfolio Photos Available</h4>
        <p className="text-xs text-muted-foreground max-w-sm mx-auto">
          This professional has not uploaded any portfolio photos yet.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-8 bg-card rounded-2xl border border-border space-y-4 animate-in fade-in duration-150">
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground font-semibold">
          {portfolioPhotos.length} portfolio photos
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {portfolioPhotos.map((img, idx) => (
          <div
            key={idx}
            className="relative h-48 sm:h-56 rounded-xl overflow-hidden shadow-xs hover:opacity-90 transition-opacity cursor-pointer border border-border group bg-muted"
          >
            <ChairImage
              src={img}
              alt={`Portfolio photo ${idx + 1}`}
              size="lg"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
