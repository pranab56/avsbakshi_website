import Link from "next/link";
import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full bg-white grid grid-cols-1 lg:grid-cols-12">
      {/* Left Visual Banner */}
      <div className="lg:col-span-6 relative bg-zinc-900 text-white p-6 sm:p-8 lg:p-12 flex flex-col justify-between overflow-hidden min-h-[180px] sm:min-h-[260px] lg:min-h-screen">
        <div className="absolute inset-0 bg-cover bg-center opacity-45 transform hover:scale-105 transition-transform duration-700" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1000&q=80')` }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

        <div className="relative z-10">
          <Link href="/" className="inline-block bg-white/95 p-2 rounded-lg">
            <Image
              src="/icons/logo.png"
              alt="The Cloud Salon"
              width={75}
              height={75}
              className="object-contain"
            />
          </Link>
        </div>

        <div className="relative z-10 space-y-2 sm:space-y-3 pt-4 lg:pt-0">
          <blockquote className="font-title text-base sm:text-xl lg:text-2xl font-light italic leading-snug text-white/95">
            &ldquo;Discover beauty services you will love, from professionals you can trust.&rdquo;
          </blockquote>
          <div className="w-12 h-1 bg-[#B78735] rounded-full" />
        </div>
      </div>

      {/* Right Form Container */}
      <div className="lg:col-span-6 p-5 sm:p-10 md:p-12 flex flex-col justify-center bg-[#FAF9F5] min-h-0 lg:min-h-screen py-8 lg:py-12">
        {children}
      </div>
    </div>
  );
}

