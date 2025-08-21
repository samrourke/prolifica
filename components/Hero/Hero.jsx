"use client";

import { useEffect, useRef, useState, useLayoutEffect } from "react";
import gsap from "gsap";
import styles from "./Hero.module.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function ProlificaHero({
  images = [
    "/compressed/3lijah.webp",
    "/compressed/candiStaton.webp",
    "/compressed/circaWaves.webp",
    "/compressed/courting.webp",
    "/compressed/disgustingSisters.webp",
    "/compressed/friendlyFires.webp",
    "/compressed/kieranShudall.webp",
    "/compressed/maximoPark.webp",
    "/compressed/theNorth.webp",
    "/compressed/twoDoor.webp",
    "/compressed/yvesJarvis.webp",
  ],
  mobile = [
    "/mobile/candiStaton.webp",
    "/mobile/circaWaves.webp",
    "/mobile/courting.webp",
    "/mobile/disgustingSisters.webp",
    "/mobile/friendlyFires.webp",
    "/mobile/kieranShudall.webp",
    "/mobile/maximoPark.webp",
    "/mobile/theNorth.webp",
    "/mobile/twoDoor.webp",
    "/mobile/yvesJarvis.webp",
  ],

  logoSrc = "/logo.png",
}) {
  const [index, setIndex] = useState(0); // not random here
  const indexRef = useRef(0); // live pointer for handlers

  //Handle navigate click, close menu on mobile and resume Lenis scroll
  function handleNavigate(id) {
    const element = document.getElementById(id);
    if (element) {
      lenis.scrollTo(element); // Use Lenis's scrollTo method [1]
    }
  }

  // Refs for elements
  const slidesRef = useRef([]);
  const topBarRef = useRef(null);
  const bottomBarRef = useRef(null);
  const logoRef = useRef(null);
  const stageRef = useRef(null);
  const navRef = useRef(null);

  const introDone = useRef(false);
  const lastMoveTime = useRef(0);

  //Intro Animations
  useEffect(() => {
    if (!images.length) return;

    const rnd = Math.floor(Math.random() * images.length);
    indexRef.current = rnd;
    setIndex(rnd);

    // Initial conditions for slides, opacity 0 unless i is equal to rnd
    slidesRef.current.forEach((el, i) => {
      gsap.set(el, {
        opacity: i === rnd ? 1 : 0,
        filter:
          i === rnd ? "blur(1px) brightness(0.8)" : "blur(0px) brightness(1)",
      });
    });

    gsap.set([topBarRef.current, bottomBarRef.current], { height: "50vh" });
    gsap.set(logoRef.current, { opacity: 0, scale: 0.98 });
    gsap.set(navRef.current, { opacity: 0 });

    const tl = gsap.timeline({ defaults: { ease: "circ.out" } });
    tl.to(
      [topBarRef.current, bottomBarRef.current],
      {
        height: "15svh",
        duration: 0.8,
        delay: 0.3,
      },
      "<"
    )

      .to(
        [logoRef.current, navRef.current],
        { opacity: 1, duration: 0.6, scale: 1 },
        "-=0.5"
      )
      .add(() => {
        introDone.current = true;
      });
    // run once (or when images length changes)
  }, [images.length]);

  // 3) function to update slides and stored indexes, called
  //    inside the mousemove function below.

  const step = (num) => {
    if (!images.length) return;

    //currentIdx set to initial slide which is randomised in the code above
    const currentIdx = indexRef.current;

    //current is set to the DOM node stored in slidesRef at index : currentIdx
    const current = slidesRef.current[currentIdx];

    //set nextIdx to current index + 1 unless it is last slide then set to 1.
    // (x) remainder y = x, when x < y
    // (x) remainder y = 0 when x = y

    const nextIdx = (currentIdx + num) % images.length;
    const next = slidesRef.current[nextIdx];

    gsap
      .timeline()
      .to(current, { opacity: 0, duration: 0.9, ease: "power2.out" }, 0)
      .fromTo(
        next,
        { opacity: 0 },
        { opacity: 1, duration: 0.9, ease: "power2.out" },
        0
      )
      .fromTo(
        next,
        { xPercent: -2, scale: 1.05 },
        { xPercent: 0, scale: 1.02, duration: 1.2, ease: "power2.out" },
        0
      );

    indexRef.current = nextIdx;
    setIndex(nextIdx);
  };

  //Mouse move handler for image change
  useEffect(() => {
    const onMove = (e) => {
      console.log(introDone.current);
      if (!introDone.current) return;

      const active = slidesRef.current[indexRef.current];
      if (active && stageRef.current) {
        // Parallax slide change follows mouse move.
        //dividing cursor x co-ords by window width always gives a number between 0 and 1.
        // use this info to vary the x and y movement in the gsap.to() below

        const cx = e.clientX / window.innerWidth - 0.5; // -0.5 .. 0.5
        const cy = e.clientY / window.innerHeight - 0.5;

        gsap.to(active, {
          x: cx * 16, // tweak range to taste
          y: cy * 12,
          scale: 1.02,
          duration: 0.3,
          ease: "power2.out",
          overwrite: "auto",
        });
      }

      // --- DEAD ZONE LOGIC ---
      const { innerWidth } = window;
      const leftBound = innerWidth / 3; // 33%
      const rightBound = innerWidth * (2 / 3); // 66%

      // Only change slides if in the middle third
      if (e.clientX >= leftBound && e.clientX <= rightBound) {
        const now = Date.now();
        if (now - lastMoveTime.current < 500) return; // throttle
        step(1); //step function called to increment by 1.
        lastMoveTime.current = now;
      }
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  //Parallax effect with escape for non desktop to avoid the glitchy parallax on smaller devices
  // (hover:hover) and (pointer:fine) isolates desktop/trackpad devices

  useLayoutEffect(() => {
    // respect reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // parallax: move slide image up and slightly shrink as you scroll past the hero
    const tween = gsap.to(slidesRef.current, {
      y: 420,
      scale: 0.98,
      ease: "none",
      scrollTrigger: {
        trigger: stageRef.current, // the hero section
        start: "top top",
        end: "bottom top", // over the hero’s height
        scrub: 0.6, // smooth follow
      },
    });

    return () => {
      if (tween?.scrollTrigger) tween.scrollTrigger.kill();
      tween?.kill();
    };
  }, [introDone.current]); // run once after intro

  return (
    <section className={styles.hero} id="home" ref={stageRef}>
      {/* Slides */}
      <div className={styles.slides}>
        {images.map((desktopSrc, i) => {
          const mobileSrc = mobile[i] ?? desktopSrc; // fallback if missing
          const isActive = i === index;

          return (
            <div
              key={i}
              ref={(el) => (slidesRef.current[i] = el)}
              className={styles.slide}
              aria-hidden={!isActive}
            >
              <picture>
                {/* Use the smaller mobile asset on narrow/touch devices */}
                <source media="(max-width: 768px)" srcSet={mobileSrc} />
                {/* Fallback/desktop image */}
                <img
                  src={desktopSrc}
                  alt="Image of Prolifica Management artist"
                  loading={isActive ? "eager" : "lazy"}
                  decoding="async"
                  fetchPriority={isActive ? "high" : "low"}
                  sizes="100vw" // full-bleed hero; let the browser know
                  draggable={false}
                />
              </picture>
            </div>
          );
        })}
        <div className={styles.scrim} />
        <div className={styles.grain} />
      </div>

      {/* Letterbox */}
      <div ref={topBarRef} className={`${styles.letterbox} ${styles.top}`} />
      <div
        ref={bottomBarRef}
        className={`${styles.letterbox} ${styles.bottom}`}
      />

      {/* Logo */}
      <div ref={logoRef} className={styles.logoWrapper}>
        <img src={logoSrc} alt="Prolifica" className={styles.logo} />
      </div>

      {/* Nav */}
      <div ref={navRef} className={styles.nav}>
        <button
          onClick={() => {
            handleNavigate("roster");
          }}
        >
          <h1>Roster</h1>
        </button>

        <button
          onClick={() => {
            handleNavigate("contact");
          }}
        >
          {" "}
          <h1>Contact</h1>
        </button>
      </div>
    </section>
  );
}
