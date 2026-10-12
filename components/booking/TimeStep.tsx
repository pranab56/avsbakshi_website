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
  const isDisabled = !selectedTime;

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-1">
          Choose a time slot
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground font-normal">
          Available start times for <span className="font-bold text-foreground">{selectedDate || "selected date"}</span>
        </p>
      </div>

      <div className="space-y-6">
        {/* MORNING */}
        <div className="space-y-3">
          <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.15em]">
            MORNING
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {["9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM"].map((t, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedTime(t)}
                className={`py-3.5 px-4 rounded-xl text-xs sm:text-sm transition-all border text-center cursor-pointer font-semibold ${
                  selectedTime === t
                    ? "bg-[#D99722] text-white border-[#D99722] shadow-md ring-1 ring-[#D99722]/50"
                    : "bg-card hover:bg-accent text-foreground border-border"
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
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {["12:00 PM", "1:00 PM", "2:00 PM", "2:30 PM", "3:00 PM", "4:00 PM"].map((t, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedTime(t)}
                className={`py-3.5 px-4 rounded-xl text-xs sm:text-sm transition-all border text-center cursor-pointer font-semibold ${
                  selectedTime === t
                    ? "bg-[#D99722] text-white border-[#D99722] shadow-md ring-1 ring-[#D99722]/50"
                    : "bg-card hover:bg-accent text-foreground border-border"
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
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {["5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM"].map((t, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedTime(t)}
                className={`py-3.5 px-4 rounded-xl text-xs sm:text-sm transition-all border text-center cursor-pointer font-semibold ${
                  selectedTime === t
                    ? "bg-[#D99722] text-white border-[#D99722] shadow-md ring-1 ring-[#D99722]/50"
                    : "bg-card hover:bg-accent text-foreground border-border"
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
        disabled={isDisabled}
        onClick={handleNextStep}
        className={`w-full py-4 font-bold text-sm rounded-xl shadow-md transition-all cursor-pointer text-center block mt-8 ${
          isDisabled
            ? "bg-muted text-muted-foreground cursor-not-allowed opacity-50"
            : "bg-[#D99722] hover:bg-[#C2841B] text-white"
        }`}
      >
        {isDisabled ? "Please select a time slot to continue" : `Continue with ${selectedTime}`}
      </button>
    </div>
  );
}

