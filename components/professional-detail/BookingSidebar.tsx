"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Clock, CheckCircle2 } from "lucide-react";

export default function BookingSidebar() {
  const router = useRouter();

  return (
    <div className="lg:col-span-4 space-y-6">
      <div className="rounded-2xl border border-border bg-card text-card-foreground overflow-hidden sticky top-24 space-y-0 shadow-xs">
        <div className="bg-accent border-b border-border text-foreground p-6 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider block mb-1">
              FROM
            </span>
            <h3 className="font-title text-3xl sm:text-4xl font-normal text-foreground">
              $45
            </h3>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 justify-end text-primary">
              ★★★★★
            </div>
            <span className="text-[10px] text-muted-foreground block mt-1">312 reviews</span>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
            NEXT AVAILABLE
          </span>

          <div className="space-y-2.5 text-xs">
            {[
              "Today, 2:30 PM",
              "Today, 4:00 PM",
              "Tomorrow, 10:00 AM",
              "Tomorrow, 2:00 PM"
            ].map((slot, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => router.push('/book/1')}
                className={`w-full p-3.5 rounded-xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                  idx === 0
                    ? "bg-secondary border-primary/50 text-secondary-foreground font-semibold"
                    : "bg-accent/50 hover:bg-accent border-border text-foreground font-medium"
                }`}
              >
                <Clock className="w-4 h-4 text-primary shrink-0" />
                <span>{slot}</span>
              </button>
            ))}
          </div>

          <Link
            href="/book/1"
            className="w-full text-center py-3.5 bg-primary hover:bg-primary/90 text-primary-foreground text-xs sm:text-sm font-semibold rounded-xl shadow-xs transition-colors block cursor-pointer mt-4"
          >
            Book Appointment
          </Link>
        </div>
      </div>

      {/* Verified Professional Card */}
      <div className="bg-emerald-500/10 border border-emerald-500/30 p-5 rounded-xl flex items-start gap-4 text-emerald-800 dark:text-emerald-300">
        <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
          <CheckCircle2 className="w-5 h-5 text-white" />
        </div>
        <div>
          <h4 className="text-xs font-bold text-emerald-900 dark:text-emerald-200 mb-0.5">Verified Professional</h4>
          <p className="text-[11px] text-emerald-700 dark:text-emerald-400 font-normal leading-relaxed">
            Identity verified, qualifications checked, and manually approved by the Cloud Salon team.
          </p>
        </div>
      </div>
    </div>
  );
}
