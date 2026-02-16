import React, { useState, useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "remixicon/fonts/remixicon.css";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

function App() {
  const [showContent, setShowContent] = useState(false);
  const mainRef = useRef(null);
  const particlesRef = useRef(null);

  // Games data - Popular titles across different publishers
  const games = [
    {
      id: 1,
      title: "GTA VI",
      subtitle: "Coming 2025",
      tag: "🔥 HOT",
      gradient: "from-orange-600 via-red-600 to-pink-600",
      icon: "ri-fire-fill",
      publisher: "Rockstar Games",
      image: "https://upload.wikimedia.org/wikipedia/en/d/d0/Grand_Theft_Auto_VI.png",
    },
    {
      id: 2,
      title: "Call of Duty",
      subtitle: "Modern Warfare III",
      tag: "BESTSELLER",
      gradient: "from-zinc-800 via-neutral-900 to-black",
      icon: "ri-crosshair-fill",
      publisher: "Activision",
      image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2519060/library_600x900.jpg",
    },
    {
      id: 3,
      title: "EA FC 25",
      subtitle: "Play Now",
      tag: "SPORTS",
      gradient: "from-green-500 via-emerald-600 to-teal-700",
      icon: "ri-football-fill",
      publisher: "EA Sports",
      image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2669320/library_600x900.jpg",
    },
    {
      id: 4,
      title: "Cyberpunk 2077",
      subtitle: "Phantom Liberty",
      tag: "UPDATED",
      gradient: "from-yellow-500 via-cyan-500 to-blue-600",
      icon: "ri-robot-fill",
      publisher: "CD Projekt Red",
      image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1091500/library_600x900.jpg",
    },
    {
      id: 5,
      title: "Assassin's Creed",
      subtitle: "Mirage",
      tag: "ACTION",
      gradient: "from-amber-600 via-yellow-700 to-orange-800",
      icon: "ri-sword-fill",
      publisher: "Ubisoft",
      image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3035570/library_600x900.jpg",
    },
    {
      id: 6,
      title: "Spider-Man 2",
      subtitle: "PS5 Exclusive",
      tag: "EXCLUSIVE",
      gradient: "from-red-600 via-blue-700 to-indigo-800",
      icon: "ri-spider-fill",
      publisher: "Insomniac Games",
      image: "https://upload.wikimedia.org/wikipedia/en/4/46/Spider-Man_2PS5_box_art.jpg",
    },
    {
      id: 7,
      title: "Elden Ring",
      subtitle: "Shadow of Erdtree",
      tag: "RPG",
      gradient: "from-amber-500 via-orange-700 to-yellow-900",
      icon: "ri-sword-fill",
      publisher: "FromSoftware",
      image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1245620/library_600x900.jpg",
    },
    {
      id: 8,
      title: "Red Dead 2",
      subtitle: "Open World",
      tag: "CLASSIC",
      gradient: "from-amber-700 via-red-800 to-rose-900",
      icon: "ri-landscape-fill",
      publisher: "Rockstar Games",
      image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1174180/library_600x900.jpg",
    },
  ];

  // News data
  const news = [
    {
      id: 1,
      category: "ANNOUNCEMENT",
      title: "GTA VI Trailer Breaks All-Time Records",
      excerpt: "The first trailer for Grand Theft Auto VI has become the most-watched video game trailer in history within 24 hours.",
      date: "Dec 5, 2024",
      readTime: "3 min read",
      featured: true,
    },
    {
      id: 2,
      category: "UPDATE",
      title: "Red Dead Online: New Frontier Pass Available",
      excerpt: "Explore new content, rewards, and exclusive items in the latest Frontier Pass update.",
      date: "Nov 28, 2024",
      readTime: "2 min read",
      featured: false,
    },
    {
      id: 3,
      category: "EVENT",
      title: "GTA Online Winter Update Coming Soon",
      excerpt: "Get ready for the biggest winter event yet with new heists, vehicles, and holiday surprises.",
      date: "Nov 20, 2024",
      readTime: "4 min read",
      featured: false,
    },
    {
      id: 4,
      category: "COMMUNITY",
      title: "Rockstar Creator Contest Winners Announced",
      excerpt: "Check out the winning entries from our community creative contest and meet the talented creators.",
      date: "Nov 15, 2024",
      readTime: "5 min read",
      featured: false,
    },
  ];

  /* =========================
     FLOATING PARTICLES
  ========================== */
  useEffect(() => {
    if (!showContent) return;

    const createParticle = () => {
      if (!particlesRef.current) return;

      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 4 + 2}px;
        height: ${Math.random() * 4 + 2}px;
        background: radial-gradient(circle, rgba(255,107,53,0.8) 0%, rgba(255,107,53,0) 70%);
        border-radius: 50%;
        pointer-events: none;
        left: ${Math.random() * 100}%;
        bottom: -10px;
        box-shadow: 0 0 ${Math.random() * 10 + 5}px rgba(255,107,53,0.5);
      `;

      particlesRef.current.appendChild(particle);

      gsap.to(particle, {
        y: -(window.innerHeight + 100),
        x: (Math.random() - 0.5) * 200,
        opacity: 0,
        duration: Math.random() * 5 + 4,
        ease: "none",
        onComplete: () => particle.remove()
      });
    };

    const interval = setInterval(createParticle, 150);
    return () => clearInterval(interval);
  }, [showContent]);

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

          gsap.from(".navbar", {
            y: -100,
            opacity: 0,
            duration: 1,
            delay: 0.3,
            ease: "power4.out",
          });

          gsap.from(".hero-text h1", {
            y: 100,
            opacity: 0,
            rotateX: -45,
            stagger: 0.15,
            duration: 1.2,
            delay: 0.5,
            ease: "power4.out",
          });

          gsap.from(".character-img", {
            y: 200,
            opacity: 0,
            scale: 0.9,
            duration: 1.5,
            delay: 0.8,
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
     SCROLL TRIGGERED ANIMATIONS
  ========================== */
  useGSAP(() => {
    if (!showContent) return;

    // Games section
    gsap.from(".games-section .section-title", {
      scrollTrigger: {
        trigger: ".games-section",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    });

    gsap.from(".game-card", {
      scrollTrigger: {
        trigger: ".games-grid",
        start: "top 95%", // Start earlier
        toggleActions: "play none none none", // Once played, stay visible
      },
      y: 50,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: "power3.out",
      clearProps: "opacity,transform" // Use clearProps to ensure visibility after animation
    });

    // News section
    gsap.from(".news-section .section-title", {
      scrollTrigger: {
        trigger: ".news-section",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    });

    gsap.from(".news-card", {
      scrollTrigger: {
        trigger: ".news-grid",
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
      y: 60,
      opacity: 0,
      stagger: 0.1,
      duration: 0.7,
      ease: "power3.out",
    });

    // Newsletter section
    gsap.from(".newsletter-section", {
      scrollTrigger: {
        trigger: ".newsletter-section",
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
      y: 80,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });

    // Footer entrance
    gsap.from(".footer-section", {
      scrollTrigger: {
        trigger: ".footer-section",
        start: "top 90%",
        toggleActions: "play none none reverse",
      },
      y: 100,
      opacity: 0,
      duration: 1,
      ease: "power4.out",
    });

    gsap.from(".platform-logo", {
      scrollTrigger: {
        trigger: ".platform-logos",
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
      y: 30,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: "power3.out",
    });

    gsap.from(".social-icon", {
      scrollTrigger: {
        trigger: ".social-links",
        start: "top 90%",
        toggleActions: "play none none reverse",
      },
      scale: 0,
      opacity: 0,
      stagger: 0.08,
      duration: 0.6,
      ease: "back.out(1.7)",
    });

    gsap.from(".footer-link", {
      scrollTrigger: {
        trigger: ".footer-nav",
        start: "top 90%",
        toggleActions: "play none none reverse",
      },
      y: 20,
      opacity: 0,
      stagger: 0.05,
      duration: 0.6,
      ease: "power3.out",
    });

  }, { dependencies: [showContent] });
  useGSAP(
    () => {
      const main = document.querySelector(".main");
      const text = document.querySelector(".imagesDiv .hero-text");
      const character = document.querySelector(".character-img");
      if (!main || !text) return;

      const handleMove = (e) => {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const distX = e.clientX - centerX;
        const distY = e.clientY - centerY;

        gsap.to(text, {
          x: distX * 0.04,
          y: distY * 0.02,
          duration: 0.6,
          ease: "power3.out",
        });

        if (character) {
          gsap.to(character, {
            x: distX * 0.02,
            y: distY * 0.01,
            duration: 0.8,
            ease: "power3.out",
          });
        }
      };

      const reset = () => {
        gsap.to(text, { x: 0, y: 0, duration: 0.8, ease: "power3.out" });
        if (character) {
          gsap.to(character, { x: 0, y: 0, duration: 0.8, ease: "power3.out" });
        }
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
      {/* LOADER */}
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

      {/* MAIN CONTENT */}
      {showContent && (
        <div className="main w-full bg-black text-white overflow-x-hidden" ref={mainRef}>

          {/* FLOATING PARTICLES */}
          <div
            ref={particlesRef}
            className="particles-container fixed inset-0 pointer-events-none z-[5] overflow-hidden"
          />

          {/* ========================= HERO SECTION ========================= */}
          <section className="landing relative w-full h-screen overflow-hidden">
            {/* NAVBAR */}
            <nav className="navbar absolute top-0 left-0 w-full px-6 md:px-10 py-6 md:py-10 z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex flex-col gap-1.5 cursor-pointer hover:scale-110 transition-transform duration-300">
                    <div className="w-10 h-1.5 bg-white transition-all duration-300 hover:bg-orange-500"></div>
                    <div className="w-7 h-1.5 bg-white transition-all duration-300 hover:bg-orange-500"></div>
                    <div className="w-4 h-1.5 bg-white transition-all duration-300 hover:bg-orange-500"></div>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold tracking-wider hover:text-orange-500 transition-colors duration-300 cursor-pointer">
                    Rockstar
                  </h3>
                </div>

                <div className="hidden md:flex items-center gap-8">
                  <a href="#games" className="nav-link text-sm uppercase tracking-wider hover:text-orange-500 transition-colors duration-300 relative group">
                    Games
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"></span>
                  </a>
                  <a href="#news" className="nav-link text-sm uppercase tracking-wider hover:text-orange-500 transition-colors duration-300 relative group">
                    News
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"></span>
                  </a>
                  <a href="#" className="nav-link text-sm uppercase tracking-wider hover:text-orange-500 transition-colors duration-300 relative group">
                    Pre-Order
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"></span>
                  </a>
                </div>
              </div>
            </nav>

            {/* BACKGROUND */}
            <div className="imagesDiv absolute inset-0">
              <img src="/sky.png" className="absolute inset-0 w-full h-full object-cover" alt="" />
              <img src="/bg.png" className="absolute inset-0 w-full h-full object-cover" alt="" />

              {/* HERO TITLE */}
              <div className="hero-text absolute top-[10%] md:top-[15%] left-1/2 -translate-x-1/2 flex flex-col gap-1 md:gap-3 perspective-[1000px]">
                <h1 className="text-[4rem] md:text-[9rem] -ml-10 md:-ml-40 leading-none font-black tracking-tighter 
                  text-white drop-shadow-[0_0_30px_rgba(255,107,53,0.3)] 
                  hover:text-orange-400 hover:drop-shadow-[0_0_50px_rgba(255,107,53,0.6)] 
                  transition-all duration-500 cursor-default">
                  grand
                </h1>
                <h1 className="text-[4rem] md:text-[9rem] ml-5 md:ml-20 leading-none font-black tracking-tighter 
                  text-white drop-shadow-[0_0_30px_rgba(255,107,53,0.3)] 
                  hover:text-orange-400 hover:drop-shadow-[0_0_50px_rgba(255,107,53,0.6)] 
                  transition-all duration-500 cursor-default">
                  theft
                </h1>
                <h1 className="text-[4rem] md:text-[9rem] -ml-10 md:-ml-40 leading-none font-black tracking-tighter 
                  text-white drop-shadow-[0_0_30px_rgba(255,107,53,0.3)] 
                  hover:text-orange-400 hover:drop-shadow-[0_0_50px_rgba(255,107,53,0.6)] 
                  transition-all duration-500 cursor-default">
                  auto
                </h1>
              </div>

              {/* CHARACTER */}
              <img
                src="/girl.png"
                className="character-img absolute bottom-0 left-1/2 -translate-x-1/2 h-[60%] md:h-[80%] object-contain 
                  drop-shadow-[0_0_80px_rgba(0,0,0,0.8)]"
                alt="GTA VI Character"
              />

              {/* SCROLL INDICATOR */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
                <span className="text-white/50 text-xs uppercase tracking-[0.3em]">Scroll</span>
                <i className="ri-arrow-down-line text-white/50 text-xl"></i>
              </div>
            </div>
          </section>

          {/* ========================= GAMES SECTION ========================= */}
          <section id="games" className="games-section py-24 px-6 md:px-10 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[150px] pointer-events-none"></div>
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-pink-500/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto">
              {/* Section Header */}
              <div className="section-title text-center mb-16">
                <span className="inline-block px-4 py-2 rounded-full bg-orange-500/10 text-orange-500 text-xs uppercase tracking-[0.2em] mb-4">
                  Featured Titles
                </span>
                <h2 className="text-4xl md:text-6xl font-black mb-4">
                  Our <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">Games</span>
                </h2>
                <p className="text-white/50 max-w-2xl mx-auto">
                  Experience the most iconic open-world games ever created. From the streets of Los Santos to the Wild West.
                </p>
              </div>

              {/* Games Grid */}
              <div className="games-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {games.map((game) => (
                  <div
                    key={game.id}
                    className={`game-card group relative rounded-2xl overflow-hidden cursor-pointer transform transition-all duration-500 hover:scale-105 hover:z-10 shadow-lg hover:shadow-2xl hover:shadow-orange-500/20 min-h-[220px] md:min-h-[280px] bg-gradient-to-br ${game.gradient}`}
                  >
                    {/* Background Image */}
                    <img
                      src={game.image}
                      alt={game.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20"></div>

                    {/* Content */}
                    <div className="relative p-4 md:p-6 h-full min-h-[220px] md:min-h-[280px] flex flex-col justify-between z-10">
                      {/* Tag & Icon */}
                      <div className="flex justify-between items-start">
                        <span className="px-2 md:px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm text-[10px] md:text-xs font-semibold tracking-wider border border-white/20">
                          {game.tag}
                        </span>
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center border border-white/10">
                          <i className={`${game.icon} text-xl md:text-2xl text-white group-hover:scale-110 transition-transform duration-300`}></i>
                        </div>
                      </div>

                      {/* Game Info */}
                      <div className="mt-auto">
                        <p className="text-orange-400 text-[10px] md:text-xs uppercase tracking-wider mb-1 font-medium">
                          {game.publisher}
                        </p>
                        <h3 className="text-base md:text-xl font-bold mb-1 leading-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                          {game.title}
                        </h3>
                        <p className="text-white/70 text-xs md:text-sm">
                          {game.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-orange-500/0 group-hover:bg-orange-500/10 transition-colors duration-300 pointer-events-none"></div>
                  </div>
                ))}
              </div>

              {/* View All Button */}
              <div className="text-center mt-12">
                <a href="#" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/5 border border-white/10 
                  hover:bg-orange-500 hover:border-orange-500 transition-all duration-300 group">
                  <span className="text-sm uppercase tracking-wider">View All Games</span>
                  <i className="ri-arrow-right-line group-hover:translate-x-1 transition-transform duration-300"></i>
                </a>
              </div>
            </div>
          </section>

          {/* ========================= NEWS SECTION ========================= */}
          <section id="news" className="news-section py-24 px-6 md:px-10 bg-gradient-to-b from-black via-gray-950 to-black relative">
            {/* Decorative line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

            <div className="max-w-7xl mx-auto">
              {/* Section Header */}
              <div className="section-title flex flex-col md:flex-row md:items-end md:justify-between mb-16">
                <div>
                  <span className="inline-block px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 text-xs uppercase tracking-[0.2em] mb-4">
                    Latest Updates
                  </span>
                  <h2 className="text-4xl md:text-6xl font-black">
                    News & <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Events</span>
                  </h2>
                </div>
                <a href="#" className="hidden md:inline-flex items-center gap-2 text-white/50 hover:text-orange-500 transition-colors duration-300 mt-4 md:mt-0">
                  <span className="text-sm uppercase tracking-wider">All News</span>
                  <i className="ri-arrow-right-line"></i>
                </a>
              </div>

              {/* News Grid */}
              <div className="news-grid grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {news.map((article, index) => (
                  <div
                    key={article.id}
                    className={`news-card group relative rounded-2xl overflow-hidden cursor-pointer 
                      ${index === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
                  >
                    {/* Background */}
                    <div className={`absolute inset-0 bg-gradient-to-br 
                      ${index === 0 ? 'from-orange-600/20 via-red-600/10 to-transparent' : 'from-white/5 to-transparent'}`}></div>

                    {/* Glass card */}
                    <div className="relative h-full p-6 border border-white/10 rounded-2xl backdrop-blur-sm 
                      hover:border-orange-500/50 hover:bg-white/5 transition-all duration-300 flex flex-col">

                      {/* Category & Date */}
                      <div className="flex items-center justify-between mb-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wider
                          ${article.category === 'ANNOUNCEMENT' ? 'bg-orange-500/20 text-orange-400' : ''}
                          ${article.category === 'UPDATE' ? 'bg-green-500/20 text-green-400' : ''}
                          ${article.category === 'EVENT' ? 'bg-purple-500/20 text-purple-400' : ''}
                          ${article.category === 'COMMUNITY' ? 'bg-blue-500/20 text-blue-400' : ''}`}>
                          {article.category}
                        </span>
                        <span className="text-white/40 text-xs">{article.date}</span>
                      </div>

                      {/* Content */}
                      <div className="flex-grow">
                        <h3 className={`font-bold mb-3 group-hover:text-orange-400 transition-colors duration-300
                          ${index === 0 ? 'text-2xl md:text-3xl' : 'text-lg'}`}>
                          {article.title}
                        </h3>
                        <p className={`text-white/50 leading-relaxed
                          ${index === 0 ? 'text-base' : 'text-sm line-clamp-2'}`}>
                          {article.excerpt}
                        </p>
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/10">
                        <span className="text-white/40 text-xs flex items-center gap-2">
                          <i className="ri-time-line"></i>
                          {article.readTime}
                        </span>
                        <span className="text-orange-500 text-sm flex items-center gap-1 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                          Read More <i className="ri-arrow-right-line"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ========================= NEWSLETTER SECTION ========================= */}
          <section className="newsletter-section py-24 px-6 md:px-10 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 via-transparent to-pink-600/10"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-orange-500/10 rounded-full blur-[150px] pointer-events-none"></div>

            <div className="max-w-4xl mx-auto relative">
              <div className="text-center p-8 md:p-16 rounded-3xl border border-white/10 backdrop-blur-sm bg-white/[0.02]">
                {/* Icon */}
                <div className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center transform rotate-3 hover:rotate-0 transition-transform duration-300">
                  <i className="ri-mail-star-fill text-4xl"></i>
                </div>

                {/* Content */}
                <h2 className="text-3xl md:text-5xl font-black mb-4">
                  Stay in the <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">Loop</span>
                </h2>
                <p className="text-white/50 max-w-lg mx-auto mb-8">
                  Subscribe to get exclusive updates, early access announcements, and insider news delivered straight to your inbox.
                </p>

                {/* Email Form */}
                <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <div className="flex-grow relative">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full px-6 py-4 rounded-full bg-white/10 border border-white/10 text-white placeholder-white/40
                        focus:outline-none focus:border-orange-500 focus:bg-white/5 transition-all duration-300"
                    />
                    <i className="ri-mail-line absolute right-4 top-1/2 -translate-y-1/2 text-white/40"></i>
                  </div>
                  <button
                    type="submit"
                    className="px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 font-semibold uppercase tracking-wider text-sm
                      hover:shadow-lg hover:shadow-orange-500/25 hover:scale-105 transition-all duration-300">
                    Subscribe
                  </button>
                </form>

                {/* Trust badges */}
                <div className="flex items-center justify-center gap-6 mt-8 text-white/30 text-xs">
                  <span className="flex items-center gap-2">
                    <i className="ri-shield-check-fill text-green-500"></i>
                    No spam, ever
                  </span>
                  <span className="flex items-center gap-2">
                    <i className="ri-lock-fill text-blue-500"></i>
                    Secure & private
                  </span>
                  <span className="flex items-center gap-2">
                    <i className="ri-gift-fill text-orange-500"></i>
                    Exclusive perks
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* ========================= FOOTER SECTION ========================= */}
          <footer className="footer-section w-full bg-gradient-to-b from-black via-gray-950 to-black relative overflow-hidden">

            {/* Decorative top glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[2px] bg-gradient-to-r from-transparent via-orange-500/50 to-transparent"></div>

            {/* Platform Logos Section */}
            <div className="platform-logos py-16 border-b border-white/10">
              <div className="max-w-7xl mx-auto px-6 md:px-10">
                <h4 className="text-center text-white/40 text-sm uppercase tracking-[0.3em] mb-10">Available On</h4>
                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
                  <div className="platform-logo group cursor-pointer">
                    <div className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-all duration-300 hover:scale-110">
                      <i className="ri-playstation-fill text-4xl md:text-5xl group-hover:text-blue-500 transition-colors duration-300"></i>
                      <span className="hidden md:block text-lg font-semibold">PlayStation</span>
                    </div>
                  </div>
                  <div className="platform-logo group cursor-pointer">
                    <div className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-all duration-300 hover:scale-110">
                      <i className="ri-xbox-fill text-4xl md:text-5xl group-hover:text-green-500 transition-colors duration-300"></i>
                      <span className="hidden md:block text-lg font-semibold">Xbox</span>
                    </div>
                  </div>
                  <div className="platform-logo group cursor-pointer">
                    <div className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-all duration-300 hover:scale-110">
                      <i className="ri-steam-fill text-4xl md:text-5xl group-hover:text-blue-400 transition-colors duration-300"></i>
                      <span className="hidden md:block text-lg font-semibold">Steam</span>
                    </div>
                  </div>
                  <div className="platform-logo group cursor-pointer">
                    <div className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-all duration-300 hover:scale-110">
                      <i className="ri-gamepad-fill text-4xl md:text-5xl group-hover:text-yellow-500 transition-colors duration-300"></i>
                      <span className="hidden md:block text-lg font-semibold">Epic Games</span>
                    </div>
                  </div>
                  <div className="platform-logo group cursor-pointer">
                    <div className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-all duration-300 hover:scale-110">
                      <i className="ri-game-fill text-4xl md:text-5xl group-hover:text-orange-500 transition-colors duration-300"></i>
                      <span className="hidden md:block text-lg font-semibold">Rockstar</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Footer Content */}
            <div className="py-16 px-6 md:px-10">
              <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-4 gap-10 md:gap-8">

                  {/* Brand Column */}
                  <div className="md:col-span-1">
                    <h2 className="text-3xl font-black mb-4 bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                      GTA VI
                    </h2>
                    <p className="text-white/50 text-sm leading-relaxed mb-6">
                      Experience the next chapter in the legendary Grand Theft Auto series.
                      Coming soon to a screen near you.
                    </p>
                    <div className="social-links flex gap-4">
                      <a href="#" className="social-icon w-10 h-10 rounded-full bg-white/10 flex items-center justify-center 
                        hover:bg-orange-500 hover:scale-110 transition-all duration-300 group">
                        <i className="ri-twitter-x-fill text-lg group-hover:text-white"></i>
                      </a>
                      <a href="#" className="social-icon w-10 h-10 rounded-full bg-white/10 flex items-center justify-center 
                        hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-500 hover:scale-110 transition-all duration-300 group">
                        <i className="ri-instagram-fill text-lg group-hover:text-white"></i>
                      </a>
                      <a href="#" className="social-icon w-10 h-10 rounded-full bg-white/10 flex items-center justify-center 
                        hover:bg-red-600 hover:scale-110 transition-all duration-300 group">
                        <i className="ri-youtube-fill text-lg group-hover:text-white"></i>
                      </a>
                      <a href="#" className="social-icon w-10 h-10 rounded-full bg-white/10 flex items-center justify-center 
                        hover:bg-blue-600 hover:scale-110 transition-all duration-300 group">
                        <i className="ri-facebook-fill text-lg group-hover:text-white"></i>
                      </a>
                      <a href="#" className="social-icon w-10 h-10 rounded-full bg-white/10 flex items-center justify-center 
                        hover:bg-indigo-600 hover:scale-110 transition-all duration-300 group">
                        <i className="ri-discord-fill text-lg group-hover:text-white"></i>
                      </a>
                    </div>
                  </div>

                  {/* Navigation Links */}
                  <nav className="footer-nav md:col-span-1">
                    <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Explore</h4>
                    <ul className="space-y-3">
                      <li><a href="#" className="footer-link text-white/50 hover:text-orange-500 transition-colors duration-300 text-sm">Home</a></li>
                      <li><a href="#games" className="footer-link text-white/50 hover:text-orange-500 transition-colors duration-300 text-sm">Games</a></li>
                      <li><a href="#news" className="footer-link text-white/50 hover:text-orange-500 transition-colors duration-300 text-sm">News</a></li>
                      <li><a href="#" className="footer-link text-white/50 hover:text-orange-500 transition-colors duration-300 text-sm">Pre-Order</a></li>
                      <li><a href="#" className="footer-link text-white/50 hover:text-orange-500 transition-colors duration-300 text-sm">Trailers</a></li>
                    </ul>
                  </nav>

                  {/* Support Links */}
                  <nav className="footer-nav md:col-span-1">
                    <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Support</h4>
                    <ul className="space-y-3">
                      <li><a href="#" className="footer-link text-white/50 hover:text-orange-500 transition-colors duration-300 text-sm">FAQ</a></li>
                      <li><a href="#" className="footer-link text-white/50 hover:text-orange-500 transition-colors duration-300 text-sm">Contact Us</a></li>
                      <li><a href="#" className="footer-link text-white/50 hover:text-orange-500 transition-colors duration-300 text-sm">System Requirements</a></li>
                      <li><a href="#" className="footer-link text-white/50 hover:text-orange-500 transition-colors duration-300 text-sm">Accessibility</a></li>
                    </ul>
                  </nav>

                  {/* Legal Links */}
                  <nav className="footer-nav md:col-span-1">
                    <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Legal</h4>
                    <ul className="space-y-3">
                      <li><a href="#" className="footer-link text-white/50 hover:text-orange-500 transition-colors duration-300 text-sm">Privacy Policy</a></li>
                      <li><a href="#" className="footer-link text-white/50 hover:text-orange-500 transition-colors duration-300 text-sm">Terms of Service</a></li>
                      <li><a href="#" className="footer-link text-white/50 hover:text-orange-500 transition-colors duration-300 text-sm">Cookie Policy</a></li>
                      <li><a href="#" className="footer-link text-white/50 hover:text-orange-500 transition-colors duration-300 text-sm">EULA</a></li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>

            {/* Age Ratings Section */}
            <div className="border-t border-white/10 py-8 px-6 md:px-10">
              <div className="max-w-7xl mx-auto flex flex-wrap justify-center items-center gap-8 md:gap-12">
                <div className="flex items-center gap-4 opacity-70 hover:opacity-100 transition-opacity duration-300">
                  <div className="w-14 h-18 border-2 border-white/50 rounded flex flex-col items-center justify-center p-2">
                    <span className="text-lg font-bold">M</span>
                    <span className="text-[8px] uppercase">Mature</span>
                    <span className="text-[6px]">17+</span>
                  </div>
                  <div className="text-xs text-white/50 leading-tight">
                    <p>Blood and Gore</p>
                    <p>Intense Violence</p>
                    <p>Strong Language</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 opacity-70 hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-600 to-red-600 flex items-center justify-center">
                    <span className="text-xl font-black">18</span>
                  </div>
                  <span className="text-xs text-white/50">PEGI 18</span>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10 py-6 px-6 md:px-10">
              <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-center items-center gap-4">
                {/* <div className="flex items-center gap-4">
                  <img
                    src=""
                    alt="Brands"
                    className="h-10 md:h-10 object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
                  />
                </div> */}
                <p className="text-white/40 text-xs text-center md:text-right">
                  © 2025 Rockstar Games, Inc. All Rights Reserved. Grand Theft Auto, GTA, and the Rockstar Games logo are trademarks of Take-Two Interactive Software, Inc.
                </p>
              </div>
            </div>

            {/* Decorative bottom glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[200px] bg-gradient-radial from-orange-500/10 via-transparent to-transparent blur-3xl pointer-events-none"></div>
          </footer>
        </div>
      )}
    </>
  );
}

export default App;
