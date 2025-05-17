"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import CartIcon from "./cart-icon";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [productDropdownOpen, setProductDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const isHomePage = pathname === "/";

  // Track scroll direction and position
  useMotionValueEvent(scrollY, "change", (latest) => {
    // Determine if we've scrolled past the threshold for background change
    setIsScrolled(latest > 50);

    // Determine scroll direction for hiding/showing navbar
    const direction = latest > lastScrollY ? "down" : "up";

    // Only hide navbar when scrolling down and past the threshold
    if (direction === "down" && latest > 100 && isVisible) {
      setIsVisible(false);
    } else if (direction === "up" && !isVisible) {
      setIsVisible(true);
    }

    setLastScrollY(latest);
  });

  // Close mobile menu when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const productLinks = [
    { name: "BabyBubl", href: "/product-babybubl" },
    { name: "Filters & Controllers", href: "/accessories" },
    { name: "Bubl App", href: "/bub-app" },
  ];

  // Determine navbar background and text colors based on scroll and page
  const navbarBg = !isScrolled ? "bg-transparent" : "bg-[#8ad3c3]"; // Default mint green

  const textColor = isHomePage && !isScrolled ? "text-[#1a7d6b]" : "text-white";

  return (
    <motion.nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-3 md:py-4 transition-all duration-500 ${navbarBg} ${textColor}`}
      initial={{ y: 0 }}
      animate={{
        y: isVisible ? 0 : -100,
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
    >
      {/* 
        SPACING NOTE: To increase the horizontal spacing between all elements,
        you can adjust the padding in the container below (px-4 md:px-8)
        or add more margin to the max-w-7xl container
      */}
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center hover:opacity-80 scale-75 md:scale-100 transition-all duration-300"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Image
              src={"/logo/bublLogo.png"}
              alt="Bubl Logo"
              width={100}
              height={100}
              priority
            />
          </motion.div>
        </Link>

        {/* 
          SPACING NOTE: To increase spacing between nav links,
          adjust the space-x-8 class below to a higher value (e.g., space-x-12)
        */}
        <div className="hidden md:flex space-x-12 justify-between">
          <NavLink
            href="/about"
            active={pathname === "/about"}
            isHomePage={isHomePage}
            isScrolled={isScrolled}
          >
            ABOUT US
          </NavLink>

          {/* Product dropdown - now using hover instead of click */}
          <div
            className="relative"
            onMouseEnter={() => setProductDropdownOpen(true)}
            onMouseLeave={() => setProductDropdownOpen(false)}
          >
            <NavLink
              href="#"
              active={pathname?.includes("/product")}
              isHomePage={isHomePage}
              isScrolled={isScrolled}
              isDropdown
            >
              <span className="flex items-center">
                PRODUCT
                <ChevronDown
                  className={`ml-1 h-4 w-4 transition-transform duration-300 ${
                    productDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </span>
            </NavLink>

            <AnimatePresence>
              {productDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 mt-1 bg-white text-[#1a7d6b] rounded-md shadow-lg overflow-hidden w-48 z-50"
                >
                  {/* 
                    SPACING NOTE: To increase spacing between dropdown items,
                    adjust the py-3 class below to a higher value (e.g., py-4)
                  */}
                  {productLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block px-4 py-3 hover:bg-[#8ad3c3]/10 transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <NavLink
            href="/science"
            active={pathname === "/science"}
            isHomePage={isHomePage}
            isScrolled={isScrolled}
          >
            SCIENCE BEHIND
          </NavLink>
        </div>

        {/* 
          SPACING NOTE: To increase spacing between right-side icons,
          adjust the space-x-6 class below to a higher value (e.g., space-x-8)
        */}
        <div className="flex items-center space-x-8">
          {/* Cart Icon Component */}
          <CartIcon />

          <motion.button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            className="md:hidden focus:outline-none"
            whileHover={{ scale: 1.1, y: -3 }}
            whileTap={{ scale: 0.9 }}
          >
            {menuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden"
          >
            {/* 
              SPACING NOTE: To increase spacing between mobile menu items,
              adjust the space-y-6 class below to a higher value (e.g., space-y-8)
            */}
            <div
              className={`flex flex-col items-center py-6 space-y-8 ${
                isScrolled ? "bg-[#8ad3c3]" : " bg-none"
              } text-white`}
            >
              <MobileNavLink href="/about">About Us</MobileNavLink>

              {/* Mobile Product Dropdown */}
              <div className="w-full flex flex-col items-center">
                <button
                  onClick={() => setProductDropdownOpen(!productDropdownOpen)}
                  className="flex items-center justify-center space-x-2 text-xl font-medium w-full py-2"
                >
                  <span>Product</span>
                  <ChevronDown
                    className={`h-5 w-5 transition-transform duration-300 ${
                      productDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {productDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="w-full flex flex-col items-center bg-white/10 rounded-md mt-2 py-2"
                    >
                      {/* 
                        SPACING NOTE: To increase spacing between mobile dropdown items,
                        adjust the py-3 class below to a higher value (e.g., py-4)
                      */}
                      {productLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="w-full text-center py-4 text-lg hover:bg-white/10 transition-colors duration-200"
                        >
                          {link.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <MobileNavLink href="/science">Science Behind</MobileNavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

// Desktop Nav Link with individual dot indicator and hover animation
function NavLink({
  href,
  children,
  isScrolled,

  isDropdown = false,
}: {
  href: string;
  active?: boolean;
  children: React.ReactNode;
  isHomePage: boolean;
  isScrolled: boolean;
  onClick?: () => void;
  isDropdown?: boolean;
}) {
  const [isLinkHovered, setIsLinkHovered] = useState(false);
  const linkColor = !isScrolled
    ? "text-white hover:text-gray-300"
    : "text-[#58CDAF]] hover:text-white";

  return (
    <motion.div
      className="relative"
      onMouseEnter={() => setIsLinkHovered(true)}
      onMouseLeave={() => setIsLinkHovered(false)}
      animate={{ y: isLinkHovered ? -3 : 0 }}
      transition={{ duration: 0.2 }}
    >
      {isDropdown ? (
        <button
          className={`nav-link font-medium tracking-wide transition-all duration-300 ${linkColor}`}
        >
          {children}
        </button>
      ) : (
        <Link
          href={href}
          className={`nav-link font-medium tracking-wide transition-all duration-300 ${linkColor}`}
        >
          {children}
        </Link>
      )}

      {/* Dot indicator for individual nav link */}
      <AnimatePresence>
        {isLinkHovered && (
          <motion.div
            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-current"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Mobile Nav Link with individual dot indicator and hover animation
function MobileNavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const [isLinkHovered, setIsLinkHovered] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -3 }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => setIsLinkHovered(true)}
      onHoverEnd={() => setIsLinkHovered(false)}
      className="relative"
    >
      <Link href={href} className="text-xl font-medium block py-2">
        {children}
      </Link>

      {/* Dot indicator for mobile nav link */}
      <AnimatePresence>
        {isLinkHovered && (
          <motion.div
            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
