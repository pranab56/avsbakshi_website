import ReduxProvider from "@/components/providers/ReduxProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { I18nProvider } from "@/components/providers/i18n-provider";
import Chatbot from "@/components/shared/Chatbot";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
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
      className={`${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans selection:bg-[#D99722]/20 selection:text-[#D99722]">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={true}
        >
          <I18nProvider>
            <ReduxProvider>
              {children}
              <Chatbot />
              <Toaster richColors position="top-center" />
            </ReduxProvider>
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

