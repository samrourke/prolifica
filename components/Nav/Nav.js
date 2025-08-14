"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import styles from "./Nav.module.css";

export default function Navbar({ screenSize }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState("hero");

  //Toggle menu open/close and pause/resume Lenis scroll
  function handleToggle() {
    setIsOpen((prev) => {
      const newState = !prev;
      if (newState) {
        window.dispatchEvent(new Event("lenis:pause")); // stop Lenis
      } else {
        window.dispatchEvent(new Event("lenis:resume")); // resume Lenis
      }
      return newState;
    });
  }

  //Handle navigate click, close menu on mobile and resume Lenis scroll
  function handleNavigate() {
    if (screenSize <= 768) {
      setIsOpen(false); // close menu on mobile
      window.dispatchEvent(new Event("lenis:resume")); // resume Lenis
    }
  }

  //useMemo to create options for IntersectionObserver that do not need to change
  //on every render.

  const options = useMemo(
    () => ({
      root: null,
      rootMargin: "-49% 0px -49% 0px", // a ~2% tall band around viewport center
      threshold: 0, // fire when a section crosses that band
    }),
    []
  );

  //close mobile menu if screen size changes to desktop width.

  useEffect(() => {
    if (screenSize > 768) {
      setIsOpen(false);
    }
  }, [screenSize]);

  //Intersection observer to track visible section and underline nav item

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    if (!sections.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          //setIsVisible, take current state with prev
          //if prev 'current state' is the same as e.target.id, return prev and do nothing
          //otherwise, set isVisible to the new e.target.id i.e new section in view.

          // setIsVisible((prev))=>(prev === e.target.id ? prev : e.target.id)) would be shorthand

          setIsVisible((prev) => {
            if (prev === e.target.id) {
              return prev;
            }
            return e.target.id;
          });
        }
      });
    }, options);

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [options]);

  return (
    <nav
      className={styles.navbar}
      style={
        isVisible === "contact"
          ? { backgroundColor: "#fff", color: "#111" }
          : null
      }
    >
      <div aria-hidden="true"></div>
      <div className={styles.logoWrapper}>
        <Link href="/#home">
          <img
            src="/Prolifica/logo-sm.webp"
            alt="prolifica logo"
            className={styles.logo}
            style={isVisible === "contact" ? { filter: "invert(1)" } : null}
          />
        </Link>
      </div>

      <button
        className={`${styles.toggleButton} ${isOpen ? styles.open : ""}`}
        onClick={handleToggle}
        aria-label="Toggle menu"
      >
        <span
          style={
            isVisible === "contact" && !isOpen ? { filter: "invert(1)" } : null
          }
        ></span>
        <span
          style={
            isVisible === "contact" && !isOpen ? { filter: "invert(1)" } : null
          }
        ></span>
        <span
          style={
            isVisible === "contact" && !isOpen ? { filter: "invert(1)" } : null
          }
        ></span>
      </button>

      <ul className={`${styles.navList} ${isOpen ? styles.active : ""}`}>
        <li className={styles.logoNav}>
          <Link
            href="/#roster"
            onClick={handleNavigate}
            className={isVisible === "roster" ? styles.active : ""}
          >
            Roster
          </Link>
        </li>
        <li>
          <Link
            href="/#contact"
            onClick={handleNavigate}
            className={isVisible === "contact" ? styles.active : ""}
          >
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
}
