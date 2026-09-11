import Link from "next/link";
import { Star, MapPin } from "lucide-react";

export default function SalonsTab() {
  const salons = [
    { id: 101, name: "Noir Studio Suites", category: "Hair & Luxury Beauty", rating: 4.9, reviews: 189, location: "Soho, New York", price: "from $75", badge: "Open until 9:00 PM", tags: ["Haircut", "Colour", "Blowout"], img: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=800&q=80" },
    { id: 102, name: "The Ritual MedSpa", category: "Skincare & Wellness", rating: 4.9, reviews: 242, location: "Beverly Hills, Los Angeles", price: "from $120", badge: "Open until 10:00 PM", tags: ["Facial", "LED Therapy", "Peels"], img: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80" },
    { id: 103, name: "Golden Ratio Barbering", category: "Barbershop & Grooming", rating: 4.9, reviews: 199, location: "West Loop, Chicago", price: "from $50", badge: "Open until 9:30 PM", tags: ["Haircut", "Beard Trim", "Shave"], img: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <p className="text-xs sm:text-sm text-muted-foreground">{salons.length} salons near you</p>
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 max-w-full">
          <button className="px-4 py-2 bg-accent text-primary dark:text-primary-light text-xs rounded-sm font-medium cursor-pointer border border-border/50">
            Open Now
          </button>
          <button className="px-4 py-2 bg-accent text-primary dark:text-primary-light text-xs rounded-sm font-medium cursor-pointer border border-border/50">
            Hair
          </button>
          <button className="px-4 py-2 bg-accent text-primary dark:text-primary-light text-xs rounded-sm font-medium cursor-pointer border border-border/50">
            Skincare
          </button>
          <button className="px-4 py-2 bg-accent text-primary dark:text-primary-light text-xs rounded-sm font-medium cursor-pointer border border-border/50">
            Barber
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {salons.map((salon) => (
          <div
            key={salon.id}
            className="bg-card rounded-lg overflow-hidden border border-border shadow-xs hover:shadow-lg transition-all group flex flex-col justify-between"
          >
            <div className="relative h-56 overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                style={{ backgroundImage: `url('${salon.img}')` }}
              />
              <span className="absolute top-3 left-3 bg-background/90 backdrop-blur-md text-[10px] font-semibold px-2.5 py-1 rounded-full text-foreground border border-border/50">
                {salon.badge}
              </span>
            </div>

            <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-title text-base font-bold text-foreground group-hover:text-primary transition-colors">
                      {salon.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">{salon.category}</p>
                  </div>
                  <span className="font-title text-xs font-bold text-primary">{salon.price}</span>
                </div>

                <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                  <Star className="w-3.5 h-3.5 fill-primary text-primary" />
                  <span className="font-bold text-foreground">{salon.rating}</span>
                  <span className="text-muted-foreground/70">({salon.reviews})</span>
                  <span className="mx-1">•</span>
                  <MapPin className="w-3 h-3 text-muted-foreground/70" />
                  <span className="text-muted-foreground">{salon.location}</span>
                </div>
              </div>

              <Link
                href="/professionals/1"
                className="w-full text-center py-3 bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold rounded-sm shadow-sm transition-colors block mt-2"
              >
                Book Appointment
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

