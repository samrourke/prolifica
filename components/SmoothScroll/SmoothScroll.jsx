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
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) return;

    const lenis = new Lenis({
      lerp: 0.07,
      wheelMultiplier: 1,
      smoothTouch: false,
    });
    lenisRef.current = lenis;

    // keep ScrollTrigger in sync
    lenis.on("scroll", ScrollTrigger.update);

    // rAF drive
    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // pause/resume hooks
    const pause = () => lenis.stop();
    const resume = () => lenis.start();
    window.addEventListener("lenis:pause", pause);
    window.addEventListener("lenis:resume", resume);

    // helper: smooth scroll to an element by id
    const smoothTo = (id) => {
      const el = document.getElementById(id.replace(/^#/, ""));
      if (!el) return;
      // prevent native hash jump fighting with Lenis
      // (ensure `html { scroll-behavior: auto; }` in CSS)
      lenis.scrollTo(el, { offset: 0 });
    };

    // 1) Handle on-page anchors: <a href="#section">
    const onDocClick = (e) => {
      const a = e.target.closest("a[href]");
      if (!a) return;

      const href = a.getAttribute("href");
      if (!href) return;

      // case A: same-page hash (#id)
      if (href.startsWith("#")) {
        e.preventDefault();
        smoothTo(href);
        history.replaceState(null, "", href); // keep URL hash updated
        return;
      }

      // case B: site-root hash (/#id)
      // if we are already on '/', intercept and smooth; otherwise let Next navigate
      const matchRootHash = href.match(/^\/#(.+)/);
      if (matchRootHash) {
        const id = matchRootHash[1];
        if (location.pathname === "/") {
          e.preventDefault();
          smoothTo(id);
          history.replaceState(null, "", `/#${id}`);
        } else {
          // mark intended target so we can smooth after navigation
          sessionStorage.setItem("lenis-target-hash", `#${id}`);
          // allow normal navigation; Next will route to '/'
        }
      }
    };
    document.addEventListener("click", onDocClick);

    // 2) Smooth after navigation when URL contains a hash (initial load or returned from other page)
    const onReadyScroll = () => {
      // a) if we stashed a target before routing, use it
      const stored = sessionStorage.getItem("lenis-target-hash");
      const hash = stored || window.location.hash;
      if (hash) {
        // wait a tick so the DOM is ready
        requestAnimationFrame(() => smoothTo(hash));
        if (stored) sessionStorage.removeItem("lenis-target-hash");
      }
      // refresh ScrollTrigger after layout
      requestAnimationFrame(() => ScrollTrigger.refresh());
    };

    // run once on mount
    onReadyScroll();
    // also respond when hash changes without navigation
    const onHashChange = () => {
      // avoid native jump; smooth instead
      requestAnimationFrame(() => smoothTo(window.location.hash));
    };
    window.addEventListener("hashchange", onHashChange);

    return () => {
      window.removeEventListener("lenis:pause", pause);
      window.removeEventListener("lenis:resume", resume);
      window.removeEventListener("hashchange", onHashChange);
      document.removeEventListener("click", onDocClick);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return children;
}
