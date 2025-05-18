// app/terms/page.tsx
"use client";

import Image from "next/image";
// import Navbar from "@/components/Navbar";

export default function TermsPage() {
  return (
    <>
      {/* <Navbar /> */}

      {/* Header with background image */}
      <section className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
        <Image
          src="/images/terms-bg.jpg"
          alt="Terms & Conditions Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white">
            Terms &amp; Conditions
          </h1>
        </div>
      </section>

      {/* Main content */}
      <main className="bg-white">
        <div className="prose prose-lg lg:prose-xl max-w-3xl mx-auto px-4 py-12 text-gray-800">
          <p>
            <strong>Effective as of [Insert Date]</strong>
            <br />
            Welcome to Bubl. operated by Bubl Technologies India Private
            Limited.
            <br />
            By accessing or using our Website, products, or services, you agree
            to be bound by these Terms &amp; Conditions.
          </p>

          <h2 className=" font-medium">1. Eligibility</h2>
          <p>
            By using this site, you confirm that you are at least 18 years old
            or accessing the site under the supervision of a parent or legal
            guardian.
          </p>

          <h2 className=" font-medium">2. Product Information</h2>
          <p>We strive for accuracy, but:</p>
          <ul>
            <li>
              Product descriptions, images, and pricing are subject to change
              without notice.
            </li>
            <li>
              Colors and visuals may vary slightly depending on your screen
              settings.
            </li>
            <li>Availability is not guaranteed.</li>
          </ul>

          <h2 className=" font-medium">3. Orders &amp; Payments</h2>
          <ul>
            <li>
              All purchases made through the Website are subject to availability
              and acceptance.
            </li>
            <li>
              We reserve the right to cancel or refuse any order at our
              discretion.
            </li>
            <li>
              Prices are inclusive/exclusive of applicable taxes (as indicated).
            </li>
            <li>Payment must be made via our approved payment gateways.</li>
          </ul>

          <h2 className=" font-medium">4. Shipping &amp; Delivery</h2>
          <ul>
            <li>Estimated delivery timelines are provided during checkout.</li>
            <li>
              Delays due to unforeseen circumstances (e.g. weather, customs,
              strikes) are not our responsibility.
            </li>
            <li>
              Shipping policies may differ for urban vs. rural areas—please
              refer to our{" "}
              <a
                href="/shipping-policy"
                className="text-blue-600 hover:underline"
              >
                Shipping Policy
              </a>
              .
            </li>
          </ul>

          <h2 className=" font-medium">5. Returns &amp; Refunds</h2>
          <ul>
            <li>
              You may return eligible items within 3 days of delivery in unused,
              original condition.
            </li>
            <li>
              Certain items like used filters may not be returnable due to
              hygiene reasons.
            </li>
            <li>
              Refunds will be processed to the original payment method after
              quality checks.
            </li>
          </ul>

          <h2 className=" font-medium">6. Warranty &amp; Repairs</h2>
          <ul>
            <li>
              Babybubl devices come with a standard 12‑month limited warranty
              against manufacturing defects.
            </li>
            <li>
              The warranty does not cover misuse, water damage, or unauthorized
              repairs.
            </li>
            <li>Proof of purchase is required to claim warranty services.</li>
          </ul>

          <h2 className=" font-medium">7. Intellectual Property</h2>
          <p>
            All content on this site—including text, graphics, images, logos,
            and software—is the property of Bubl or its licensors and protected
            under copyright, trademark, and other laws. You may not reuse or
            reproduce content without prior written permission.
          </p>

          <h2 className=" font-medium">8. User Conduct</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Use the site for fraudulent or unlawful activities</li>
            <li>Interfere with the site&#39;s functioning</li>
            <li>Upload harmful or offensive material</li>
          </ul>

          <h2 className=" font-medium">9. Limitation of Liability</h2>
          <p>
            We are not liable for any indirect, incidental, or consequential
            damages arising from your use of our site or products. Your use of
            Babybubl is at your sole risk, and we do not guarantee it will
            prevent medical issues related to air quality.
          </p>

          <h2 className=" font-medium">10. Privacy</h2>
          <p>
            Your use of the site is subject to our{" "}
            <a href="/privacy" className="text-blue-600 hover:underline">
              Privacy Policy
            </a>
            , which governs how we collect, store, and protect your data.
          </p>

          <h2 className=" font-medium">11. Governing Law</h2>
          <p>
            These terms are governed by the laws of India. Any disputes will be
            subject to the jurisdiction of the courts located in New Delhi.
          </p>

          <h2 className=" font-medium">12. Updates to Terms</h2>
          <p>
            We may revise these Terms &amp; Conditions at any time. Changes will
            be posted on this page with the updated date.
          </p>

          <h2 className=" font-medium">Have Questions?</h2>
          <p>
            Please reach out to us at:
            <br />
            <a
              href="mailto:support@get-bubl.com"
              className="text-blue-600 hover:underline"
            >
              support@get-bubl.com
            </a>{" "}
            or{" "}
            <a
              href="mailto:info.apac@get-bubl.com"
              className="text-blue-600 hover:underline"
            >
              info.apac@get-bubl.com
            </a>
            <br />
            Bubl Technologies India Pvt. Ltd., New Delhi
          </p>
        </div>
      </main>
    </>
  );
}
