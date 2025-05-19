// app/privacy/page.tsx
"use client";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Image from "next/image";
import { motion } from "framer-motion";

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />

      {/* Header Section */}
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white text-gray-800 py-16"
      >
        <section className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
          <Image
            src="/backgroundImages/LeaglBackground.png"
            alt="Privacy Policy Background"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Dark overlay for readability */}
          <div className="absolute inset-0" />
          <div className="absolute inset-0 flex items-end md:items-center justify-center">
            <h1 className="text-4xl md:text-9xl font-bold text-white drop-shadow-lg">
              Privacy Policy
            </h1>
          </div>
        </section>

        {/* Main Content */}
        <main className="bg-white text-gray-800 py-16">
          <div className="container max-w-screen-lg mx-auto px-4 md:px-6 leading-relaxed">
            <section className="space-y-10">
              {/* Section 1 */}
              <div>
                <h2 className="text-2xl font-semibold">
                  1. Information We Collect
                </h2>

                <h3 className="mt-4 font-medium">a. Personal Information</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Full name</li>
                  <li>Email address</li>
                  <li>Phone number</li>
                  <li>Shipping & billing addresses</li>
                  <li>
                    Payment information (processed securely via third-party
                    gateways)
                  </li>
                </ul>

                <h3 className="mt-4 font-medium">b. Device & Usage Data</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>IP address</li>
                  <li>Browser and device type</li>
                  <li>Location (if permitted)</li>
                  <li>Time spent on pages and click activity</li>
                </ul>

                <h3 className="mt-4 font-medium">c. Air Quality App Data</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Device usage history</li>
                  <li>Air quality readings</li>
                  <li>Filter status</li>
                </ul>
              </div>

              {/* Section 2 */}
              <div>
                <h2 className="text-2xl font-semibold">
                  2. How We Use Your Data
                </h2>
                <ul className="list-disc list-inside space-y-1">
                  <li>Fulfill your orders and deliver products</li>
                  <li>Send important service-related updates</li>
                  <li>
                    Improve our website, products, and customer experience
                  </li>
                  <li>Analyze air quality trends (if app-integrated)</li>
                  <li>Provide customer support</li>
                  <li>Send marketing emails (only if you opt-in)</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </div>

              {/* Section 3 */}
              <div>
                <h2 className="text-2xl font-semibold">
                  3. How We Store & Protect Your Data
                </h2>
                <ul className="list-disc list-inside space-y-1">
                  <li>SSL encryption across our website</li>
                  <li>Secure servers hosted on reputable platforms</li>
                  <li>Access control and data minimization policies</li>
                  <li>
                    Payment data handled by certified third-party gateways
                    (e.g., Razorpay, Stripe)
                  </li>
                </ul>
              </div>

              {/* Section 4 */}
              <div>
                <h2 className="text-2xl font-semibold">4. Sharing Your Data</h2>
                <p className="mt-2">
                  We do not sell or rent your personal data. We may share your
                  data with:
                </p>
                <ul className="list-disc list-inside space-y-1 mt-2">
                  <li>Shipping and logistics partners</li>
                  <li>Payment processors</li>
                  <li>
                    Service providers (analytics, communication – bound by
                    confidentiality)
                  </li>
                  <li>Authorities, if legally required</li>
                </ul>
              </div>

              {/* Section 5 */}
              <div>
                <h2 className="text-2xl font-semibold">
                  5. Cookies & Tracking
                </h2>
                <ul className="list-disc list-inside space-y-1">
                  <li>Improve site performance</li>
                  <li>Understand browsing behavior</li>
                  <li>Personalize your shopping experience</li>
                </ul>
                <p className="mt-2">
                  You can manage cookie preferences through your browser
                  settings.
                </p>
              </div>

              {/* Section 6 */}
              <div>
                <h2 className="text-2xl font-semibold">6. Your Rights</h2>
                <ul className="list-disc list-inside space-y-1">
                  <li>Access the personal data we hold</li>
                  <li>Correct or delete your data</li>
                  <li>Withdraw consent</li>
                  <li>Object to processing</li>
                </ul>
                <p className="mt-2">
                  Email:{" "}
                  <a
                    href="mailto:privacy@get-bubl.com"
                    className="hover:underline"
                  >
                    privacy@get-bubl.com
                  </a>
                </p>
              </div>

              {/* Section 7 */}
              <div>
                <h2 className="text-2xl font-semibold">
                  7. Children&apos;s Privacy
                </h2>
                <p className="mt-2">
                  Not intended for children under 13 without supervision. No
                  knowingly collected data from minors without consent.
                </p>
              </div>

              {/* Section 8 */}
              <div>
                <h2 className="text-2xl font-semibold">
                  8. Updates to This Policy
                </h2>
                <p className="mt-2">
                  We may update this policy. Changes will be posted here with
                  the updated effective date.
                </p>
              </div>

              {/* Contact Info */}
              <div>
                <h2 className="text-2xl font-semibold">Questions?</h2>
                <p className="mt-2">
                  Email:{" "}
                  <a
                    href="mailto:privacy@get-bubl.com"
                    className="hover:underline"
                  >
                    privacy@get-bubl.com
                  </a>
                </p>
                <p>Address: bubl Technologies India Pvt. Ltd., New Delhi</p>
              </div>
            </section>
          </div>
        </main>
      </motion.main>
      <Footer />
    </>
  );
}
