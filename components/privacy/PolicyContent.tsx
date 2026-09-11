import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function PolicyContent() {
  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-10">
      {/* Navigation Link to Terms */}
      <div className="flex items-center justify-between pb-6 border-b border-border text-xs sm:text-sm font-medium">
        <span className="text-muted-foreground">Privacy Policy Overview</span>
        <Link
          href="/terms"
          className="inline-flex items-center gap-1.5 text-primary hover:text-primary/90 transition-colors"
        >
          Terms &amp; Conditions
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Policy Sections */}
      <div className="space-y-10">
        {/* Section 1: Introduction */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-6 bg-primary rounded-full" />
            <h2 className="font-title text-2xl sm:text-3xl font-bold text-foreground">
              1. Introduction
            </h2>
          </div>
          <div className="space-y-3 text-xs sm:text-sm text-muted-foreground leading-relaxed pl-4 border-l-2 border-border">
            <p>
              This Privacy Policy describes how Cloud Salon (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) collects, uses, discloses, and protects your personal information when you access or use our platform, including our website and mobile application (collectively, the &ldquo;Platform&rdquo;).
            </p>
            <p>
              Cloud Salon is an online marketplace connecting customers with independent beauty and wellness professionals. By using our Platform, you acknowledge that you have read and understood the practices described herein.
            </p>
          </div>
        </section>

        {/* Section 2: Information We Collect */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-6 bg-primary rounded-full" />
            <h2 className="font-title text-2xl sm:text-3xl font-bold text-foreground">
              2. Information We Collect
            </h2>
          </div>

          <div className="space-y-6 text-xs sm:text-sm text-muted-foreground pl-4 border-l-2 border-border">
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground text-sm sm:text-base">
                A. Information You Provide Directly
              </h3>
              <ul className="space-y-2.5 pl-5 list-disc text-muted-foreground">
                <li>
                  <strong className="text-foreground">Account Registration:</strong> Name, email address, phone number, and password when registering as a customer, professional, or business.
                </li>
                <li>
                  <strong className="text-foreground">Professional Credentials:</strong> Professional licenses, portfolio photographs, business location, and service pricing menus.
                </li>
                <li>
                  <strong className="text-foreground">Booking &amp; Payments:</strong> Appointment dates, selected services, and transaction details processed securely via certified payment gateways.
                </li>
                <li>
                  <strong className="text-foreground">Communications &amp; Reviews:</strong> User feedback, ratings, direct support inquiries, and messages sent through our platform.
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-foreground text-sm sm:text-base">
                B. Information Collected Automatically
              </h3>
              <ul className="space-y-2.5 pl-5 list-disc text-muted-foreground">
                <li>
                  <strong className="text-foreground">Device &amp; Usage Data:</strong> IP address, device type, browser details, pages visited, and interaction logs.
                </li>
                <li>
                  <strong className="text-foreground">Location Data:</strong> Approximate or precise location (with explicit device consent) to display nearby professionals and salons.
                </li>
                <li>
                  <strong className="text-foreground">Cookies &amp; Analytics:</strong> Tracking technologies to retain session preferences and analyze application performance.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 3: How We Use Information */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-6 bg-primary rounded-full" />
            <h2 className="font-title text-2xl sm:text-3xl font-bold text-foreground">
              3. How We Use Your Information
            </h2>
          </div>
          <div className="space-y-3 text-xs sm:text-sm text-muted-foreground leading-relaxed pl-4 border-l-2 border-border">
            <p>We process collected data for legitimate operational and business purposes:</p>
            <ul className="space-y-2.5 pl-5 list-disc text-muted-foreground">
              <li>Facilitating appointment bookings, client notifications, and automated booking reminders.</li>
              <li>Processing secure payments, split payouts for salon renters, and digital receipts.</li>
              <li>Personalizing service recommendations based on past appointments and location.</li>
              <li>Detecting fraudulent activity, verifying professional accounts, and enforcing community safety standards.</li>
              <li>Sending transactional updates, service announcements, and optional promotional offers.</li>
            </ul>
          </div>
        </section>

        {/* Section 4: Data Security & Retention */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-6 bg-primary rounded-full" />
            <h2 className="font-title text-2xl sm:text-3xl font-bold text-foreground">
              4. Data Security &amp; Retention
            </h2>
          </div>
          <div className="space-y-3 text-xs sm:text-sm text-muted-foreground leading-relaxed pl-4 border-l-2 border-border">
            <p>
              We implement industry-standard technical and organizational security measures, including SSL encryption, secure data storage, and strict access controls. Payment card details are tokenized and processed exclusively by PCI-DSS compliant payment providers.
            </p>
            <p>
              We retain personal data only for as long as necessary to fulfill the purposes outlined in this policy or as required by applicable UK legal and tax regulations.
            </p>
          </div>
        </section>

        {/* Section 5: Your Privacy Rights */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-6 bg-primary rounded-full" />
            <h2 className="font-title text-2xl sm:text-3xl font-bold text-foreground">
              5. Your Privacy Rights
            </h2>
          </div>
          <div className="space-y-3 text-muted-foreground leading-relaxed pl-4 border-l-2 border-border text-xs sm:text-sm">
            <p>Depending on your location, you hold specific rights regarding your personal information:</p>
            <ul className="space-y-2.5 pl-5 list-disc text-muted-foreground">
              <li><strong className="text-foreground">Access &amp; Correction:</strong> Request a copy of your personal data or request corrections to inaccurate entries.</li>
              <li><strong className="text-foreground">Erasure (Right to be Forgotten):</strong> Request account deletion and removal of associated non-transactional data.</li>
              <li><strong className="text-foreground">Opt-Out:</strong> Unsubscribe from marketing emails at any time using the link in the footer of our emails.</li>
            </ul>
          </div>
        </section>

        {/* Section 6: Contact Us */}
        <section className="bg-card border border-border rounded-2xl p-6 space-y-3 shadow-xs">
          <h3 className="font-title text-xl font-bold text-foreground">
            Questions about our Privacy Policy?
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            If you have any questions, concerns, or requests regarding your personal data, please contact our Data Protection Team at{" "}
            <a href="mailto:privacy@cloudsalon.com" className="text-primary font-semibold hover:underline">
              privacy@cloudsalon.com
            </a>.
          </p>
        </section>
      </div>
    </section>
  );
}

