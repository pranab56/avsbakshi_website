import { GoogleTranslateProvider } from "@/components/ui/google-translate";
import ReduxProvider from "@/components/providers/ReduxProvider";
import type { Metadata } from "next";
import { Manrope, Fraunces } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-title",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "The Cloud Salon | Find & Book Top Beauty Professionals & Salons",
  description: "Discover trusted beauty professionals and salons, and book your next appointment with confidence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F5F3EF] text-[#2C2E33] font-sans selection:bg-[#B78735]/20 selection:text-[#B78735]">
        <ReduxProvider>
          <GoogleTranslateProvider />
          {children}
          <Toaster richColors position="top-center" />
        </ReduxProvider>
      </body>
    </html>
  );
}

