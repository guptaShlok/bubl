"use client";

import Link from "next/link";
import { Instagram, Facebook, Youtube, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="vertical-gradient-background-1 text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Column */}
          <div>
            <h3 className="text-2xl font-medium mb-6">Company</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/about-bubl" className="hover:underline">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/#endorsements" className="hover:underline">
                  Endorsements
                </Link>
              </li>
              <li>
                <Link
                  href="/about-bubl/#partnership"
                  className="hover:underline"
                >
                  Partnerships
                </Link>
              </li>
            </ul>
          </div>

          {/* Shop Column */}
          <div>
            <h3 className="text-2xl font-medium mb-6">Shop</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/product-babybubl" className="hover:underline">
                  Buy babybubl
                </Link>
              </li>
              <li>
                <Link href="/bubl-accessories" className="hover:underline">
                  Accessories
                </Link>
              </li>
              <li>
                <Link href="/bubl-app" className="hover:underline">
                  Bubl App
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h3 className="text-2xl font-medium mb-6">Legal</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/terms&conditions" className="hover:underline">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacypolicy" className="hover:underline">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/cookiespolicy" className="hover:underline">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-2xl font-medium mb-6">Contact</h3>
            <ul className="space-y-4 mb-6">
              <li>
                <a
                  href="mailto:info.apac@get-bubl.com"
                  className="hover:underline"
                >
                  info.apac@get-bubl.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+919810654379"
                  className="hover:underline -mb-4 text-sm"
                >
                  +91-9810654379
                </a>
              </li>
              <li>
                <a
                  href="tel:+919810654379"
                  className="hover:underline text-sm "
                >
                  +91-9322597664
                </a>
              </li>
            </ul>
            <div className="flex space-x-6">
              <a
                href="https://www.instagram.com/get_bubl.in/"
                aria-label="Instagram"
                className="hover:opacity-80"
              >
                <Instagram size={24} />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61574574764797"
                aria-label="Facebook"
                className="hover:opacity-80"
              >
                <Facebook size={24} />
              </a>
              <a
                href="https://www.youtube.com/@bubl.5452"
                aria-label="YouTube"
                className="hover:opacity-80"
              >
                <Youtube size={24} />
              </a>
              <a
                href="https://www.linkedin.com/company/getbubl/"
                aria-label="LinkedIn"
                className="hover:opacity-80"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="https://twitter.com"
                aria-label="Twitter"
                className="hover:opacity-80"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.2833 10.1224L23.2178 0H21.1006L13.3427 8.81952L7.14656 0H0L9.36984 13.3264L0 24H2.11732L10.3098 14.6288L16.8534 24H24L14.2827 10.1224H14.2833ZM11.3833 13.4536L10.4339 12.1085L2.88022 1.55426H6.1323L12.2282 10.0909L13.1776 11.436L21.1012 22.5477H17.8491L11.3833 13.4542V13.4536Z"
                    fill="currentColor"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Logo */}
        <div className="flex justify-end mt-12">
          <Link
            className="relative w-24 h-24 border-2 border-white rounded-full flex items-center justify-center"
            href="/"
          >
            <span className="text-2xl font-light">bubl.</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
