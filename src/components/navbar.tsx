"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  ShoppingBag,
  Menu,
  X,
  ChevronRight,
  ChevronDown,
  Minus,
  Plus,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/lib/store";
import type { CartItem } from "@/lib/types";

export default function Navbar() {
  const { items, updateQuantity, removeItem } = useCartStore();
  const [isOpen, setIsOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [productDropdownOpen, setProductDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isHoveringTop, setIsHoveringTop] = useState(false);
  const [mounted, setMounted] = useState(false);
  const productRef = useRef<HTMLLIElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();

  const navBackground = useTransform(
    scrollY,
    [0, 100],
    ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.95)"]
  );
  const navHeight = useTransform(scrollY, [0, 100], ["8rem", "4.5rem"]);
  const navWidth = useTransform(scrollY, [0, 100], ["100%", "50%"]);
  const logoScale = useTransform(scrollY, [0, 100], [1, 0.85]);

  // Fix hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Determine if scrolled past threshold
      setScrolled(currentScrollY > 20);

      // Hide navbar when scrolling down, show when scrolling up
      if (
        currentScrollY > lastScrollY &&
        currentScrollY > 100 &&
        !isHoveringTop
      ) {
        setNavVisible(false);
      } else {
        setNavVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isHoveringTop]);

  // Handle hover at top of page
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientY < 50) {
        setIsHoveringTop(true);
        setNavVisible(true);
      } else {
        setIsHoveringTop(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        productRef.current &&
        !productRef.current.contains(event.target as Node)
      ) {
        setProductDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/product-babybubl", hasDropdown: true },
    { name: "About", path: "/about-bubl" },
  ];

  const productCategories = [
    {
      title: "Baby Bubl",
      description: "Explore our latest premium releases",
      path: "/product-babybubl",
      imagePath: "/backgroundImages/productPage/productLandingPageOverlay.png",
    },
    {
      title: "Accessories",
      description: "Our most popular premium items",
      path: "/bubl-accessories",
      imagePath: "/backgroundImages/accessories/HepaFilters.png",
    },
    {
      title: "Bubl App",
      description: "Exclusive designs with limited availability",
      path: "/bubl-app",
      imagePath: "/backgroundImages/bublApp.png",
    },
  ];

  // Calculate cart totals
  const cartCount = mounted
    ? items.reduce((count, item) => count + item.quantity, 0)
    : 0;
  const totalPrice = mounted
    ? items.reduce((total, item) => total + item.price * item.quantity, 0)
    : 0;

  // Handle quantity updates
  const handleQuantityChange = (item: CartItem, change: number) => {
    const newQuantity = item.quantity + change;
    if (newQuantity <= 0) {
      removeItem(item.id);
    } else {
      updateQuantity(item.id, newQuantity);
    }
  };

  // Text color class based on scroll position
  const textColorClass = scrolled ? "text-neutral-700" : "text-white";

  return (
    <>
      <motion.header
        ref={navRef}
        style={{
          height: navHeight,
          backgroundColor: navBackground,
          width: navWidth,
          left: "50%",
          x: "-50%",
          opacity: navVisible ? 1 : 0,
          pointerEvents: navVisible ? "auto" : "none",
        }}
        className={cn(
          "fixed top-0 z-50 flex items-center justify-between rounded-b-2xl px-6 backdrop-blur-md transition-all duration-300 md:px-12",
          scrolled ? "border-b border-neutral-200/50 shadow-sm" : ""
        )}
      >
        <div className="flex w-full items-center justify-between">
          {/* Logo */}
          <motion.div style={{ scale: logoScale }} className="relative z-10">
            <Link href="/" className="flex items-center">
              <motion.div
                className="relative flex h-22 w-22 items-center justify-center overflow-hidden rounded-full"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 15px rgba(0,0,0,0.1)",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <AnimatePresence mode="wait">
                  {scrolled ? (
                    <motion.div
                      key="scrolled-logo"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3 }}
                      className="h-full w-full"
                    >
                      <Image
                        src="/logo/bublgreen.png"
                        alt="Green Bubl Logo"
                        width={100}
                        height={100}
                        className="h-full w-full object-contain"
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="default-logo"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3 }}
                      className="h-full w-full"
                    >
                      <Image
                        src="/logo/bubllogo.png"
                        alt="Bubl Logo"
                        width={100}
                        height={100}
                        className="h-full w-full object-contain"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <nav className="flex items-center justify-center">
              <ul className="flex space-x-10">
                {navItems.map((item, index) => (
                  <motion.li
                    key={item.name}
                    ref={item.name === "Products" ? productRef : null}
                    className="relative px-2 text-2xl"
                    onMouseEnter={() => {
                      setActiveIndex(index);
                      if (item.hasDropdown) {
                        setProductDropdownOpen(true);
                      }
                    }}
                    onMouseLeave={() => {
                      setActiveIndex(null);
                      setProductDropdownOpen(false);
                    }}
                  >
                    <Link
                      href={item.path}
                      className={cn(
                        "group relative flex items-center py-2 px-4 text-lg font-medium transition-colors",
                        textColorClass
                      )}
                    >
                      {activeIndex === index && (
                        <motion.div
                          layoutId="navHighlight"
                          className={cn(
                            "absolute inset-0 rounded-full",
                            scrolled ? "bg-black/5" : "bg-white/10"
                          )}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{
                            type: "spring",
                            bounce: 0.2,
                            duration: 0.6,
                          }}
                        />
                      )}
                      <motion.span
                        className="relative z-10"
                        whileHover={{ y: -2 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {item.name}
                      </motion.span>
                      {item.hasDropdown && (
                        <motion.span
                          className="ml-1 opacity-70"
                          animate={{ rotate: productDropdownOpen ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown className="h-3 w-3" />
                        </motion.span>
                      )}
                    </Link>

                    {/* Products Dropdown */}
                    {item.hasDropdown && (
                      <AnimatePresence>
                        {productDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{
                              type: "spring",
                              stiffness: 400,
                              damping: 25,
                            }}
                            className="absolute left-0 top-full z-50 mt-1 w-[500px] overflow-hidden rounded-2xl bg-white p-6 shadow-xl"
                            onMouseEnter={() => setProductDropdownOpen(true)}
                            onMouseLeave={() => setProductDropdownOpen(false)}
                          >
                            <div className="grid grid-cols-1 gap-4">
                              {productCategories.map((category, idx) => (
                                <motion.div
                                  key={category.title}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: idx * 0.1 }}
                                  whileHover={{ x: 5 }}
                                >
                                  <Link
                                    href={category.path}
                                    className="mt-1 text-sm text-neutral-500 hover:text-black"
                                  >
                                    <div className="group flex items-start gap-4 rounded-xl p-3 transition-colors hover:bg-neutral-50">
                                      <div className="relative h-16 w-16 overflow-hidden rounded-lg">
                                        <Image
                                          src={
                                            category.imagePath ||
                                            "/placeholder.svg" ||
                                            "/placeholder.svg"
                                          }
                                          alt={category.title}
                                          fill
                                          className="object-cover"
                                        />
                                        <motion.div
                                          className="absolute inset-0 bg-white/20"
                                          initial={{ opacity: 0 }}
                                          whileHover={{ opacity: 1 }}
                                          transition={{ duration: 0.3 }}
                                        />
                                      </div>
                                      <div>
                                        <h3 className="flex items-center font-medium text-neutral-900 group-hover:text-black">
                                          {category.title}
                                        </h3>

                                        {category.description}
                                        <motion.span
                                          initial={{ opacity: 0, x: -5 }}
                                          whileHover={{ opacity: 1, x: 0 }}
                                          transition={{ duration: 0.2 }}
                                          className="ml-1 inline-block"
                                        >
                                          <ChevronRight className="h-3 w-3" />
                                        </motion.span>
                                      </div>
                                    </div>
                                  </Link>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </motion.li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-1">
            <motion.button
              whileHover={{
                scale: 1.1,
                backgroundColor: scrolled
                  ? "#f3f3f3"
                  : "rgba(255, 255, 255, 0.1)",
              }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "relative flex h-8 w-8 items-center justify-center rounded-full transition-colors",
                scrolled
                  ? "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                  : "bg-white/10 text-white hover:bg-white/20"
              )}
              onClick={() => setCartOpen(!cartOpen)}
            >
              <ShoppingBag className="h-10 w-10" />
              {cartCount > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className={cn(
                    "absolute -right-1 -top-1 flex h-14 w-14 items-center justify-center rounded-full text-xs font-medium",
                    scrolled
                      ? "bg-[#7FDAC0] text-white"
                      : "bg-[#7FDAC0] text-white"
                  )}
                >
                  {cartCount > 99 ? "99+" : cartCount}
                </motion.div>
              )}
              <motion.span
                className={cn(
                  "absolute -inset-1 rounded-full border-2",
                  scrolled ? "border-neutral-200" : "border-white/30"
                )}
                initial={{ opacity: 0, scale: 0.8 }}
                whileHover={{ opacity: 1.2, scale: 1.5 }}
                transition={{ duration: 0.2 }}
              />
            </motion.button>

            <motion.button
              whileHover={{
                scale: 1.1,
                backgroundColor: scrolled
                  ? "#f3f3f3"
                  : "rgba(255, 255, 255, 0.1)",
              }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "relative flex h-12 w-12 items-center justify-center rounded-full transition-colors lg:hidden",
                scrolled
                  ? "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                  : "bg-white/10 text-white hover:bg-white/20"
              )}
              onClick={() => setIsOpen(!isOpen)}
            >
              <Menu className="h-4 w-4" />
              <motion.span
                className={cn(
                  "absolute -inset-1 rounded-full border-2",
                  scrolled ? "border-neutral-200" : "border-white/30"
                )}
                initial={{ opacity: 0, scale: 0.8 }}
                whileHover={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
              />
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Cart Slide Panel */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black"
              onClick={() => setCartOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 z-50 h-full w-full max-w-md overflow-auto bg-white p-8 shadow-2xl"
            >
              <div className="flex h-full flex-col">
                <div className="mb-8 flex items-center justify-between">
                  <motion.h2
                    className="text-2xl font-medium"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    Your Cart
                  </motion.h2>
                  <motion.button
                    whileHover={{ scale: 1.05, rotate: 90 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100"
                    onClick={() => setCartOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </motion.button>
                </div>

                <div className="flex-1">
                  {items.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex h-40 flex-col items-center justify-center rounded-2xl bg-neutral-50 p-6 text-center"
                    >
                      <ShoppingBag className="mb-4 h-8 w-8 text-neutral-400" />
                      <p className="text-neutral-500">Your cart is empty</p>
                      <Link
                        href="/"
                        className="mt-4 text-sm text-[#7FDAC0] hover:underline"
                      >
                        Continue shopping
                      </Link>
                    </motion.div>
                  ) : (
                    items.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="group mb-6 overflow-hidden rounded-2xl bg-neutral-50 p-4 transition-all duration-300 hover:bg-neutral-100"
                      >
                        <div className="flex items-center gap-4">
                          <motion.div
                            className="relative h-20 w-20 overflow-hidden rounded-xl bg-neutral-200"
                            whileHover={{ scale: 1.05 }}
                            transition={{
                              type: "spring",
                              stiffness: 400,
                              damping: 10,
                            }}
                          >
                            {item.image ? (
                              <Image
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="absolute inset-0 bg-gradient-to-br from-neutral-100 to-neutral-300" />
                            )}
                          </motion.div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium">{item.name}</h3>
                              <p className="font-medium">
                                INR {item.price.toFixed(2)}
                              </p>
                            </div>
                            <div className="mt-2 flex items-center justify-between">
                              <div className="flex items-center rounded-full bg-white px-2 py-1">
                                <button
                                  className="flex h-6 w-6 items-center justify-center rounded-full text-neutral-500 hover:bg-neutral-100"
                                  onClick={() => handleQuantityChange(item, -1)}
                                >
                                  <Minus className="h-3 w-3" />
                                </button>
                                <span className="mx-2 min-w-[20px] text-center text-sm">
                                  {item.quantity}
                                </span>
                                <button
                                  className="flex h-6 w-6 items-center justify-center rounded-full text-neutral-500 hover:bg-neutral-100"
                                  onClick={() => handleQuantityChange(item, 1)}
                                >
                                  <Plus className="h-3 w-3" />
                                </button>
                              </div>
                              <button
                                className="text-sm text-neutral-500 hover:text-black"
                                onClick={() => removeItem(item.id)}
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>

                {items.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-auto"
                  >
                    <div className="mb-4 flex items-center justify-between border-t border-neutral-200 pt-4">
                      <span className="text-lg font-medium">Total</span>
                      <span className="text-lg font-medium">
                        INR {totalPrice.toFixed(2)}
                      </span>
                    </div>

                    <Link href="/bubl-cart">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="group relative flex w-full items-center justify-center overflow-hidden rounded-full bg-[#7FDAC0] py-4 text-white"
                        onClick={() => setCartOpen(false)}
                      >
                        <motion.span
                          initial={{ x: "-100%" }}
                          whileHover={{ x: "100%" }}
                          transition={{ duration: 1 }}
                          className="absolute inset-0 bg-gradient-to-r from-[#7FDAC0]/0 via-[#6bc9af]/50 to-[#7FDAC0]/0"
                        />
                        <span className="relative flex items-center">
                          View Cart
                          <ChevronRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                      </motion.button>
                    </Link>

                    <Link href="/bubl-checkout">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="group relative mt-3 flex w-full items-center justify-center overflow-hidden rounded-full bg-black py-4 text-white"
                        onClick={() => setCartOpen(false)}
                      >
                        <motion.span
                          initial={{ x: "-100%" }}
                          whileHover={{ x: "100%" }}
                          transition={{ duration: 1 }}
                          className="absolute inset-0 bg-gradient-to-r from-neutral-800/0 via-neutral-700/50 to-neutral-800/0"
                        />
                        <span className="relative flex items-center">
                          Checkout
                          <ChevronRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                      </motion.button>
                    </Link>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{
              opacity: 0,
              clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)",
            }}
            animate={{
              opacity: 1,
              clipPath: "circle(150% at calc(100% - 2.5rem) 2.5rem)",
            }}
            exit={{
              opacity: 0,
              clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)",
            }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 flex flex-col bg-white pt-24"
          >
            <div className="container flex-1 px-8">
              <div className="absolute right-6 top-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-4 w-4" />
                </motion.button>
              </div>

              <nav className="mt-8">
                <ul className="space-y-6">
                  {navItems.map((item, index) => (
                    <motion.li
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + index * 0.1 }}
                      className="border-b border-neutral-100 pb-4"
                    >
                      {item.hasDropdown ? (
                        <div>
                          <button
                            onClick={() =>
                              setProductDropdownOpen(!productDropdownOpen)
                            }
                            className="group flex w-full items-center justify-between text-2xl font-medium text-neutral-800"
                          >
                            <span>{item.name}</span>
                            <motion.span
                              animate={{
                                rotate: productDropdownOpen ? 180 : 0,
                              }}
                              transition={{ duration: 0.3 }}
                            >
                              <ChevronDown className="h-5 w-5" />
                            </motion.span>
                          </button>
                          <AnimatePresence>
                            {productDropdownOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <ul className="mt-4 space-y-3 pl-4">
                                  {productCategories.map((category, idx) => (
                                    <motion.li
                                      key={category.title}
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: 0.1 + idx * 0.1 }}
                                    >
                                      <div className="flex flex-col">
                                        <div className="flex items-center gap-3 text-lg text-neutral-600">
                                          <div className="relative h-8 w-8 overflow-hidden rounded-md">
                                            <Image
                                              src={
                                                category.imagePath ||
                                                "/placeholder.svg" ||
                                                "/placeholder.svg"
                                              }
                                              alt={category.title}
                                              fill
                                              className="object-cover"
                                            />
                                          </div>
                                          <span>{category.title}</span>
                                        </div>
                                        <Link
                                          href={category.path}
                                          className="ml-11 mt-1 text-sm text-neutral-500 hover:text-black"
                                          onClick={() => setIsOpen(false)}
                                        >
                                          {category.description}
                                        </Link>
                                      </div>
                                    </motion.li>
                                  ))}
                                </ul>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <Link
                          href={item.path}
                          className="group flex items-center text-2xl font-medium text-neutral-800"
                          onClick={() => setIsOpen(false)}
                        >
                          <span className="relative">
                            {item.name}
                            <motion.span
                              className="absolute bottom-0 left-0 h-[2px] w-0 bg-current"
                              whileHover={{ width: "100%" }}
                              transition={{ duration: 0.3 }}
                            />
                          </span>
                          <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            whileHover={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2 }}
                            className="ml-2"
                          >
                            <ChevronRight className="h-5 w-5" />
                          </motion.span>
                        </Link>
                      )}
                    </motion.li>
                  ))}
                </ul>
              </nav>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-auto border-t border-neutral-100 bg-neutral-50 p-8"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral-500">Need help?</p>
                  <p className="text-lg font-medium">Contact Us</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-white"
                >
                  <ChevronRight className="h-5 w-5" />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
