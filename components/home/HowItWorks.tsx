export default function HowItWorks() {
  return (
    <section className="bg-accent/40 border-y border-border py-12 sm:py-24 transition-colors duration-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Header */}
        <div className="mb-8 sm:mb-16">
          <span className="text-xs font-semibold text-primary uppercase tracking-[0.2em] block mb-2 sm:mb-3">
            THE PROCESS
          </span>
          <h2 className="font-title text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight text-foreground">
            How it works
          </h2>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {/* Step 1: Discover */}
          <div className="bg-card border border-border rounded-xl py-8 px-5 sm:py-16 sm:px-8 flex flex-col items-center justify-center text-center transition-transform hover:-translate-y-1 duration-300 shadow-xs">
            <span className="font-title font-light italic text-4xl sm:text-6xl lg:text-7xl text-muted-foreground/30 block mb-3 sm:mb-4 leading-none">
              01
            </span>
            <h3 className="font-title text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-2 sm:mb-3">
              Discover
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground font-normal leading-relaxed max-w-[260px]">
              Search by service, location, and availability. Browse verified professionals and salons near you.
            </p>
          </div>

          {/* Step 2: Book (Gold Active Card) */}
          <div className="bg-primary text-primary-foreground rounded-xl py-8 px-5 sm:py-16 sm:px-8 flex flex-col items-center justify-center text-center shadow-lg shadow-primary/20 transition-transform hover:-translate-y-1 duration-300">
            <span className="font-title font-light italic text-4xl sm:text-6xl lg:text-7xl opacity-50 block mb-3 sm:mb-4 leading-none">
              02
            </span>
            <h3 className="font-title text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3">
              Book
            </h3>
            <p className="text-xs sm:text-sm font-normal leading-relaxed max-w-[260px] opacity-90">
              Choose your service, select a date and time, and confirm your appointment in seconds.
            </p>
          </div>

          {/* Step 3: Enjoy */}
          <div className="bg-card border border-border rounded-xl py-8 px-5 sm:py-16 sm:px-8 flex flex-col items-center justify-center text-center transition-transform hover:-translate-y-1 duration-300 shadow-xs">
            <span className="font-title font-light italic text-4xl sm:text-6xl lg:text-7xl text-muted-foreground/30 block mb-3 sm:mb-4 leading-none">
              03
            </span>
            <h3 className="font-title text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-2 sm:mb-3">
              Enjoy
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground font-normal leading-relaxed max-w-[260px]">
              Get your service and leave a review to help the community find great professionals.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
