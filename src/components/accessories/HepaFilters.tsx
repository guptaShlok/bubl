"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/lib/store";
import { toast } from "sonner";
import ImageOverlay from "../ImageOverlay";
import MediaCarousel, { MediaItem } from "../MediaCarousel";

export default function HepaFiltersPage() {
  const router = useRouter();
  const { addItem } = useCartStore();

  // Define the HEPA filter product
  const hepaFilterProduct = {
    id: "hepa-filter-1",
    name: "HEPA Filter Replacement",
    description: "High-efficiency particulate air filter for Bubl purifiers",
    price: 4999,
    image: "/backgroundImages/accessories/HepaFilters.png",
    category: "accessories",
  };

  const media: MediaItem[] = [
    {
      type: "image",
      src: "/backgroundImages/accessories/HepaFilters.png",
      thumbnailSrc: "/backgroundImages/accessories/HepaFilters.png",
      alt: "Hepa Filters",
    },
    {
      type: "video",
      src: "/backgroundImages/accessories/changingFilters.mp4",
      thumbnailSrc: "/backgroundImages/accessories/changingFilters.png",
    },
  ];

  const [mounted, setMounted] = useState(false);
  const buttonRef1 = useRef<HTMLAnchorElement>(null);
  const circleRef1 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const setupButtonAnimation = (
    button: HTMLAnchorElement,
    circle: HTMLDivElement
  ) => {
    gsap.set(circle, { scale: 0, opacity: 0, y: "50%" });
    const tl = gsap.timeline({ paused: true });
    tl.to(circle, { opacity: 1, duration: 0.1 })
      .to(
        circle,
        { scale: 0.5, y: "25%", duration: 0.1, ease: "power1.out" },
        "<"
      )
      .to(circle, { scale: 2.5, y: "0%", duration: 0.5, ease: "power2.out" })
      .to(
        button,
        { color: "white", borderColor: "#1ee3af", duration: 0.1 },
        "<0.1"
      );

    const onEnter = () => tl.play();
    const onLeave = () => tl.reverse();

    button.addEventListener("mouseenter", onEnter);
    button.addEventListener("mouseleave", onLeave);

    return () => {
      button.removeEventListener("mouseenter", onEnter);
      button.removeEventListener("mouseleave", onLeave);
      tl.kill();
    };
  };

  useEffect(() => {
    if (!mounted) return;
    if (buttonRef1.current && circleRef1.current) {
      const clean1 = setupButtonAnimation(
        buttonRef1.current,
        circleRef1.current
      );
      return () => clean1();
    }
  }, [mounted]);

  // Function to handle adding to cart
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default link behavior

    // Add the product to cart
    addItem(hepaFilterProduct);

    // Show toast notification using Sonner
    toast.success("Added to cart", {
      description: `${hepaFilterProduct.name} has been added to your cart.`,
      duration: 3000,
      action: {
        label: "View Cart",
        onClick: () => router.push("/bubl-cart"),
      },
    });

    // Optional: Navigate to cart page
    // router.push("/cart");
  };

  if (!mounted) return null;

  return (
    <main className="px-[6vw] pt-[6vh] text-black">
      <ImageOverlay
        imageSrc="/backgroundImages/philosphy/PhilosphyOverlay.png"
        horizontalPosition="right"
        width="50%"
        height="110vh" // Exceeds viewport height
        exceedViewport={true}
        scale={1}
        opacity={1}
        // Mobile-specific props
        mobile={{
          horizontalPosition: "right", // Centered on mobile
          verticalPosition: "top", // At the top on mobile
          width: "80%", // Full width on mobile
          height: "80vh", // Half viewport height on mobile
        }}
        // Tablet-specific props
        tablet={{
          horizontalPosition: "center",
          width: "90%",
          height: "80vh",
          scale: 1,
        }}
      />
      {/* Header */}
      <div className="mb-4 relative">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between">
          <div className="relative">
            <h1 className="text-4xl md:text-[clamp(3rem,7vw,8rem)] text-center md:text-start font-semibold leading-[1.3] tracking-normal mb-6 md:mb-0">
              <div className="flex items-center justify-center md:justify-start relative">
                <div className="text-center md:text-start">
                  <span className="text-black">Bubl </span>
                  <span className="gradient-text-1">HEPA Filters</span>
                </div>

                {/* Arrow positioned next to "& Mission" */}
                <div className="hidden md:block ml-12 transform translate-y-1">
                  <svg
                    width="50"
                    height="50"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 3L21 21M21 21H6M21 21V6"
                      stroke="black"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </h1>
          </div>
        </div>
      </div>

      <div className=" mx-auto md:px-[4vw] pt-[4vh]">
        {/* Two‑column image + summary */}
        <div className="flex flex-col lg:flex-row justify-between items-center">
          {/* Image */}
          <div className="w-full md:w-2/5 flex justify-center">
            <div className="relative w-full">
              <MediaCarousel items={media} />
            </div>
          </div>

          {/* Summary & CTA */}
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl md:text-3xl font-normal mb-4">
              <span className="font-semibold">Replacement filters</span> — High
              efficiency filters to guarantee a high level of purification.
            </h2>

            <ul className="list-disc pl-5 mb-6 text- space-y-1 md:text-xl">
              <li className="font-semibold">HEPA technology filters</li>
              <li className="font-semibold">
                Extraordinary efficient in trapping harmful particles, and even
                viruses.
              </li>
              <li className="font-semibold">
                Changed every 3&#8208;4 months depending on how polluted it is.
              </li>
              <li className="font-semibold">
                After use, discard in regular household waste.
              </li>
            </ul>

            <p className="text-xl md:text-2xl font-medium my-10">
              Price: <span className="font-semibold"> INR 4999</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-5">
              <Link
                ref={buttonRef1}
                href="/bubl-cart"
                onClick={handleAddToCart}
                className="relative z-20 inline-block px-10 py-4 md:py-6 md:px-16 border-2 border-[#8ad3c3] rounded-full font-semibold text-black text-lg md:text-2xl overflow-hidden text-center"
              >
                <span className="relative z-10">Add to Cart</span>
                <div
                  ref={circleRef1}
                  className="absolute left-1/2 bottom-0 w-full h-full -translate-x-1/2 gradient-background-1 rounded-full pointer-events-none"
                />
              </Link>
            </div>
          </div>
        </div>

        {/* Full‑width detailed description */}
        <section className="mt-12 w-full space-y-4 text-lg font-normal tracking-wide md:text-2xl">
          <p>
            HEPA filters are a key component in most air purifiers due to their{" "}
            <span className="font-semibold">
              high efficiency in capturing particles of all sizes—from tiny
              viruses to larger ones like pollen
            </span>
            . Over the past few years, they&#39;ve also proven effective in
            reducing airborne viruses like COVID-19.
          </p>
          <p>
            Bubl&#39;s HEPA filters come in a set of two and should be{" "}
            <span className="font-semibold">
              replaced every 3&#8208;4 months
            </span>
            , depending on air quality. Regular replacement maintains
            performance and prevents moisture buildup or mold growth, which is
            common when filters are exposed to the elements.
          </p>

          <div className="grid text-base md:text-2xl grid-cols-1 md:grid-cols-2 gap-6 pt-4 ">
            <div>
              <p className="font-semibold mb-1">
                Measurements (MM):
                <span className=" font-normal"> L: 100, W: 70, H: 42</span>
              </p>
              <p className="font-semibold mb-1 mt-3">
                Weight:
                <span className=" font-normal"> 45g</span>
              </p>
            </div>
            <div>
              <p className="font-semibold mb-1">
                Filter Material:
                <span className=" font-normal"> PET</span>
              </p>
              <p className="font-semibold mb-1 mt-3">
                Filter Classification:
                <span className=" font-normal"> H11 HEPA</span>
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
