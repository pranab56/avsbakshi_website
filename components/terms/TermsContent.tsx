import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function TermsContent() {
  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-10">
      {/* Navigation Link to Privacy */}
      <div className="flex items-center justify-between pb-6 border-b border-border text-xs sm:text-sm font-medium">
        <Link
          href="/privacy"
          className="inline-flex items-center gap-1.5 text-primary hover:text-primary/90 transition-colors"
        >
          <ArrowRight className="w-4 h-4 rotate-180" />
          Privacy Policy
        </Link>
        <span className="text-muted-foreground">Terms of Service Overview</span>
      </div>

      {/* Terms Sections */}
      <div className="space-y-10">
        {/* Section 1: Overview */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-6 bg-primary rounded-full" />
            <h2 className="font-title text-2xl sm:text-3xl font-bold text-foreground">
              1. Overview of the Platform
            </h2>
          </div>
          <div className="space-y-3 text-xs sm:text-sm text-muted-foreground leading-relaxed pl-4 border-l-2 border-border">
            <p>
              Cloud Salon is an online technology marketplace connecting clients with independent beauty professionals and salon venues. Professionals use our tools to display service menus, manage calendars, and accept payments.
            </p>
            <p>
              Cloud Salon acts solely as an intermediary technology provider. We are not a service provider, employer, or contract party to the beauty services rendered. All treatments and beauty services are provided independently by third-party professionals.
            </p>
          </div>
        </section>

        {/* Section 2: Acceptance of Terms */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-6 bg-primary rounded-full" />
            <h2 className="font-title text-2xl sm:text-3xl font-bold text-foreground">
              2. Acceptance of Terms
            </h2>
          </div>
          <div className="space-y-3 text-xs sm:text-sm text-muted-foreground leading-relaxed pl-4 border-l-2 border-border">
            <p>
              By accessing, browsing, or registering an account on Cloud Salon, you agree to be bound by these Terms &amp; Conditions, our <Link href="/privacy" className="text-primary underline font-medium hover:text-primary/90">Privacy Policy</Link>, and any applicable guidelines.
            </p>
            <p>
              If you do not agree to these terms in full, you must discontinue using our website and mobile application immediately.
            </p>
          </div>
        </section>

        {/* Section 3: User Registration & Accounts */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-6 bg-primary rounded-full" />
            <h2 className="font-title text-2xl sm:text-3xl font-bold text-foreground">
              3. User Accounts &amp; Registration
            </h2>
          </div>
          <div className="space-y-3 text-xs sm:text-sm text-muted-foreground leading-relaxed pl-4 border-l-2 border-border">
            <p>
              To access features like booking appointments or creating a professional storefront, you must register for an account. You agree to provide current, complete, and accurate information during signup.
            </p>
            <p>
              You are solely responsible for keeping your login credentials secure and for all activities under your account. Professionals must submit valid identification and qualifications during verification.
            </p>
          </div>
        </section>

        {/* Section 4: Bookings & Cancellations */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-6 bg-primary rounded-full" />
            <h2 className="font-title text-2xl sm:text-3xl font-bold text-foreground">
              4. Bookings, Payments &amp; Cancellations
            </h2>
          </div>
          <div className="space-y-3 text-xs sm:text-sm text-muted-foreground leading-relaxed pl-4 border-l-2 border-border">
            <p>
              Bookings are confirmed immediately upon completion of the checkout process. Payments are processed securely via integrated card payment gateways.
            </p>
            <p>
              Each professional maintains their individual cancellation window and deposit policies. Late cancellations or missed appointments (no-shows) may be subject to cancellation fees as outlined on the professional&apos;s service page prior to confirmation.
            </p>
          </div>
        </section>

        {/* Section 5: Professional Conduct */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-6 bg-primary rounded-full" />
            <h2 className="font-title text-2xl sm:text-3xl font-bold text-foreground">
              5. Professional Responsibilities &amp; Insurance
            </h2>
          </div>
          <div className="space-y-3 text-xs sm:text-sm text-muted-foreground leading-relaxed pl-4 border-l-2 border-border">
            <p>
              Beauty professionals warrant that they possess all required certifications, licenses, and public liability insurance necessary to perform services safely and legally in their jurisdiction.
            </p>
            <p>
              Professionals must adhere to health and safety standards, maintain clean workspace environments, and accurately represent their service pricing and treatment descriptions.
            </p>
          </div>
        </section>

        {/* Section 6: Contact */}
        <section className="bg-card border border-border rounded-2xl p-6 space-y-3 shadow-xs">
          <h3 className="font-title text-xl font-bold text-foreground">
            Need clarification on our Terms?
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            If you have any questions regarding these Terms &amp; Conditions, please contact our support team at{" "}
            <a href="mailto:support@cloudsalon.com" className="text-primary font-semibold hover:underline">
              support@cloudsalon.com
            </a>.
          </p>
        </section>
      </div>
    </section>
  );
}

