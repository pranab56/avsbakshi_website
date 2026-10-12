import { Check, Loader2 } from "lucide-react";

export interface ServiceItem {
  _id: string;
  name: string;
  priceInUSD: number;
  durationInMinutes: number;
  description?: string;
  category?: any;
}

interface ServiceStepProps {
  isLoading?: boolean;
  selectedServices: ServiceItem[];
  setSelectedServices: React.Dispatch<React.SetStateAction<ServiceItem[]>>;
  servicesList: ServiceItem[];
  professionalName?: string;
  handleNextStep: () => void;
}

export default function ServiceStep({
  isLoading = false,
  selectedServices,
  setSelectedServices,
  servicesList,
  professionalName = "your professional",
  handleNextStep,
}: ServiceStepProps) {
  const toggleService = (srv: ServiceItem) => {
    setSelectedServices((prev) => {
      const exists = prev.some((s) => s._id === srv._id);
      if (exists) {
        return prev.filter((s) => s._id !== srv._id);
      } else {
        return [...prev, srv];
      }
    });
  };

  const isContinueDisabled = isLoading || selectedServices.length === 0;

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-1">
          Choose your services
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground font-normal">
          Select one or multiple services you would like to book with {professionalName}.
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="w-full p-5 rounded-xl border border-border bg-card/60 animate-pulse flex items-start justify-between gap-4"
            >
              <div className="flex items-start gap-3.5 flex-1">
                <div className="w-5 h-5 rounded-md mt-0.5 bg-muted shrink-0" />
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-muted rounded-md w-1/3" />
                  <div className="h-3 bg-muted rounded-md w-2/3" />
                  <div className="h-4 bg-muted rounded-md w-16 mt-2" />
                </div>
              </div>
              <div className="h-6 bg-muted rounded-md w-14 shrink-0" />
            </div>
          ))}
          <div className="flex items-center justify-center gap-2 py-4 text-xs font-medium text-muted-foreground">
            <Loader2 className="w-4 h-4 animate-spin text-[#D99722]" />
            <span>Loading services for {professionalName}...</span>
          </div>
        </div>
      ) : servicesList.length === 0 ? (
        <div className="bg-card p-12 text-center rounded-xl border border-border space-y-2">
          <p className="text-sm font-bold text-foreground">No services available</p>
          <p className="text-xs text-muted-foreground">
            No services were found for {professionalName}.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {servicesList.map((srv) => {
            const isSelected = selectedServices.some((s) => s._id === srv._id);

            return (
              <div
                key={srv._id}
                onClick={() => toggleService(srv)}
                className={`w-full p-5 rounded-xl border text-left transition-all cursor-pointer flex items-start justify-between gap-4 ${
                  isSelected
                    ? "bg-[#D99722]/10 border-[#D99722] ring-1 ring-[#D99722]/40 shadow-xs"
                    : "bg-card border-border hover:border-[#D99722]/40"
                }`}
              >
                <div className="flex items-start gap-3.5 flex-1">
                  <div
                    className={`w-5 h-5 rounded-md mt-0.5 flex items-center justify-center text-xs font-bold transition-colors ${
                      isSelected
                        ? "bg-[#D99722] text-white"
                        : "border-2 border-border bg-background"
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-foreground">
                      {srv.name}
                    </h3>
                    {srv.description && (
                      <p className="text-xs text-muted-foreground font-normal leading-relaxed line-clamp-2">
                        {srv.description}
                      </p>
                    )}
                    <div className="pt-1">
                      <span className="bg-accent text-foreground text-[10px] font-semibold px-2.5 py-0.5 rounded-md border border-border/50 inline-block">
                        {srv.durationInMinutes || 30} mins
                      </span>
                    </div>
                  </div>
                </div>

                <span className="text-xl font-extrabold text-[#D99722] shrink-0">
                  ${srv.priceInUSD} <span className="text-[10px] font-normal text-muted-foreground uppercase">USD</span>
                </span>
              </div>
            );
          })}
        </div>
      )}

      <button
        type="button"
        disabled={isContinueDisabled}
        onClick={handleNextStep}
        className={`w-full py-4 font-bold text-sm rounded-xl shadow-md transition-all cursor-pointer text-center block mt-8 ${
          isContinueDisabled
            ? "bg-muted text-muted-foreground cursor-not-allowed opacity-50"
            : "bg-[#D99722] hover:bg-[#C2841B] text-white"
        }`}
      >
        {isLoading
          ? "Loading available services..."
          : isContinueDisabled
          ? "Select at least 1 service to continue"
          : `Continue with ${selectedServices.length} service${selectedServices.length === 1 ? "" : "s"}`}
      </button>
    </div>
  );
}
