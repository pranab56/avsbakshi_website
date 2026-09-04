import Link from "next/link";
import { ArrowRight, Star, MapPin } from "lucide-react";

export default function SalonsNearYou() {
  const salons = [
    {
      id: 101,
      name: "Noir Studio",
      category: "Hair & Beauty",
      rating: 4.8,
      reviews: 89,
      location: "Soho, London",
      price: "from £55",
      badge: "Open until 9:00 PM",
      tags: ["Haircut", "Colour", "Blowout"],
      img: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 102,
      name: "The Ritual",
      category: "Skincare & Wellness",
      rating: 4.9,
      reviews: 142,
      location: "Marylebone, London",
      price: "from £90",
      badge: "Open until 10:00 PM",
      tags: ["Facial", "LED Therapy", "Peels"],
      img: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 103,
      name: "Golden Ratio",
      category: "Barbershop & Grooming",
      rating: 4.8,
      reviews: 99,
      location: "Hackney, London",
      price: "from £40",
      badge: "Open until 9:30 PM",
      tags: ["Haircut", "Beard Trim", "Shave"],
      img: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=600&q=80",
    },
  ];

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-bold text-[#B78735] uppercase tracking-widest block mb-1">
            SALONS
          </span>
          <h2 className="font-title text-3xl sm:text-4xl font-medium">
            Discover Great Salons Near You
          </h2>
        </div>
        <Link
          href="/discover?tab=salons"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-sm border border-[#E5E0D6] bg-white text-xs font-semibold text-[#2C2E33] hover:bg-[#F5F3EF] hover:border-[#B78735] transition-all self-start md:self-auto"
        >
          Browse all services
          <ArrowRight className="w-3.5 h-3.5 text-[#B78735]" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {salons.map((salon) => (
          <div
            key={salon.id}
            className="bg-white rounded-lg overflow-hidden border border-[#E5E0D6] shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
          >
            <div className="relative h-56 overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                style={{ backgroundImage: `url('${salon.img}')` }}
              />
              <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-[10px] font-semibold px-2.5 py-1 rounded-full text-[#1A1A1A]">
                {salon.badge}
              </span>
            </div>

            <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-title text-base font-bold text-[#1A1A1A] group-hover:text-[#B78735] transition-colors">
                      {salon.name}
                    </h3>
                    <p className="text-xs text-zinc-500">{salon.category}</p>
                  </div>
                  <span className="font-title text-xs font-bold text-[#B78735]">{salon.price}</span>
                </div>

                <div className="flex items-center gap-1 mt-2 text-xs text-zinc-600">
                  <Star className="w-3.5 h-3.5 fill-[#B78735] text-[#B78735]" />
                  <span className="font-bold text-[#1A1A1A]">{salon.rating}</span>
                  <span className="text-zinc-400">({salon.reviews})</span>
                  <span className="mx-1">•</span>
                  <MapPin className="w-3 h-3 text-zinc-400" />
                  <span className="text-zinc-500">{salon.location}</span>
                </div>
              </div>

              <Link
                href="/professionals/1"
                className="w-full text-center py-3 bg-[#B78735] hover:bg-[#A37428] text-white text-xs font-semibold rounded-sm shadow transition-colors block mt-2"
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
