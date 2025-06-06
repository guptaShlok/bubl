"use client";

import { useState, useEffect, useRef } from "react";

import Link from "next/link";
import gsap from "gsap";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/lib/store";
import { toast } from "sonner";
import ImageOverlay from "../ImageOverlay";
import MediaCarousel, { MediaItem } from "../MediaCarousel";

export default function BUblController() {
  const router = useRouter();
  const { addItem } = useCartStore();

  const bublControllerProduct = {
    id: "bubl-controller-1",
    name: "Bubl Controller",
    description: "Control your Bubl devices from anywhere",
    price: 5999,
    image: "/backgroundImages/accessories/BublController.png",
    category: "accessories",
  };
  const media: MediaItem[] = [
    {
      type: "image",
      src: "/backgroundImages/accessories/BublController.png",
      thumbnailSrc: "/backgroundImages/accessories/BublController.png",
      alt: "Hepa Filters",
    },
    {
      type: "video",
      src: "/backgroundImages/accessories/BublController.mp4",
      thumbnailSrc: "/backgroundImages/accessories/BublControllerThumb.png",
    },
  ];
  const [mounted, setMounted] = useState(false);
  const buttonRef1 = useRef<HTMLAnchorElement>(null);
  const circleRef1 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const setupButton = (button: HTMLAnchorElement, circle: HTMLDivElement) => {
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

    const enter = () => tl.play();
    const leave = () => tl.reverse();
    button.addEventListener("mouseenter", enter);
    button.addEventListener("mouseleave", leave);
    return () => {
      button.removeEventListener("mouseenter", enter);
      button.removeEventListener("mouseleave", leave);
      tl.kill();
    };
  };

  useEffect(() => {
    if (!mounted) return;
    let clean1: (() => void) | undefined;
    if (buttonRef1.current && circleRef1.current) {
      clean1 = setupButton(buttonRef1.current, circleRef1.current);
    }
    return () => clean1?.();
  }, [mounted]);
  // Function to handle adding to cart
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default link behavior

    // Add the product to cart
    addItem(bublControllerProduct);

    // Show toast notification using Sonner
    toast.success("Added to cart", {
      description: `${bublControllerProduct.name} has been added to your cart.`,
      duration: 3000,
      action: {
        label: "View Cart",
        onClick: () => router.push("/bubl-cart"),
      },
    });

    // Optional: Navigate to cart page
    // router.push("/bubl-cart");
  };

  if (!mounted) return null;

  return (
    <main className="px-[6vw] w-[100vw] overflow-x-hidden pt-[6vh] text-black">
      <ImageOverlay
        imageSrc="/backgroundImages/indianDesc/IndianDescOverlay.png"
        horizontalPosition="left"
        verticalPosition="top"
        width="55%"
        height="120vh" // Exceeds viewport height
        exceedViewport={true}
        scale={1}
        opacity={1}
        className=" translate-y-1/12"
        mobile={{
          horizontalPosition: "left", // Centered on mobile
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
        // Mobile-specific props
      />
      {/* Header */}
      <div className="mb-4 relative">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between">
          <div className="relative">
            <h1 className="text-4xl md:text-[clamp(3rem,7vw,8rem)] text-center md:text-start font-semibold leading-[1.3] tracking-normal mb-6 md:mb-0">
              <div className="flex items-center justify-center md:justify-start relative">
                <div className="text-center md:text-start">
                  <span className="text-black">Bubl </span>
                  <span className="gradient-text-1">Controller</span>
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

      {/* Two&#8208;column: Image + Summary */}
      <div className="flex flex-col md:flex-row items-center md:items-center md:justify-center mt-[8vh] gap-12">
        {/* Image */}
        <div className="w-full md:w-3/5">
          <div className="relative w-full flex justify-center">
            <MediaCarousel items={media} />
          </div>
        </div>

        {/* Summary & CTA */}
        <div className="w-full lg:w-4/5">
          <p className="text-xl md:text-2xl font-normal mb-4">
            <span className="font-semibold">
              {" "}
              The device that controls your babybubl
            </span>
            , and also powers it through the built-in battery.
          </p>

          <ul className="list-disc pl-5 mb-6 space-y-4 text-lg md:text-2xl font-normal">
            <li>
              <span className="font-semibold">A Bubl Controller</span> is
              included in your babybubl.
            </li>
            <li>
              <span className="font-semibold">
                Controls your babybubl device
              </span>
              . Turn it on/off, change fan speeds, and put the unit in Bluetooth
              pairing mode.
            </li>
            <li>
              <span className="font-semibold">
                Will keep your babybubl running
              </span>{" "}
              for 9–18 hours.
            </li>
            <li>
              <span className="font-semibold">Remove the Controller</span> from
              the babybubl when charging, using the USB&#8208;C port and
              accompanying cable.
            </li>
          </ul>

          <p className="text-xl md:text-2xl font-normal my-10">
            Price: <span className=" font-semibold"> INR 5999</span>
          </p>

          <div className="flex flex-col relative z-20  sm:flex-row gap-4 sm:gap-6 mb-5">
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

      {/* Full&#8208;width detailed description */}
      <section className="mt-3 space-y-6 font-normal text-lg md:text-2xl">
        <p>
          Through the buttons, you can{" "}
          <span className="font-semibold">adjust the fan speed</span>, put the
          unit in <span className="font-semibold">Bluetooth pairing mode</span>,
          and it will also communicate with you through the embedded multicolor
          LED lights.
        </p>
        <p>
          The battery that powers your babybubl is a typical{" "}
          <span className="font-semibold">5000 mAh Li&#8208;ion</span> battery
          which will keep it running for up to 18 hours, depending on which fan
          speed you use. With the highest fan speed, it will keep you running
          for approximately 9 hours.
        </p>
        <p>
          The controller is charged with a standard USB&#8208;C input. The
          charging cable for this is of course included in the box. You use the
          USB&#8208;A port to connect it to the babybubl. Then place it in its
          pocket on the front of the babybubl.
        </p>

        <div className="grid text-base md:text-2xl grid-cols-1 md:grid-cols-2 gap-6 pt-4 ">
          <div>
            <p className="font-semibold mb-1">
              Measurements (MM):
              <span className=" font-normal"> L: 175, W: 70, H: 16</span>
            </p>
            <p className="font-semibold mb-1 mt-3">
              Weight:
              <span className=" font-normal"> 185g</span>
            </p>
          </div>
          <div>
            <p className="font-semibold mb-1">
              Casing Material:
              <span className=" font-normal"> High Heat PC / ABS</span>
            </p>
            <p className="font-semibold mb-1 mt-3">
              Battery Classification:
              <span className=" font-normal"> Li-Polymer ion</span>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
