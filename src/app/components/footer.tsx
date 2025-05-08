"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="h-[300px]"></div>;

  return (
    <footer className="bg-[#8ad3c3] text-white py-16 px-6 md:px-10 lg:px-16 relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Company Column */}
        <div>
          <h3 className="text-2xl font-semibold mb-6">Company</h3>
          <ul className="space-y-3">
            <li>
              <Link href="/about" className="hover:underline">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/endorsements" className="hover:underline">
                Endorsements
              </Link>
            </li>
            <li>
              <Link href="/partnerships" className="hover:underline">
                Partnerships
              </Link>
            </li>
          </ul>
        </div>

        {/* Shop Column */}
        <div>
          <h3 className="text-2xl font-semibold mb-6">
            <Link href="/shop" className="underline">
              Shop
            </Link>
          </h3>
          <ul className="space-y-3">
            <li>
              <Link href="/shop/buy" className="hover:underline">
                Buy babybubl
              </Link>
            </li>
            <li>
              <Link href="/shop/accessories" className="hover:underline">
                Accessories
              </Link>
            </li>
            <li>
              <Link href="/app" className="hover:underline">
                Bubl App
              </Link>
            </li>
            <li>
              <Link href="/shipping" className="hover:underline">
                Shipping & Returns
              </Link>
            </li>
          </ul>
        </div>

        {/* Support Column */}
        <div>
          <h3 className="text-2xl font-semibold mb-6">Support</h3>
          <ul className="space-y-3">
            <li>
              <Link href="/faqs" className="hover:underline">
                FAQs
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:underline">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal Column */}
        <div>
          <h3 className="text-2xl font-semibold mb-6">Legal</h3>
          <ul className="space-y-3">
            <li>
              <Link href="/terms" className="hover:underline">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:underline">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/cookies" className="hover:underline">
                Cookie Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Logo in bottom right */}
      <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12">
        <Link
          href="/"
          className="flex items-center hover:opacity-80 scale-75 md:scale-100 transition-opacity duration-200"
        >
          <Image
            src="/logo/bublLogo.png"
            alt="Bubl Logo"
            width={100}
            height={100}
          />
        </Link>
      </div>
    </footer>
  );
}
