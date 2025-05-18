// app/privacy/page.tsx
"use client";

import Image from "next/image";

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
        <Image
          src="/images/privacy-bg.jpg"
          alt="Privacy Policy Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-semibold text-white">
            Privacy Policy
          </h1>
        </div>
      </section>

      <main className="min-h-screen leading-[2] font-normal ">
        <div className="prose prose-lg lg:prose-xl max-w-3xl mx-auto px-6 py-16 text-gray-800">
          <h2 className="text-2xl mt-6 font-semibold">
            1. Information We Collect
          </h2>
          <h3 className=" mt-3 font-medium">a. Personal Information</h3>
          <ul className=" list-disc mb-4">
            <li>Full name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Shipping & billing addresses</li>
            <li>
              Payment information (processed securely via third-party gateways)
            </li>
          </ul>
          <h3 className=" mt-3 font-medium">b. Device & Usage Data</h3>
          <ul className=" list-disc mb-4">
            <li>IP address</li>
            <li>Browser and device type</li>
            <li>Location (if permitted)</li>
            <li>Time spent on pages and click activity</li>
          </ul>
          <h3 className=" mt-3 font-medium">c. Air Quality App Data</h3>
          <ul className=" list-disc mb-4">
            <li>Device usage history</li>
            <li>Air quality readings</li>
            <li>Filter status</li>
          </ul>

          <h2 className="text-2xl mt-6 font-semibold">
            2. How We Use Your Data
          </h2>
          <ul className=" list-disc mb-4">
            <li>Fulfill your orders and deliver products</li>
            <li>Send important service-related updates</li>
            <li>Improve our website, products, and customer experience</li>
            <li>Analyze air quality trends (if app-integrated)</li>
            <li>Provide customer support</li>
            <li>Send marketing emails (only if you opt-in)</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2 className="text-2xl mt-6 font-semibold">
            3. How We Store & Protect Your Data
          </h2>
          <ul className=" list-disc mb-4">
            <li>SSL encryption across our website</li>
            <li>Secure servers hosted on reputable platforms</li>
            <li>Access control and data minimization policies</li>
            <li>
              Payment data handled by certified third-party gateways (e.g.,
              Razorpay, Stripe)
            </li>
          </ul>

          <h2 className="text-2xl mt-6 font-semibold">4. Sharing Your Data</h2>
          <p>We do not sell or rent your personal data.</p>
          <p>We may share your data with:</p>
          <ul className=" list-disc mb-4">
            <li>Shipping and logistics partners</li>
            <li>Payment processors</li>
            <li>
              Service providers (analytics, communication – bound by
              confidentiality)
            </li>
            <li>Authorities, if legally required</li>
          </ul>

          <h2 className="text-2xl mt-6 font-semibold">5. Cookies & Tracking</h2>
          <ul className=" list-disc mb-4">
            <li>Improve site performance</li>
            <li>Understand browsing behavior</li>
            <li>Personalize your shopping experience</li>
          </ul>
          <p>
            You can manage cookie preferences through your browser settings.
          </p>

          <h2 className="text-2xl mt-6 font-semibold">6. Your Rights</h2>
          <ul className=" list-disc mb-4">
            <li>Access the personal data we hold</li>
            <li>Correct or delete your data</li>
            <li>Withdraw consent</li>
            <li>Object to processing</li>
          </ul>
          <p>Email: privacy@get-bubl.com</p>

          <h2 className="text-2xl mt-6 font-semibold">
            7. Children&#39;s Privacy
          </h2>
          <p>
            Not intended for children under 13 without supervision. No knowingly
            collected data from minors without consent.
          </p>

          <h2 className="text-2xl mt-6 font-semibold">
            8. Updates to This Policy
          </h2>
          <p>
            We may update this policy. Changes will be posted here with the
            updated effective date.
          </p>

          <h2 className="text-2xl mt-6 font-semibold">Questions?</h2>
          <p>Email: [privacy@get-bubl.com]</p>
          <p>Address: bubl Technologies India Pvt. Ltd., New Delhi</p>
        </div>
      </main>
    </>
  );
}
