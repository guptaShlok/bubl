"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, User, Menu } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar-main">
      {/* Logo */}
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

      {/* Desktop Links */}
      <div className="hidden md:flex space-x-8 justify-between w-1/3">
        <Link href="/about" className="nav-link">
          ABOUT US
        </Link>
        <Link href="/product-bubl" className="nav-link">
          PRODUCT
        </Link>
        <Link href="/science" className="nav-link">
          SCIENCE BEHIND
        </Link>
      </div>

      {/* Right Icons & Hamburger */}
      <div className="flex items-center space-x-6">
        <Link
          href="/cart"
          aria-label="View cart"
          className="h-6 w-6 md:h-8 md:w-8 transition-colors duration-200 hover:text-gray-200"
        >
          <ShoppingCart className="h-full w-full" />
        </Link>
        <Link
          href="/account"
          aria-label="User account"
          className="h-6 w-6 md:h-8 md:w-8 transition-colors duration-200 hover:text-gray-200"
        >
          <User className="h-full w-full" />
        </Link>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          className="md:hidden focus:outline-none transition-transform duration-300 ease-in-out"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu">
          <Link href="/about" className="nav-link">
            About Us
          </Link>
          <Link href="/product" className="nav-link">
            Product
          </Link>
          <Link href="/science" className="nav-link">
            Science Behind
          </Link>
        </div>
      )}
    </nav>
  );
}
