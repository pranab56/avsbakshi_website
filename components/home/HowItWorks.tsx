export default function HowItWorks() {
  return (
    <section className="bg-[#E6DFD5] py-12 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Header */}
        <div className="mb-8 sm:mb-16">
          <span className="text-xs font-semibold text-[#B78735] uppercase tracking-[0.2em] block mb-2 sm:mb-3">
            THE PROCESS
          </span>
          <h2 className="font-title text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight text-[#1A1A1A]">
            How it works
          </h2>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {/* Step 1: Discover */}
          <div className="bg-[#EAE8E3] rounded-lg py-8 px-5 sm:py-16 sm:px-8 flex flex-col items-center justify-center text-center transition-transform hover:-translate-y-1 duration-300">
            <span className="font-title font-light italic text-4xl sm:text-6xl lg:text-7xl text-[#DFD3BF] block mb-3 sm:mb-4 leading-none">
              01
            </span>
            <h3 className="font-title text-xl sm:text-2xl lg:text-3xl font-bold text-[#1A1A1A] mb-2 sm:mb-3">
              Discover
            </h3>
            <p className="text-xs sm:text-sm text-[#635E56] font-normal leading-relaxed max-w-[260px]">
              Search by service, location, and availability. Browse verified professionals and salons near you.
            </p>
          </div>

          {/* Step 2: Book (Gold Active Card) */}
          <div className="bg-[#B78735] rounded-lg py-8 px-5 sm:py-16 sm:px-8 flex flex-col items-center justify-center text-center shadow-lg shadow-[#B78735]/20 transition-transform hover:-translate-y-1 duration-300">
            <span className="font-title font-light italic text-4xl sm:text-6xl lg:text-7xl text-[#DCAD60]/60 block mb-3 sm:mb-4 leading-none">
              02
            </span>
            <h3 className="font-title text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2 sm:mb-3">
              Book
            </h3>
            <p className="text-xs sm:text-sm text-white/95 font-normal leading-relaxed max-w-[260px]">
              Choose your service, select a date and time, and confirm your appointment in seconds.
            </p>
          </div>

          {/* Step 3: Enjoy */}
          <div className="bg-[#EAE8E3] rounded-lg py-8 px-5 sm:py-16 sm:px-8 flex flex-col items-center justify-center text-center transition-transform hover:-translate-y-1 duration-300">
            <span className="font-title font-light italic text-4xl sm:text-6xl lg:text-7xl text-[#DFD3BF] block mb-3 sm:mb-4 leading-none">
              03
            </span>
            <h3 className="font-title text-xl sm:text-2xl lg:text-3xl font-bold text-[#1A1A1A] mb-2 sm:mb-3">
              Enjoy
            </h3>
            <p className="text-xs sm:text-sm text-[#635E56] font-normal leading-relaxed max-w-[260px]">
              Get your service and leave a review to help the community find great professionals.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
