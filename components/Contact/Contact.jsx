"use client";
import styles from "./Contact.module.css";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Footer from "../Footer/Footer";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const contactRef = useRef(null);

  const socials = [
    {
      platform: "Instagram",
      link: "https://www.instagram.com/prolificamanagement/",
      image: "/Socials/insta-cropped.svg",
    },
    {
      platform: "X",
      link: "https://x.com/prolifica/",
      image: "/Socials/x-cropped.svg",
    },

    {
      platform: "Facebook",
      link: "https://www.facebook.com/prolificamanagement",
      image: "/Socials/facebook-cropped.svg",
    },
  ];

  useEffect(() => {
    // Respect reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Use GSAP context to scope selectors & clean up
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contactRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: contactRef.current,
            start: "top 80%", // when section hits 80% of viewport
            once: true, // fire only once
          },
        }
      );
    }, contactRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" className={styles.contact}>
      <div className={styles.contactText} ref={contactRef}>
        <h1>Get In Touch</h1>
        <h1>
          <a href="mailto:info@prolifica.co.uk">info@prolifica.co.uk</a>
        </h1>
      </div>
      <Footer />
    </section>
  );
}
