import Image from "next/image";
import Link from "next/link";

const ageGroups = [
  {
    id: 1,
    label: "Children",
    ageRange: "Kids & Tweens",
    description: "Fun, gentle cuts and styles tailored for little ones in a welcoming, kid-friendly environment.",
    cta: "Kids' Services",
    href: "/discover?tab=services&category=kids",
    // Happy American child getting a haircut
    img: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=800&q=80",
    badge: "Ages 3–12",
    color: "from-amber-400/20 to-yellow-300/10",
    badgeColor: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  },
  {
    id: 2,
    label: "Teens",
    ageRange: "Young Adults",
    description: "Trendy styles, bold colors, and on-trend looks for teens who want to express themselves.",
    cta: "Teen Services",
    href: "/discover?tab=services&category=teens",
    // American teenage girl, modern look
    img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80",
    badge: "Ages 13–19",
    color: "from-rose-400/20 to-pink-300/10",
    badgeColor: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300",
  },
  {
    id: 3,
    label: "Adults",
    ageRange: "Men & Women",
    description: "Premium cuts, color, and beauty treatments for busy professionals and everyday lifestyles.",
    cta: "Adult Services",
    href: "/discover?tab=services",
    // American adult professional woman
    img: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80",
    badge: "Ages 20–55",
    color: "from-primary/20 to-amber-400/10",
    badgeColor: "bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary",
  },
  {
    id: 4,
    label: "Seniors",
    ageRange: "Golden Years",
    description: "Compassionate, expert care with gentle techniques and styles designed for mature elegance.",
    cta: "Senior Services",
    href: "/discover?tab=services&category=seniors",
    // American senior woman, dignified
    img: "https://images.unsplash.com/photo-1566616213894-2d4e1baee5d8?auto=format&fit=crop&w=800&q=80",
    badge: "Ages 55+",
    color: "from-violet-400/20 to-purple-300/10",
    badgeColor: "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
  },
];

export default function ServicesForAllAges() {
  return (
    <section className="bg-background text-foreground py-10 sm:py-16 lg:py-20 transition-colors duration-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-14">
          <span className="text-xs font-semibold text-primary uppercase tracking-[0.2em] block mb-2 sm:mb-3">
            EVERYONE IS WELCOME
          </span>
          <h2 className="font-title text-2xl sm:text-4xl lg:text-5xl font-normal text-foreground mb-3 sm:mb-4">
            Services for all ages
          </h2>
          <p className="text-xs sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            From a child&apos;s first haircut to graceful senior styling — The Cloud Salon connects every member
            of your family with trusted, caring beauty professionals.
          </p>
        </div>

        {/* Age Group Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {ageGroups.map((group) => (
            <Link
              key={group.id}
              href={group.href}
              className="group relative bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative h-56 sm:h-64 overflow-hidden">
                <Image
                  src={group.img}
                  alt={`${group.label} salon services`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Age badge */}
                <div className="absolute top-3 left-3">
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${group.badgeColor}`}>
                    {group.badge}
                  </span>
                </div>

                {/* Label on image bottom */}
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-white font-title text-xl font-semibold">{group.label}</h3>
                  <p className="text-white/70 text-xs">{group.ageRange}</p>
                </div>
              </div>

              {/* Card body */}
              <div className="p-4 sm:p-5">
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {group.description}
                </p>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary group-hover:gap-2 transition-all duration-200">
                  {group.cta}
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-10 sm:mt-12">
          <Link
            href="/discover"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold text-sm hover:bg-primary/90 transition-colors shadow-sm"
          >
            Browse All Services
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
