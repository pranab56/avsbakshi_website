import Navbar from "@/components/shared/navbar";
import Link from "next/link";
import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-200">
      <Navbar />
      <div className="flex-1 w-full grid grid-cols-1 lg:grid-cols-12 min-h-0">
        {/* Left Visual Banner (Desktop only) */}
        <div className="hidden lg:block lg:col-span-6 relative bg-zinc-950 overflow-hidden min-h-[calc(100vh-4.5rem)]">
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
        <div className="lg:col-span-6 p-5 sm:p-10 md:p-12 flex flex-col justify-center bg-background min-h-0 py-8 lg:py-12">
          {children}
        </div>
      </div>
    </div>
  );
}

