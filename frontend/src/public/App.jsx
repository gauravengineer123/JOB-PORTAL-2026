import { useEffect } from "react";
import gsap from "gsap";

export default function App() {
  useEffect(() => {
    const tl = gsap.timeline();

    // Entrance Animations
    tl.from(".deco-1", { duration: 1, x: -50, opacity: 0, ease: "power2.out" })
      .from(
        ".deco-2",
        { duration: 1, x: 50, opacity: 0, ease: "power2.out" },
        "-=0.8"
      )
      .from(
        ".blob-circle",
        {
          duration: 1.5,
          scale: 0,
          opacity: 0,
          ease: "elastic.out(1, 0.5)",
        },
        "-=0.6"
      );

    tl.from(
      ".hero-text h1",
      { duration: 1, y: 50, opacity: 0, ease: "power3.out" },
      "-=1"
    ).from(
      ".small-meta",
      { duration: 0.8, y: 20, opacity: 0, stagger: 0.1, ease: "power2.out" },
      "-=0.6"
    );

    tl.from(
      ".hero-woman-img",
      { duration: 1.2, y: 100, opacity: 0, ease: "power3.out" },
      "-=1.2"
    );

    tl.from(
      ".card-1",
      { duration: 0.8, x: -50, opacity: 0, ease: "back.out(1.7)" },
      "-=0.6"
    ).from(
      ".card-2",
      { duration: 0.8, x: 50, y: -20, opacity: 0, ease: "back.out(1.7)" },
      "-=0.6"
    );

    // Floating Animations
    const floatingAnim1 = gsap.to(".card-1", {
      y: "-=15",
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    const floatingAnim2 = gsap.to(".card-2", {
      y: "+=15",
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Mouse Parallax
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;

      gsap.to(".hero-woman-img", {
        x: x * 10,
        y: y * 10,
        duration: 1,
        ease: "power1.out",
      });

      gsap.to(".blob-circle", {
        x: x * 20,
        y: y * 20,
        duration: 1.5,
        ease: "power1.out",
      });

      gsap.to(".card-1", {
        x: x * 15,
        y: y * 15,
        duration: 1,
        ease: "power1.out",
      });

      gsap.to(".card-2", {
        x: x * 20,
        y: y * 20,
        duration: 1,
        ease: "power1.out",
      });
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      tl.kill();
      floatingAnim1.kill();
      floatingAnim2.kill();
    };
  }, []);

  return (
    <div className="jp-root min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Top left logo */}
      <nav className="fixed top-0 left-0 p-4 md:p-6 flex items-center gap-3 z-50">
        <div className="nav-logo-circle rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            style={{ color: "#7DCE13" }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>
        <span className="text-white font-bold text-xl tracking-wide">
          Job Portal
        </span>
      </nav>

      {/* Main Container */}
      <div className="container mx-auto px-4 md:px-6 xl:px-12 w-full min-h-screen relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 items-center justify-between h-full">
          {/* Left Content */}
          <div className="order-2 lg:order-1 pt-5 lg:pt-0 hero-text">
            <div className="text-white max-w-xl">
              <h1
                className="text-4xl md:text-5xl font-extrabold leading-none mb-4 capitalize"
                style={{ lineHeight: "1" }}
              >
                Find Your Dream Job
                <br />
                <span className="text-white/90">
                  Get hired faster with top companies
                </span>
              </h1>

              <div className="mt-5 flex flex-col gap-4 small-meta text-white/80 text-sm">
                <div className="flex items-baseline gap-3">
                  <div className="font-medium text-lg leading-relaxed">
                    Your Next Job Is Here <br />
                    Browse thousands of new openings daily <br />
                    Apply in one click, track your applications <br />
                    Build a better future with us
                  </div>
                </div>

                <div className="flex items-baseline gap-3">
                  <div className="font-medium text-lg leading-relaxed">
                    “In today&apos;s fast-paced digital era, finding the right
                    talent or securing a dream job can be a daunting challenge”
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-3">
                  <button className="jp-btn-primary">
                    Get Started
                  </button>
                  <button className="jp-btn-secondary">
                    Explore Jobs
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="order-1 lg:order-2 relative flex justify-center lg:justify-end hero-image">
            {/* Decorative Blue Blob */}
            <div
              className="hidden lg:block absolute rounded-full blob-circle"
              style={{ top: "50px", right: "-10px" }}
            ></div>

            {/* Main Character Image */}
            <div className="relative z-10 w-full flex justify-center lg:justify-end pb-5">
              {/* IMPORTANT: Put jobi.png in public folder */}
              <img src="/jobi.png"
                alt="Woman with Laptop"
                className="hero-woman-img"/>
            </div>

            {/* Floating Card 1 */}
            <div
              className="absolute floating-card card-1 bg-white/90 rounded-2xl shadow-lg p-3 flex items-center gap-3 z-20"
              style={{ bottom: "12%", left: "18%", width: "280px" }}
            >
              <div className="flex relative">
                <img
                  src="https://i.pravatar.cc/100?img=1"
                  className="rounded-full border-2 border-white"
                  style={{ width: "66px", height: "56px" }}
                  alt="User 1"
                />
                <img
                  src="https://i.pravatar.cc/100?img=8"
                  className="rounded-full border-2 border-white avatar-overlap"
                  style={{ width: "52px", height: "52px" }}
                  alt="User 2"
                />
                <img
                  src="https://i.pravatar.cc/100?img=3"
                  className="rounded-full border-2 border-white avatar-overlap"
                  style={{ width: "56px", height: "36px" }}
                  alt="User 3"
                />
                <div
                  className="rounded-full text-white flex items-center justify-center border-2 border-white avatar-overlap font-bold text-xs"
                  style={{
                    width: "85px",
                    height: "40px",
                    backgroundColor: "#2563eb",
                  }}
                >
                  +
                </div>
              </div>
              <div className="ml-2 text-gray-900">
                <div className="font-bold leading-none text-sm">
                  100k+ Jobholder
                </div>
                <div className="font-medium leading-none text-xs">Get Job</div>
              </div>
            </div>

            {/* Floating Card 2 */}
            <div
              className="absolute floating-card card-2 bg-white/90 rounded-2xl shadow-lg p-3 flex items-center gap-3 z-20"
              style={{ top: "80%", right: "0%", width: "210px" }}
            >
              <div
                className="rounded-full p-2 flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "#2563eb" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="text-gray-900">
                <div className="font-bold leading-none text-sm">
                  A Better Path to
                </div>
                <div className="font-medium leading-none text-sm">
                  more opportunity
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Background Elements */}
      <div
        className="absolute bg-blue-600 rotate-45 deco-1"
        style={{
          width: "16px",
          height: "16px",
          top: "15%",
          left: "20%",
          borderRadius: "2px",
        }}
      ></div>

      <div
        className="absolute bg-blue-600 rotate-45 deco-2"
        style={{
          width: "12px",
          height: "12px",
          bottom: "20%",
          right: "30%",
          borderRadius: "2px",
        }}
      ></div>

      <div
        className="absolute bg-white/10 rounded-full"
        style={{
          width: "500px",
          height: "500px",
          top: "-100px",
          right: "-100px",
        }}
      ></div>

      <div
        className="absolute bg-black/5 rounded-full"
        style={{
          width: "300px",
          height: "300px",
          bottom: "-50px",
          left: "-50px",
        }}
      ></div>

    </div>
  );
}
