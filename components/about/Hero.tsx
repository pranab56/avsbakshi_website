export default function Hero() {
    return (
        <div className="w-full">
            {/* Dark Hero Header */}
            <section className="bg-[#1E1C1A] text-white py-16 sm:py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tl from-[#7C4F24]/40 via-[#5A3819]/15 to-transparent pointer-events-none" />

                <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                    <div className="lg:col-span-6 space-y-6">
                        <div className="flex items-center gap-2">
                            <span className="w-8 h-[2px] bg-primary" />
                            <span className="text-xs font-semibold text-primary uppercase tracking-[0.2em]">
                                ABOUT US
                            </span>
                        </div>

                        <h1 className="font-title text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.1] text-white">
                            We built the <br />
                            platform we needed <br />
                            but <span className="font-light italic text-[#CAA054]">could never find.</span>
                        </h1>

                        <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed max-w-lg">
                            Cloud Salon was founded by a hairstylist who spent 12 years managing bookings in WhatsApp groups and chasing payments over text. There had to be a better way.
                        </p>
                    </div>

                    <div className="lg:col-span-6">
                        <div className="relative rounded-[32px] overflow-hidden shadow-2xl shadow-black/30 h-[480px] sm:h-[580px] lg:h-[620px] w-full">
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
                                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1200&q=80')` }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Gold Stats Banner */}
            <section className="bg-primary dark:bg-card border-b border-border text-white dark:text-foreground py-12 sm:py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    <div>
                        <h3 className="font-title text-4xl sm:text-5xl font-normal text-white dark:text-foreground mb-2">47,000+</h3>
                        <p className="text-xs sm:text-sm text-white/80 dark:text-muted-foreground font-normal">Independent professionals</p>
                    </div>
                    <div>
                        <h3 className="font-title text-4xl sm:text-5xl font-normal text-white dark:text-foreground mb-2">320,000+</h3>
                        <p className="text-xs sm:text-sm text-white/80 dark:text-muted-foreground font-normal">Bookings this year</p>
                    </div>
                    <div>
                        <h3 className="font-title text-4xl sm:text-5xl font-normal text-white dark:text-foreground mb-2">$35M+</h3>
                        <p className="text-xs sm:text-sm text-white/80 dark:text-muted-foreground font-normal">Paid out to professionals</p>
                    </div>
                    <div>
                        <h3 className="font-title text-4xl sm:text-5xl font-normal text-white dark:text-foreground mb-2">4.9★</h3>
                        <p className="text-xs sm:text-sm text-white/80 dark:text-muted-foreground font-normal">Average platform rating</p>
                    </div>
                </div>
            </section>
        </div>
    )
}