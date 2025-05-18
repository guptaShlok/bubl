"use client";

export default function HeroSection() {
  return (
    <div className="h-auto relative top-1/6 overflow-hidden">
      {/* Main Content */}
      <main className=" mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 relative">
        <div className="flex flex-col md:flex-row items-center">
          {/* Product Info - Right Side */}
          <div className="w-full md:w-4/5 z-10 order-1 md:order-2 text-white">
            <h1 className="text-6xl md:text-9xl md:h-[60vh] leading-[1.3] translate-y-1/4 md:translate-y-1/2 font-semibold mb-6">
              Where Innovation Meets Care
            </h1>
          </div>
        </div>
      </main>
    </div>
  );
}
