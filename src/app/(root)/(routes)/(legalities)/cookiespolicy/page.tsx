// app/cookies/page.tsx
"use client";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Image from "next/image";
import { motion } from "framer-motion";

export default function CookiePolicyPage() {
  return (
    <>
      <Navbar />

      {/* Header Section */}
      <section className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
        <Image
          src="/backgroundImages/LeaglBackground.png"
          alt="Cookie Policy Background"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 " />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-9xl font-semibold text-white drop-shadow-lg">
            Cookie Policy
          </h1>
        </div>
      </section>

      {/* Main Content with fade-in */}
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white text-gray-800 py-16"
      >
        <div className="container max-w-screen-lg mx-auto px-4 md:px-6 space-y-12">
          {/* Section 1: What Are Cookies? */}
          <section className="bg-gray-50 rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-semibold  border-b-4 border-indigo-200 inline-block pb-1">
              1. What Are Cookies?
            </h2>
            <p className="mt-6 leading-relaxed">
              Cookies are small text files stored on your device when you visit
              a website. They help us remember your preferences, keep you logged
              in, and understand how you interact with our site.
            </p>
          </section>

          {/* Section 2: Types of Cookies We Use */}
          <section className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-semibold  border-b-4 border-indigo-200 inline-block pb-1">
              2. Types of Cookies We Use
            </h2>

            <div className="mt-6 space-y-8 leading-relaxed">
              <div>
                <h3 className="text-lg font-medium text-gray-700">
                  a. Essential Cookies
                </h3>
                <p className="mt-2">
                  These are necessary for the site to function correctly. They
                  help with navigation, cart functionality, secure checkout, and
                  login.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-700">
                  b. Performance &amp; Analytics Cookies
                </h3>
                <p className="mt-2">
                  These help us understand how visitors use our website—what
                  works, what doesn’t, and how we can improve. Example: Google
                  Analytics.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-700">
                  c. Functionality Cookies
                </h3>
                <p className="mt-2">
                  They remember your preferences (like location or language) to
                  enhance your experience.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-700">
                  d. Marketing &amp; Advertising Cookies
                </h3>
                <p className="mt-2">
                  These track your activity to show you relevant ads on other
                  platforms (only if you opt-in). Example: Meta Pixel, Google
                  Ads.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Third-Party Cookies */}
          <section className="bg-gray-50 rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-semibold  border-b-4 border-indigo-200 inline-block pb-1">
              3. Third-Party Cookies
            </h2>
            <p className="mt-6 leading-relaxed">
              Some cookies are set by third-party services we use—for payments,
              analytics, or customer support. These third parties have their own
              privacy policies.
            </p>
          </section>

          {/* Section 4: How to Control Cookies */}
          <section className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-semibold  border-b-4 border-indigo-200 inline-block pb-1">
              4. How to Control Cookies
            </h2>
            <ul className="list-disc list-inside mt-6 space-y-1 leading-relaxed">
              <li>Browser Settings – Block or delete cookies anytime.</li>
              <li>
                Cookie Banner Preferences – Choose what you accept when you
                visit our site.
              </li>
            </ul>
            <p className="mt-4 leading-relaxed">
              Note: Disabling certain cookies may affect site functionality.
            </p>
          </section>

          {/* Section 5: Updates to This Policy */}
          <section className="bg-gray-50 rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-semibold  border-b-4 border-indigo-200 inline-block pb-1">
              5. Updates to This Policy
            </h2>
            <p className="mt-6 leading-relaxed">
              We may update this Cookie Policy to reflect changes in technology
              or legal requirements. All updates will be posted here with the
              revised date.
            </p>
          </section>

          {/* Section 6: Questions */}
          <section className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-semibold  border-b-4 border-indigo-200 inline-block pb-1">
              6. Questions?
            </h2>
            <div className="mt-6 space-y-2 leading-relaxed">
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
      </motion.main>

      <Footer />
    </>
  );
}
