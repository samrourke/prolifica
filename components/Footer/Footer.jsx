"use client";
import styles from "./Footer.module.css";
import Modal from "../Modal/Modal";
import TermsAndConditions from "../TermsModal/Terms";
import { useState } from "react";

export default function Footer() {
  const [isOpen, setIsOpen] = useState(false);
  function handleOpenModal() {
    setIsOpen(true);
    window.dispatchEvent(new Event("lenis:pause"));
    document.body.style.overflow = "hidden";
  }
  function handleCloseModal() {
    setIsOpen(false);
    window.dispatchEvent(new Event("lenis:resume")); // ✅ resume Lenis
    document.body.style.overflow = "";
  }
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <p>&copy; {new Date().getFullYear()} Prolifica Management</p>

        <h2>
          Website Designed By{" "}
          <a
            className={styles.link}
            href="http://www.deadculture.co.uk"
            target="_blank"
          >
            Dead Culture
          </a>
        </h2>

        <button onClick={handleOpenModal}>Terms and Conditions</button>
      </div>
      <Modal isOpen={isOpen} onClose={handleCloseModal}>
        <TermsAndConditions />
      </Modal>
    </footer>
  );
}
