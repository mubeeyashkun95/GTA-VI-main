import React, { useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";

function App() {
  const [showContent, setShowContent] = useState(false);

  /* =========================
     INTRO / LOADER ANIMATION
  ========================== */
  useGSAP(() => {
    const tl = gsap.timeline();

    gsap.set(".vi-mask-group", {
      scale: 0.6,
      opacity: 0,
      rotate: -5,
      filter: "blur(12px)",
      transformOrigin: "50% 50%",
    });

    gsap.set(".main", { opacity: 0 });

    tl.to(".vi-mask-group", {
      opacity: 1,
      scale: 1,
      rotate: 0,
      filter: "blur(0px)",
      duration: 1.6,
      ease: "power4.out",
    })
      .to(".vi-mask-group", {
        scale: 1.05,
        duration: 0.6,
        ease: "power1.inOut",
        yoyo: true,
        repeat: 1,
      })
      .to(".vi-mask-group", {
        rotate: 2,
        duration: 0.08,
        repeat: 4,
        yoyo: true,
        ease: "power1.inOut",
      })
      .to(".vi-mask-group", {
        scale: 12,
        opacity: 0,
        duration: 2,
        ease: "expo.inOut",
        delay: 0.2,
        onComplete: () => {
          setShowContent(true);

          gsap.to(".main", {
            opacity: 1,
            duration: 1.2,
            ease: "power4.out",
          });

          gsap.from(".landing", {
            y: 40,
            duration: 1.4,
            ease: "power4.out",
          });

          gsap.to(".svg", {
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
            onComplete: () => {
              document.querySelector(".svg")?.remove();
            },
          });
        },
      });
  });

  /* =========================
     MOUSE PARALLAX (TEXT)
  ========================== */
  useGSAP(
    () => {
      const main = document.querySelector(".main");
      const text = document.querySelector(".imagesDiv .text");
      if (!main || !text) return;

      const handleMove = (e) => {
        const centerX = window.innerWidth / 2;
        const distance = e.clientX - centerX;

        gsap.to(text, {
          x: distance * 0.08,
          duration: 0.6,
          ease: "power3.out",
        });
      };

      const reset = () => {
        gsap.to(text, {
          x: 0,
          duration: 0.8,
          ease: "power3.out",
        });
      };

      main.addEventListener("mousemove", handleMove);
      main.addEventListener("mouseleave", reset);

      return () => {
        main.removeEventListener("mousemove", handleMove);
        main.removeEventListener("mouseleave", reset);
      };
    },
    { dependencies: [showContent] }
  );

  return (
    <>
      {/* =========================
         LOADER
      ========================== */}
      <div className="svg fixed inset-0 z-[100] flex items-center justify-center bg-black">
        <svg viewBox="0 0 600 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <mask id="viMask">
              <rect width="100%" height="100%" fill="black" />
              <text
                className="vi-mask-group"
                x="50%"
                y="50%"
                fontSize="250"
                textAnchor="middle"
                fill="white"
                dominantBaseline="middle"
                fontFamily="Arial Black"
              >
                VI
              </text>
            </mask>
          </defs>

          <image
            href="/bg.png"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            mask="url(#viMask)"
          />
        </svg>
      </div>

      {/* =========================
         MAIN CONTENT
      ========================== */}
      {showContent && (
        <div className="main w-full bg-black text-white">
          {/* HERO */}
          <section className="landing relative w-full h-screen overflow-hidden">
            {/* NAVBAR */}
            <div className="absolute top-0 left-0 w-full px-10 py-10 z-10">
              <div className="flex items-center gap-3">
                <div className="flex flex-col gap-1.5">
                  <div className="w-10 h-1.5 bg-white"></div>
                  <div className="w-7 h-1.5 bg-white"></div>
                  <div className="w-4 h-1.5 bg-white"></div>
                </div>
                <h3 className="text-3xl">Rockstar</h3>
              </div>
            </div>

            {/* BACKGROUND */}
            <div className="imagesDiv absolute inset-0">
              <img
                src="/sky.png"
                className="absolute inset-0 w-full h-full object-cover"
                alt=""
              />
              <img
                src="/bg.png"
                className="absolute inset-0 w-full h-full object-cover"
                alt=""
              />

              {/* TITLE */}
              <div className="text absolute top-[15%] left-1/2 -translate-x-1/2 flex flex-col gap-3">
                <h1 className="text-[9rem] -ml-40 leading-none">grand</h1>
                <h1 className="text-[9rem] ml-20 leading-none">theft</h1>
                <h1 className="text-[9rem] -ml-40 leading-none">auto</h1>
              </div>

              {/* CHARACTER */}
              <img
                src="/girl.png"
                className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[80%] object-contain"
                alt=""
              />
            </div>
          </section>

          {/* =========================
             SIMPLE REALISTIC FOOTER
          ========================== */}
          <footer className="w-full bg-black border-t border-white/10 px-10 py-14">
            <div className="max-w-7xl mx-auto flex flex-col items-center gap-8">

              <img
                src="/Brands-removebg.png"
                alt="Brands"
                className="h-[110px] object-contain opacity-90"
              />

              <div className="w-full h-px bg-white/10"></div>

              <div className="flex items-center gap-2 text-white/50 text-xs tracking-widest uppercase">
                <i className="ri-arrow-down-line text-sm"></i>
                <span>Scroll to explore</span>
              </div>

            </div>
          </footer>
        </div>
      )}
    </>
  );
}

export default App;
