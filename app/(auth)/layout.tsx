import Link from "next/link";
import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full bg-background text-foreground grid grid-cols-1 lg:grid-cols-12">
      {/* Left Visual Banner (Desktop only) */}
      <div className="hidden lg:block lg:col-span-6 relative bg-zinc-950 overflow-hidden lg:min-h-screen">
        <Link href="/" className="relative block w-full h-full" title="Back to home">
          <Image
            src="/images/auth/image.png"
            alt="The Cloud Salon"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-top"
          />
        </Link>
      </div>

      {/* Right Form Container */}
      <div className="lg:col-span-6 p-5 sm:p-10 md:p-12 flex flex-col justify-center bg-background min-h-0 lg:min-h-screen py-8 lg:py-12">
        {children}
      </div>
    </div>
  );
}

