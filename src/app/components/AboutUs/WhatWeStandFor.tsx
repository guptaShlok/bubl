const WhatWeStandFor = () => {
  const values = [
    {
      id: "01",
      title: "Innovation with Intention",
      description: "Thoughtful design solving real problems.",
    },
    {
      id: "02",
      title: "Trust & Transparency",
      description: "Science-backed for parents.",
    },
    {
      id: "03",
      title: "Everyday Wellness",
      description: "Protection that fits your daily life.",
    },
  ];
  return (
    <>
      <main className="h-auto px-[6vw] pt-[8vh] w-full relative">
        <div className="mb-8 md:mb-12 relative">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between">
            <div className="relative">
              <h1 className="text-4xl md:text-[clamp(3rem,7vw,8rem)] text-center md:text-start font-semibold leading-[1.3] tracking-normal mb-6 md:mb-0">
                <span className="text-black">What We </span>
                <div className="flex items-center justify-center md:justify-start relative">
                  <div className="text-center md:text-start">
                    <span className="gradient-text-1"> Stand For</span>
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
        <div className="w-full md:pt-12 pt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mx-auto px-2">
            {values.map((value) => (
              <div
                key={value.id}
                className="bg-[#8ad3c3] rounded-2xl h-[300px] sm:h-[350px] md:h-[400px] w-full relative pt-10 text-white"
              >
                {/* Number in top right */}
                <div className="absolute top-4 sm:top-8 right-6 sm:right-10 text-6xl sm:text-7xl md:text-8xl font-normal">
                  {value.id}
                </div>

                {/* Content centered vertically, aligned left */}
                <div className="h-full flex flex-col justify-end pb-6 sm:pb-8 text-left px-6 sm:px-8">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-2 sm:mb-4">
                    {value.title}
                  </h3>
                  <p className="text-lg sm:text-xl md:text-2xl">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default WhatWeStandFor;
