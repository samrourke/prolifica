"use client";
import { useEffect, useMemo, useState } from "react";
import styles from "./Nav.module.css";
import Image from "next/image";
import useResponsiveWidth from "../ResponsiveWidth/ResponsiveWidth";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState("hero");

  const width = useResponsiveWidth();

  useEffect(() => {
    if (width > 768) {
      window.dispatchEvent(new Event("lenis:resume"));
    }
  }, [width]);

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
  function handleNavigate(id) {
    window.dispatchEvent(new Event("lenis:resume"));
    const element = document.getElementById(id);
    if (element) {
      lenis.scrollTo(element); // Use Lenis's scrollTo method [1]
    }
    setIsOpen(false);
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
    if (width > 768) {
      setIsOpen(false);
    }
  }, [width]);

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
        isVisible === "contact" && !isOpen
          ? { backgroundColor: "#fff", "--nav-fg": "#111" }
          : undefined
      }
    >
      <div aria-hidden="true"></div>
      <div className={styles.logoWrapper}>
        <button
          onClick={() => {
            handleNavigate("home");
          }}
        >
          <Image
            height={1094}
            width={3000}
            src="/Prolifica/logo-sm.webp"
            alt="prolifica logo"
            className={styles.logo}
            style={isVisible === "contact" ? { filter: "invert(1)" } : null}
          />
        </button>
      </div>

      <button
        className={`${styles.toggleButton} ${isOpen ? styles.open : ""}`}
        onClick={handleToggle}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <ul className={`${styles.navList} ${isOpen ? styles.active : ""}`}>
        <li className={styles.logoNav}>
          <button
            onClick={() => {
              handleNavigate("roster");
            }}
            className={isVisible === "roster" ? styles.active : ""}
          >
            Roster
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              handleNavigate("contact");
            }}
            className={isVisible === "contact" ? styles.active : ""}
          >
            Contact
          </button>
        </li>
      </ul>
    </nav>
  );
}

/*
Had to wrap the nav links in <button> tags to get around the iOS double click
problem. 
*/
