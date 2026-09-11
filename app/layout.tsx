import ReduxProvider from "@/components/providers/ReduxProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import type { Metadata } from "next";
import { Manrope, Fraunces } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { I18nProvider } from "@/components/providers/i18n-provider";

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
      suppressHydrationWarning
      className={`${manrope.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans selection:bg-[#B78735]/20 selection:text-[#B78735] transition-colors duration-200">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <I18nProvider>
            <ReduxProvider>
              {children}
              <Toaster richColors position="top-center" />
            </ReduxProvider>
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

