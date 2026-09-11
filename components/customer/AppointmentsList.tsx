import Image from "next/image";

export interface AppointmentItem {
  id: string;
  stylistName: string;
  service: string;
  dateTime: string;
  price: string;
  image: string;
}

interface AppointmentsListProps {
  upcomingAppointments: AppointmentItem[];
}

export default function AppointmentsList({ upcomingAppointments }: AppointmentsListProps) {
  return (
    <div className="space-y-4">
      {upcomingAppointments.map((appt) => (
        <div
          key={appt.id}
          className="bg-card border border-border rounded-lg p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all shadow-xs"
        >
          <div className="flex items-center gap-4">
            {/* Thumbnail Avatar */}
            <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-xl overflow-hidden shrink-0 bg-accent">
              <Image
                src={appt.image}
                alt={appt.stylistName}
                fill
                className="object-cover"
                unoptimized
              />
            </div>

            {/* Info Text */}
            <div className="space-y-0.5 sm:space-y-1">
              <h3 className="font-title font-bold text-base sm:text-xl text-foreground leading-tight">
                {appt.stylistName}
              </h3>
              <p className="text-primary font-medium text-xs sm:text-sm">
                {appt.service}
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-2">
                <span>{appt.dateTime}</span>
                <span className="font-title italic font-bold text-primary text-xs sm:text-sm ml-1">
                  {appt.price}
                </span>
              </p>
            </div>
          </div>

          {/* Reschedule Action Button */}
          <div className="sm:self-center">
            <button
              type="button"
              className="w-full sm:w-auto px-5 py-2.5 sm:py-3 rounded-sm bg-primary hover:bg-primary/90 text-primary-foreground text-xs sm:text-sm font-medium transition-colors cursor-pointer"
            >
              Reschedule
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

