import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function RoleCardsSection() {
  const cards = [
    {
      title: "For Customers",
      badge: "Clients & Seekers",
      desc: "Book your favorite services, anytime, anywhere.",
      img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
      link: "/discover",
    },
    {
      title: "For Professionals",
      badge: "Stylists & Artists",
      desc: "Grow your business on your terms.",
      img: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=800&q=80",
      link: "/for-professionals",
    },
    {
      title: "For Businesses",
      badge: "Salons & Owners",
      desc: "Join the marketplace and reach more clients.",
      img: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=800&q=80",
      link: "/for-businesses",
    },
  ];

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-2">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {cards.map((card, idx) => (
          <Link
            key={idx}
            href={card.link}
            className="group relative h-56 sm:h-64 rounded-3xl overflow-hidden shadow-xl border border-border/80 transition-all duration-300 hover:shadow-2xl hover:border-[#B78735]/60 hover:-translate-y-1"
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url('${card.img}')` }}
            />
            {/* Dark Glass Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

            {/* Top Category Badge */}
            <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-[10px] font-bold text-white uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-[#E5C158]" />
              <span>{card.badge}</span>
            </div>

            {/* Content & Action Circle */}
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-3">
              <div className="space-y-1">
                <h3 className="font-title text-xl sm:text-2xl font-bold text-white group-hover:text-[#E5C158] transition-colors leading-tight">
                  {card.title}
                </h3>
                <p className="text-xs text-zinc-300 font-light max-w-[210px] leading-relaxed">
                  {card.desc}
                </p>
              </div>

              {/* Gold Arrow Circle Button */}
              <div className="w-11 h-11 rounded-full bg-[#B78735] text-white flex items-center justify-center shrink-0 shadow-lg group-hover:bg-[#D4AF37] group-hover:scale-110 transition-all">
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
