// app/cookies/page.tsx
"use client";

import Image from "next/image";
// import Navbar from "@/components/Navbar";

export default function CookiePolicyPage() {
  return (
    <>
      {/* <Navbar /> */}

      {/* Header with background image */}
      <section className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
        <Image
          src="/images/cookie-bg.jpg"
          alt="Cookie Policy Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-semibold text-white">
            Cookie Policy
          </h1>
        </div>
      </section>

      {/* Main content */}
      <main className="min-h-screen leading-[2] font-normal">
        <div className="prose prose-lg lg:prose-xl max-w-3xl mx-auto px-6 py-16 text-gray-800">
          <h2 className="text-2xl font-semibold">1. What Are Cookies?</h2>
          <p>
            Cookies are small text files stored on your device when you visit a
            website. They help us remember your preferences, keep you logged in,
            and understand how you interact with our site.
          </p>

          <div className="h-6" />

          <h2 className="text-2xl font-semibold">2. Types of Cookies We Use</h2>

          <h3 className="text-xl font-medium mt-6">a. Essential Cookies</h3>
          <p>
            These are necessary for the site to function correctly. They help
            with navigation, cart functionality, secure checkout, and login.
          </p>

          <h3 className="text-xl font-medium mt-6">
            b. Performance & Analytics Cookies
          </h3>
          <p>
            These help us understand how visitors use our website—what works,
            what doesn’t, and how we can improve.
          </p>
          <p>Example: Google Analytics</p>

          <h3 className="text-xl font-medium mt-6">c. Functionality Cookies</h3>
          <p>
            They remember your preferences (like location or language) to
            enhance your experience.
          </p>

          <h3 className="text-xl font-medium mt-6">
            d. Marketing & Advertising Cookies
          </h3>
          <p>
            These track your activity to show you relevant ads on other
            platforms (only if you opt-in).
          </p>
          <p>Example: Meta Pixel, Google Ads</p>

          <div className="h-6" />

          <h2 className="text-2xl font-semibold">3. Third-Party Cookies</h2>
          <p>
            Some cookies are set by third-party services we use—for payments,
            analytics, or customer support. These third parties have their own
            privacy policies.
          </p>

          <div className="h-6" />

          <h2 className="text-2xl font-semibold">4. How to Control Cookies</h2>
          <ul className="list-disc pl-6">
            <li>Browser Settings – Block or delete cookies anytime.</li>
            <li>
              Cookie Banner Preferences – Choose what you accept when you visit
              our site.
            </li>
          </ul>
          <p>Note: Disabling certain cookies may affect site functionality.</p>

          <div className="h-6" />

          <h2 className="text-2xl font-semibold">5. Updates to This Policy</h2>
          <p>
            We may update this Cookie Policy to reflect changes in technology or
            legal requirements. All updates will be posted here with the revised
            date.
          </p>

          <div className="h-6" />

          <h2 className="text-2xl font-semibold">Questions?</h2>
          <p>
            Email us at [privacy@get-bubl.com]
            <br />
            Address: bubl Technologies India Pvt. Ltd., New Delhi
          </p>
        </div>
      </main>
    </>
  );
}
