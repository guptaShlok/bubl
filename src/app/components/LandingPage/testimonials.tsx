"use client";

import { useEffect, useState } from "react";

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  location: string;
  highlighted?: boolean;
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    quote:
      "Delhi's air scared me as a new mom. With Babybubl, I finally feel like my baby's safe - even outdoors.",
    author: "Richa S.",
    location: "New Delhi",
    highlighted: false,
  },
  {
    id: "2",
    quote:
      "Delhi's air scared me as a new mom. With Babybubl, I finally feel like my baby's safe - even outdoors.",
    author: "Richa S.",
    location: "New Delhi",
    highlighted: true,
  },
  {
    id: "3",
    quote:
      "Delhi's air scared me as a new mom. With Babybubl, I finally feel like my baby's safe - even outdoors.",
    author: "Richa S.",
    location: "New Delhi",
    highlighted: false,
  },
];

export default function TestimonialSection() {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="h-[500px]"></div>;

  return (
    <section className="relative pt-[6vw] px-[6vw] overflow-hidden ">
      {/* Heading section */}
      <div className="mb-8 md:mb-10 flex flex-col md:flex-row md:justify-start justify-around relative">
        <h1 className="text-4xl md:text-[clamp(3rem,7vw,8rem)] text-center md:text-start font-semibold leading-[1.3] tracking-normal mb-6 md:mb-0">
          <span className="text-black">Hear from our </span>

          <br />
          <div className="flex items-center justify-center md:justify-start relative">
            <div className="text-center md:text-start">
              <span className="gradient-text-1"> Customers</span>
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => {
          return (
            <div
              key={testimonial.id}
              className={`
                  bg-[#8ad3c3] rounded-lg p-6 md:p-8 flex flex-col justify-between text-white
                  h-full min-h-[200px] md:min-h-[400px] transition-all duration-300
                `}
            >
              <div>
                <p className="text-lg md:text-xl font-medium mb-6">
                  {testimonial.quote}
                </p>
              </div>
              <div>
                <p className="text-base md:text-lg font-medium">
                  -{testimonial.author}, {testimonial.location}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
