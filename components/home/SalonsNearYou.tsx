import Link from "next/link";
import { ArrowRight, Star, MapPin } from "lucide-react";

export default function SalonsNearYou() {
  const salons = [
    {
      id: 101,
      name: "Noir Studio Suites",
      category: "Hair & Luxury Beauty",
      rating: 4.9,
      reviews: 189,
      location: "Soho, New York",
      price: "from $75",
      badge: "Open until 9:00 PM",
      tags: ["Haircut", "Colour", "Blowout"],
      img: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 102,
      name: "The Ritual MedSpa",
      category: "Skincare & Wellness",
      rating: 4.9,
      reviews: 242,
      location: "Beverly Hills, Los Angeles",
      price: "from $120",
      badge: "Open until 10:00 PM",
      tags: ["Facial", "LED Therapy", "Peels"],
      img: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 103,
      name: "Golden Ratio Barbering",
      category: "Barbershop & Grooming",
      rating: 4.9,
      reviews: 199,
      location: "West Loop, Chicago",
      price: "from $50",
      badge: "Open until 9:30 PM",
      tags: ["Haircut", "Beard Trim", "Shave"],
      img: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-bold text-[#B78735] uppercase tracking-widest block mb-1">
            SALONS
          </span>
          <h2 className="font-title text-2xl sm:text-4xl font-medium">
            Discover Great Salons Near You
          </h2>
        </div>
        <Link
          href="/discover?tab=salons"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:py-3 rounded-xl border border-border bg-card text-xs font-semibold text-foreground hover:bg-accent hover:border-primary transition-all w-full sm:w-auto"
        >
          Browse all services
          <ArrowRight className="w-3.5 h-3.5 text-primary" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {salons.map((salon) => (
          <div
            key={salon.id}
            className="bg-card rounded-xl overflow-hidden border border-border shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
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

            <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
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
                  <span className="text-muted-foreground">({salon.reviews})</span>
                  <span className="mx-1">•</span>
                  <MapPin className="w-3 h-3 text-muted-foreground" />
                  <span className="text-muted-foreground">{salon.location}</span>
                </div>
              </div>

              <Link
                href="/professionals/1"
                className="w-full text-center py-3 bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold rounded-xl shadow transition-colors block mt-2"
              >
                Book Appointment
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
