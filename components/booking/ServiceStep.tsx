export interface ServiceItem {
  title: string;
  price: number;
  duration: string;
  desc: string;
}

interface ServiceStepProps {
  selectedService: ServiceItem;
  setSelectedService: (srv: ServiceItem) => void;
  servicesList: ServiceItem[];
  handleNextStep: () => void;
}

export default function ServiceStep({
  selectedService,
  setSelectedService,
  servicesList,
  handleNextStep,
}: ServiceStepProps) {
  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <div>
        <h1 className="font-title text-3xl sm:text-4xl font-normal text-foreground mb-1">
          Choose your service
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground font-normal">
          Select the service you would like to book with Sofia Martinez.
        </p>
      </div>

      <div className="space-y-4">
        {servicesList.map((srv, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setSelectedService(srv)}
            className={`w-full p-6 rounded-lg border text-left transition-all cursor-pointer ${
              selectedService.title === srv.title
                ? "bg-card border-primary ring-1 ring-primary/40 shadow-xs"
                : "bg-card border-border hover:border-primary/40"
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium ${
                    selectedService.title === srv.title
                      ? "bg-primary text-primary-foreground"
                      : "border-2 border-border bg-background"
                  }`}
                >
                  {selectedService.title === srv.title && "✓"}
                </div>
                <h3 className="font-title text-lg font-medium text-foreground">
                  {srv.title}
                </h3>
              </div>
              <span className="font-title text-xl font-bold text-foreground">
                £{srv.price}
              </span>
            </div>

            <p className="text-xs text-muted-foreground font-normal mt-2 mb-3 leading-relaxed pl-7">
              {srv.desc}
            </p>

            <div className="pl-7">
              <span className="bg-accent text-foreground text-[11px] font-medium px-3 py-1 rounded-md border border-border/50 inline-block">
                {srv.duration}
              </span>
            </div>
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={handleNextStep}
        className="w-full py-4 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-sm rounded-sm shadow-sm transition-all cursor-pointer text-center block mt-8"
      >
        Continue
      </button>
    </div>
  );
}

