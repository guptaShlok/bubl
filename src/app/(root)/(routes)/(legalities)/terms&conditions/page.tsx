// app/privacy/page.tsx
"use client";

import Navbar from "@/components/navbar";
import Image from "next/image";
import { motion } from "framer-motion";
import Footer from "@/components/footer";

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />

      {/* Header Section */}
      <section className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
        <Image
          src="/backgroundImages/LeaglBackground.png"
          alt="Privacy Policy Background"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Semi‐opaque overlay for contrast */}
        <div className="absolute inset-0" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-8xl font-semibold text-white drop-shadow-lg">
            Terms and Conditions
          </h1>
        </div>
      </section>

      {/* Main Content with fade‐in */}
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white text-gray-800 py-16"
      >
        <div className="container max-w-screen-lg mx-auto px-4 md:px-6 space-y-12">
          {/* Section 1 */}
          <section className="bg-gray-50 rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-semibold  border-b-4 border-indigo-200 inline-block pb-1">
              1. Information We Collect
            </h2>

            <div className="mt-6 space-y-6 leading-relaxed">
              <div>
                <h3 className="text-lg font-medium text-gray-700">
                  a. Personal Information
                </h3>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Full name</li>
                  <li>Email address</li>
                  <li>Phone number</li>
                  <li>Shipping &amp; billing addresses</li>
                  <li>
                    Payment information (processed securely via third-party
                    gateways)
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-700">
                  b. Device &amp; Usage Data
                </h3>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>IP address</li>
                  <li>Browser and device type</li>
                  <li>Location (if permitted)</li>
                  <li>Time spent on pages and click activity</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-700">
                  c. Air Quality App Data
                </h3>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Device usage history</li>
                  <li>Air quality readings</li>
                  <li>Filter status</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-semibold  border-b-4 border-indigo-200 inline-block pb-1">
              2. How We Use Your Data
            </h2>
            <ul className="list-disc list-inside mt-6 space-y-1 leading-relaxed">
              <li>Fulfill your orders and deliver products</li>
              <li>Send important service-related updates</li>
              <li>Improve our website, products, and customer experience</li>
              <li>Analyze air quality trends (if app-integrated)</li>
              <li>Provide customer support</li>
              <li>Send marketing emails (only if you opt-in)</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="bg-gray-50 rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-semibold  border-b-4 border-indigo-200 inline-block pb-1">
              3. How We Store &amp; Protect Your Data
            </h2>
            <ul className="list-disc list-inside mt-6 space-y-1 leading-relaxed">
              <li>SSL encryption across our website</li>
              <li>Secure servers hosted on reputable platforms</li>
              <li>Access control and data minimization policies</li>
              <li>
                Payment data handled by certified third-party gateways (e.g.,
                Razorpay, Stripe)
              </li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-semibold  border-b-4 border-indigo-200 inline-block pb-1">
              4. Sharing Your Data
            </h2>
            <p className="mt-4 leading-relaxed">
              We do not sell or rent your personal data. We may share your data
              with:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 leading-relaxed">
              <li>Shipping and logistics partners</li>
              <li>Payment processors</li>
              <li>
                Service providers (analytics, communication – bound by
                confidentiality)
              </li>
              <li>Authorities, if legally required</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="bg-gray-50 rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-semibold  border-b-4 border-indigo-200 inline-block pb-1">
              5. Cookies &amp; Tracking
            </h2>
            <ul className="list-disc list-inside mt-6 space-y-1 leading-relaxed">
              <li>Improve site performance</li>
              <li>Understand browsing behavior</li>
              <li>Personalize your shopping experience</li>
            </ul>
            <p className="mt-4 leading-relaxed">
              You can manage cookie preferences through your browser settings.
            </p>
          </section>

          {/* Section 6 */}
          <section className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-semibold  border-b-4 border-indigo-200 inline-block pb-1">
              6. Your Rights
            </h2>
            <ul className="list-disc list-inside mt-6 space-y-1 leading-relaxed">
              <li>Access the personal data we hold</li>
              <li>Correct or delete your data</li>
              <li>Withdraw consent</li>
              <li>Object to processing</li>
            </ul>
            <p className="mt-4 leading-relaxed">
              Email:{" "}
              <a
                href="mailto:privacy@get-bubl.com"
                className=" hover:underline"
              >
                privacy@get-bubl.com
              </a>
            </p>
          </section>

          {/* Section 7 */}
          <section className="bg-gray-50 rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-semibold  border-b-4 border-indigo-200 inline-block pb-1">
              7. Children&apos;s Privacy
            </h2>
            <p className="mt-4 leading-relaxed">
              This service is not intended for children under 13 without
              supervision. We do not knowingly collect data from minors without
              parental consent.
            </p>
          </section>

          {/* Section 8 */}
          <section className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-semibold text-indigo-600 border-b-4 border-indigo-200 inline-block pb-1">
              8. Updates to This Policy
            </h2>
            <p className="mt-4 leading-relaxed">
              We may update this policy from time to time. Any changes will be
              posted here with the effective date.
            </p>
          </section>

          {/* Contact Info */}
          <section className="bg-gray-50 rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-semibold text-indigo-600 border-b-4 border-indigo-200 inline-block pb-1">
              Questions?
            </h2>
            <div className="mt-4 space-y-2 leading-relaxed">
              <p>
                Email:{" "}
                <a
                  href="mailto:privacy@get-bubl.com"
                  className=" hover:underline"
                >
                  privacy@get-bubl.com
                </a>
              </p>
              <p>Address: bubl Technologies India Pvt. Ltd., New Delhi</p>
            </div>
          </section>
        </div>

        <Footer />
      </motion.main>
    </>
  );
}
