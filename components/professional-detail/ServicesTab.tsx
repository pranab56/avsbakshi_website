"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, Clock, ArrowRight, Check } from "lucide-react";
import { useGetServiceByProfessionalQuery } from "@/features/profesional/profesionalApi";

interface ServicesTabProps {
  professionalId?: string;
}

export default function ServicesTab({ professionalId }: ServicesTabProps) {
  const router = useRouter();
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([]);

  const { data: servicesRes, isLoading } = useGetServiceByProfessionalQuery(
    { professionalId: professionalId || "" },
    { skip: !professionalId }
  );

  const rawServices = Array.isArray(servicesRes?.data) ? servicesRes.data : [];
  const servicesList = rawServices;

  const toggleServiceSelection = (id: string) => {
    setSelectedServiceIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Calculate pricing for selected services
  const selectedServicesObjects = servicesList.filter((s: any) =>
    selectedServiceIds.includes(s._id)
  );

  const subtotalPrice = selectedServicesObjects.reduce(
    (acc: number, srv: any) => acc + (srv.priceInUSD || srv.price || 0),
    0
  );

  const handleProceedToBooking = () => {
    if (selectedServiceIds.length === 0) return;
    const proParam = professionalId || "";
    const serviceIdsParam = selectedServiceIds.join(",");
    router.push(`/book/1?proId=${proParam}&serviceIds=${encodeURIComponent(serviceIdsParam)}`);
  };

  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        {[1, 2, 3, 4].map((n) => (
          <div key={n} className="bg-card p-6 rounded-2xl border border-border h-28" />
        ))}
      </div>
    );
  }

  if (servicesList.length === 0) {
    return (
      <div className="bg-card p-12 text-center rounded-2xl border border-border space-y-3 my-4">
        <Sparkles className="w-10 h-10 text-muted-foreground mx-auto" />
        <h4 className="text-base font-bold text-foreground">No Services Available</h4>
        <p className="text-xs text-muted-foreground max-w-sm mx-auto">
          This professional has not listed any services yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-150 pb-24">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-border/50">
        <div>
          <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#D99722]" />
            <span>Services ({servicesList.length})</span>
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Select one or multiple services to book with this professional
          </p>
        </div>
        <span className="text-xs font-semibold text-[#D99722] bg-[#D99722]/10 px-3 py-1 rounded-full border border-[#D99722]/20 self-start sm:self-auto">
          {selectedServiceIds.length} Selected
        </span>
      </div>

      <div className="space-y-3">
        {servicesList.map((svc: any) => {
          const isSelected = selectedServiceIds.includes(svc._id);
          const categoryName =
            typeof svc.category === "object" ? svc.category?.name : "Beauty & Grooming";

          return (
            <div
              key={svc._id}
              onClick={() => toggleServiceSelection(svc._id)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-4 group ${isSelected
                  ? "bg-[#D99722]/10 border-[#D99722] shadow-sm ring-1 ring-[#D99722]/30"
                  : "bg-card border-border hover:border-[#D99722]/40"
                }`}
            >
              <div className="flex items-start gap-3.5 flex-1">
                {/* Custom Multi-select Checkbox */}
                <div
                  className={`w-5 h-5 rounded-md mt-0.5 flex items-center justify-center shrink-0 transition-colors ${isSelected
                      ? "bg-[#D99722] text-white"
                      : "border-2 border-border bg-background group-hover:border-[#D99722]"
                    }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>

                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="text-base font-bold text-foreground group-hover:text-[#D99722] transition-colors">
                      {svc.name}
                    </h4>
                    {categoryName && (
                      <span className="bg-accent text-foreground text-[10px] font-semibold px-2.5 py-0.5 rounded-full border border-border/50">
                        {categoryName}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-muted-foreground font-normal leading-relaxed line-clamp-2">
                    {svc.description || "No detailed description provided."}
                  </p>

                  <div className="flex items-center gap-3 pt-1">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-muted-foreground">
                      <Clock className="w-3.5 h-3.5 text-[#D99722]" />
                      {svc.durationInMinutes || 30} mins
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="text-xl font-extrabold text-[#D99722] block">
                  ${svc.priceInUSD || svc.price || 0}
                </span>
                <span className="text-[10px] text-muted-foreground uppercase font-semibold">USD</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Bottom Booking Action Bar when services are selected */}
      {selectedServiceIds.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-2xl bg-card/95 backdrop-blur-md border border-[#D99722]/40 rounded-2xl p-4 shadow-2xl flex items-center justify-between gap-4 animate-in slide-in-from-bottom duration-300">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
              SELECTED SERVICES ({selectedServiceIds.length})
            </span>
            <div className="text-xl font-extrabold text-foreground">
              ${subtotalPrice.toFixed(2)}{" "}
              <span className="text-xs font-normal text-muted-foreground">
                (+10% platform fee at checkout)
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleProceedToBooking}
            className="px-6 py-3.5 bg-[#D99722] hover:bg-[#C2841B] text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>Continue to Booking</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
