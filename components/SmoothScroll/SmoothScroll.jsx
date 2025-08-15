// components/SmoothScroll.jsx
"use client";

import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) return;

    const lenis = new Lenis({
      lerp: 0.07,
      wheelMultiplier: 1,
      smoothTouch: false,
    });

    lenisRef.current = lenis;
    window.lenis = lenis; // for debugging + manual scroll if needed

    // Sync ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Drive with requestAnimationFrame
    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // Listen for pause/resume events (for modal handling)
    const pause = () => lenis.stop();
    const resume = () => lenis.start();
    window.addEventListener("lenis:pause", pause);
    window.addEventListener("lenis:resume", resume);

    // Smooth scroll to element when URL hash changes (even via router.push)
    let prevHash = window.location.hash;
    const onHashChange = () => {
      const hash = window.location.hash;
      if (hash && hash !== prevHash) {
        prevHash = hash;
        const el = document.getElementById(hash.replace(/^#/, ""));
        if (el) lenis.scrollTo(el);
      }
    };

    window.addEventListener("hashchange", onHashChange);

    // Run on mount if hash already exists (e.g. on reload)
    if (window.location.hash) {
      const el = document.getElementById(
        window.location.hash.replace(/^#/, "")
      );
      if (el) lenis.scrollTo(el, { immediate: true });
    }

    return () => {
      window.removeEventListener("lenis:pause", pause);
      window.removeEventListener("lenis:resume", resume);
      window.removeEventListener("hashchange", onHashChange);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return children;
}
