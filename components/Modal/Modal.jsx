// components/Modal.jsx
"use client";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import styles from "./Modal.module.css";

/*REUSABLE MODAL COMPONENT FUNCTION

Using the children prop to allow for flexible content inside depending on the 
project. 

*/

export default function Modal({
  isOpen,
  onClose,
  titleId = "modal-title",
  children,
}) {
  const backdropRef = useRef(null);
  const dialogRef = useRef(null);

  if (!isOpen) return null;

  return createPortal(
    <div className={styles.backdrop} ref={backdropRef} aria-hidden={false}>
      <div
        className={styles.dialog}
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
      >
        <button
          className={styles.close}
          onClick={onClose}
          aria-label="Close modal"
        >
          ✕
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}
