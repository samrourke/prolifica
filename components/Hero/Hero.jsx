"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import styles from "./Hero.module.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function ProlificaHero({
  images = [
    "/Prolifica/3lijah.png",
    "/Prolifica/candi-staton.webp",
    "/Prolifica//circa-waves.jpg",
    "/Prolifica/courting.png",
    "/Prolifica/disgusting-sisters.jpg",
    "/Prolifica/friendly-fires.jpg",
    "/Prolifica/kieran-shudall.png",
    "/Prolifica/maximo-park.jpg",
    "/Prolifica/the-north.jpg",
    "/Prolifica/two-door.jpg",
    "/Prolifica/yves-jarvis.jpg",
  ],
  logoSrc = "/logo.png",
}) {
  const [index, setIndex] = useState(0); // not random here
  const indexRef = useRef(0); // live pointer for handlers

  // Refs for elements
  const slidesRef = useRef([]);
  const topBarRef = useRef(null);
  const bottomBarRef = useRef(null);
  const logoRef = useRef(null);
  const stageRef = useRef(null);
  const navRef = useRef(null);

  const introDone = useRef(false);
  const lastMoveTime = useRef(0);

  useEffect(() => {
    if (!images.length) return;

    const rnd = Math.floor(Math.random() * images.length);
    indexRef.current = rnd;
    setIndex(rnd);

    // GSAP init using rnd (not index)
    slidesRef.current.forEach((el, i) => {
      gsap.set(el, {
        opacity: i === rnd ? 1 : 0,
        filter: "blur(2px) brightness(0.8)",
      });
    });

    gsap.set([topBarRef.current, bottomBarRef.current], { height: "50vh" });
    gsap.set(logoRef.current, { opacity: 0, scale: 0.98 });

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.to([topBarRef.current, bottomBarRef.current], {
      height: "15svh",
      duration: 1.25,
      stagger: { each: 0.02 },
    })
      .to(
        [topBarRef.current, bottomBarRef.current],
        {
          height: "15svh",
          duration: 0.4,
          ease: "power1.out",
        },
        "-=0.5"
      )
      .to(
        slidesRef.current[rnd],
        {
          filter: "blur(0px) brightness(1)",
          duration: 0.9,
        },
        "-=0.9"
      )
      .fromTo(
        logoRef.current,
        { opacity: 0, scale: 1.02 },
        { opacity: 1, scale: 1, duration: 0.7 },
        "-=0.6"
      )
      .fromTo(
        navRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, delay: 0.2 },
        "-=0.6"
      )
      .add(() => {
        introDone.current = true;
      });

    // run once (or when images length changes)
  }, [images.length]);

  // 3) use the ref inside step() so listeners don’t need re-binding
  const step = (dir) => {
    if (!images.length) return;
    const currentIdx = indexRef.current;
    const current = slidesRef.current[currentIdx];
    const nextIdx = (currentIdx + dir + images.length) % images.length;
    const next = slidesRef.current[nextIdx];

    const dx = dir > 0 ? 2 : -2;
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
        { xPercent: -dx, scale: 1.05 },
        { xPercent: 0, scale: 1.02, duration: 1.2, ease: "power2.out" },
        0
      );

    indexRef.current = nextIdx;
    setIndex(nextIdx);
  };

  //Mouse move handler for image change
  useEffect(() => {
    const onMove = (e) => {
      if (!introDone.current) return;

      const active = slidesRef.current[indexRef.current];
      if (active && stageRef.current) {
        const rect = stageRef.current.getBoundingClientRect();
        const cx = (e.clientX - rect.left) / rect.width - 0.2;
        const cy = (e.clientY - rect.top) / rect.height - 0.2;

        // Parallax still happens everywhere
        gsap.to(active, {
          x: cx * 8,
          y: cy * 6,
          scale: 1.02,
          duration: 0.3,
          ease: "power2.out",
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
        step(1);
        lastMoveTime.current = now;
      }
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
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
        {images.map((src, i) => (
          <div
            key={i}
            ref={(el) => (slidesRef.current[i] = el)}
            className={styles.slide}
            aria-hidden={i !== index}
          >
            <img src={src} alt="" />
          </div>
        ))}
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
        <h1>
          <a href="#roster">Roster</a>
        </h1>
        <h1>
          <a href="#contact">Contact</a>
        </h1>
      </div>
    </section>
  );
}
