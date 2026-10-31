"use client";

import Link from "next/link";
import { ArrowRight, Armchair, Building2, MapPin } from "lucide-react";
import { useGetAllChairsQuery } from "@/features/chair/chairApi";
import ChairImage from "@/components/shared/ChairImage";

export default function WorkspacesSection() {
  const { data: chairsRes, isLoading } = useGetAllChairsQuery({});

  const rawChairs = Array.isArray(chairsRes?.data)
    ? chairsRes.data
    : Array.isArray(chairsRes)
    ? chairsRes
    : [];

  const activeChairs = rawChairs
    .filter(
      (item: any) =>
        (item.status || item.chair?.status || "active").toLowerCase() === "active"
    )
    .slice(0, 4);

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-bold text-[#D99722] uppercase tracking-widest block mb-1">
            SALON WORKSPACES &amp; BOOTHS
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-foreground">
            Dedicated Workspaces for Beauty Professionals
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1 font-normal">
            Find and book dedicated salon chairs, barber booths, and private workspaces hosted by certified salon owners.
          </p>
        </div>
        <Link
          href="/workspaces"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md border border-border bg-card text-xs font-semibold text-foreground hover:bg-accent hover:border-[#D99722] transition-all w-full sm:w-auto"
        >
          <span>Browse all workspaces</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#D99722]" />
        </Link>
      </div>

      {/* Grid Content */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((n) => (
            <div
              key={n}
              className="bg-card border border-border rounded-xl overflow-hidden h-80 animate-pulse"
            />
          ))}
        </div>
      ) : activeChairs.length === 0 ? (
        <div className="bg-card border border-border rounded-xl p-10 text-center space-y-2">
          <Armchair className="w-8 h-8 text-[#D99722] mx-auto" />
          <h4 className="text-sm font-bold text-foreground">No Workspaces Currently Available</h4>
          <p className="text-xs text-muted-foreground max-w-sm mx-auto">
            Check back soon for new booth and chair rental openings from certified salon owners.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {activeChairs.map((item: any) => {
            const chair = item.chair || item;
            const salonObj = typeof item.salon === "object" ? item.salon : null;
            const chairName = item.name || chair.name || "Salon Work Space";
            const salonName = salonObj?.name || "Salon Studio";
            const pricePerDay =
              item.pricePerDayInUSD || chair.pricePerDayInUSD || item.pricing?.total || 45;

            const imageSrc =
              item.photo ||
              chair.photo ||
              salonObj?.photos?.[0] ||
              salonObj?.logo ||
              "";

            const locationStr =
              item.location ||
              chair.location ||
              [salonObj?.address?.line1, salonObj?.address?.city].filter(Boolean).join(", ") ||
              "Main Station";

            return (
              <div
                key={item._id}
                className="bg-card border border-border rounded-xl overflow-hidden shadow-xs hover:border-[#D99722]/50 hover:shadow-lg transition-all flex flex-col justify-between group"
              >
                {/* Image */}
                <div className="relative w-full h-48 bg-accent overflow-hidden">
                  <Link href={`/workspaces/${item._id}`} className="block w-full h-full">
                    <ChairImage
                      src={imageSrc}
                      alt={chairName}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      showLabel
                    />
                  </Link>

                  <span className="absolute top-2.5 left-2.5 bg-background/85 backdrop-blur-xs text-foreground text-[10px] font-semibold px-2.5 py-0.5 rounded-full border border-border capitalize">
                    {item.status || chair.status || "Active"}
                  </span>
                </div>

                {/* Details */}
                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <Link href={`/workspaces/${item._id}`}>
                      <h3 className="font-bold text-base text-foreground leading-snug hover:text-[#D99722] transition-colors truncate">
                        {chairName}
                      </h3>
                    </Link>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground truncate">
                      <Building2 className="w-3 h-3 text-[#D99722] shrink-0" />
                      <span className="truncate">{salonName}</span>
                    </div>
                    {locationStr && (
                      <div className="flex items-center gap-1 text-[11px] text-muted-foreground truncate pt-0.5">
                        <MapPin className="w-3 h-3 text-muted-foreground/70 shrink-0" />
                        <span className="truncate">{locationStr}</span>
                      </div>
                    )}
                  </div>

                  {/* Price and CTA */}
                  <div className="pt-2 border-t border-border/60 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-muted-foreground uppercase block font-semibold">
                        Daily Rate
                      </span>
                      <span className="text-base font-extrabold text-[#D99722]">
                        ${pricePerDay}
                        <span className="text-[11px] text-muted-foreground font-normal"> / day</span>
                      </span>
                    </div>

                    <Link
                      href={`/workspaces/${item._id}`}
                      className="px-3.5 py-1.5 rounded-lg bg-[#D99722] hover:bg-[#C2841B] text-white text-xs font-bold transition-colors"
                    >
                      Book Chair
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

