import { ChevronLeft, ChevronRight } from "lucide-react";

interface DateStepProps {
  selectedDate: string;
  setSelectedDate: (d: string) => void;
  handleNextStep: () => void;
}

export default function DateStep({
  selectedDate,
  setSelectedDate,
  handleNextStep,
}: DateStepProps) {
  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <div>
        <h1 className="font-title text-3xl sm:text-4xl font-normal text-foreground mb-1">
          Choose a date
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground font-normal">
          Select an available date for your appointment.
        </p>
      </div>

      {/* Calendar View */}
      <div className="bg-card p-6 sm:p-8 rounded-lg border border-border space-y-6">
        <div className="flex items-center justify-between text-xs font-bold text-foreground">
          <button className="w-10 h-10 rounded-sm bg-accent hover:bg-accent/80 border border-border flex items-center justify-center text-foreground transition-colors cursor-pointer">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="font-title text-xl font-bold">July 2025</span>
          <button className="w-10 h-10 rounded-sm bg-accent hover:bg-accent/80 border border-border flex items-center justify-center text-foreground transition-colors cursor-pointer">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-2 text-center text-xs">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d, i) => (
            <span key={i} className="text-xs font-medium text-muted-foreground py-1">{d}</span>
          ))}
          {["14", "15", "16", "17", "18", "19", "20"].map((num) => (
            <button
              key={num}
              onClick={() => setSelectedDate(`Fri ${num} Jul`)}
              className={`py-2 text-xs sm:text-sm font-bold h-14 rounded-sm transition-all text-center ${
                selectedDate.includes(num)
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "text-foreground hover:text-primary cursor-pointer"
              }`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      {selectedDate && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-sm text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
          Selected Date: {selectedDate}
        </div>
      )}

      <button
        type="button"
        onClick={handleNextStep}
        className="w-full py-4 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-sm rounded-sm shadow-sm transition-all cursor-pointer text-center block"
      >
        Continue
      </button>
    </div>
  );
}

