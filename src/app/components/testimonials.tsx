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
    <section className="relative py-16 px-4 md:px-8 lg:px-16 overflow-hidden bg-[#f8fcfa]">
      {/* Heading section */}
      <div className="mb-8 md:mb-12 flex flex-col md:flex-row justify-around relative">
        <h1 className="w-full text-4xl md:text-[clamp(4rem,8vw,8rem)] text-center md:text-start font-bold leading-tighter tracking-normal">
          <span className="text-black">Hear from our </span>
          <br />
          <span className="gradient-text-1">Customers</span>
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
