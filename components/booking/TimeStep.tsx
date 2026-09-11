interface TimeStepProps {
  selectedDate: string;
  selectedTime: string;
  setSelectedTime: (t: string) => void;
  handleNextStep: () => void;
}

export default function TimeStep({
  selectedDate,
  selectedTime,
  setSelectedTime,
  handleNextStep,
}: TimeStepProps) {
  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <div>
        <h1 className="font-title text-3xl sm:text-4xl font-normal text-foreground mb-1">
          Choose a time
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground font-normal">
          Available times for {selectedDate || "Fri 18 Jul"}
        </p>
      </div>

      <div className="space-y-6">
        {/* MORNING */}
        <div className="space-y-3">
          <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.15em]">
            MORNING
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3.5">
            {["9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM"].map((t, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedTime(t)}
                className={`py-3 px-2 sm:py-3.5 sm:px-4 rounded-sm text-xs sm:text-sm transition-all border text-center cursor-pointer ${
                  selectedTime === t
                    ? "bg-primary hover:bg-primary/90 text-primary-foreground font-semibold border-primary shadow-xs"
                    : "bg-card hover:bg-accent text-foreground font-medium border-border"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* AFTERNOON */}
        <div className="space-y-3">
          <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.15em]">
            AFTERNOON
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3.5">
            {["12:00 PM", "1:00 PM", "2:00 PM", "2:30 PM", "3:00 PM", "4:00 PM"].map((t, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedTime(t)}
                className={`py-3 px-2 sm:py-3.5 sm:px-4 rounded-sm text-xs sm:text-sm transition-all border text-center cursor-pointer ${
                  selectedTime === t
                    ? "bg-primary hover:bg-primary/90 text-primary-foreground font-semibold border-primary shadow-xs"
                    : "bg-card hover:bg-accent text-foreground font-medium border-border"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* EVENING */}
        <div className="space-y-3">
          <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.15em]">
            EVENING
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3.5">
            {["5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM"].map((t, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedTime(t)}
                className={`py-3 px-2 sm:py-3.5 sm:px-4 rounded-sm text-xs sm:text-sm transition-all border text-center cursor-pointer ${
                  selectedTime === t
                    ? "bg-primary hover:bg-primary/90 text-primary-foreground font-semibold border-primary shadow-xs"
                    : "bg-card hover:bg-accent text-foreground font-medium border-border"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
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

