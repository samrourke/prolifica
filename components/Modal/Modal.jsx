"use client";
import { useLayoutEffect, useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import styles from "./Modal.module.css";

export default function Modal({
  isOpen,
  onClose,
  titleId = "modal-title",
  children,
}) {
  const backdropRef = useRef(null);
  const dialogRef = useRef(null);
  const blackCardRef = useRef(null);
  const topCardRef = useRef(null);
  const bottomCardRef = useRef(null);
  const tlRef = useRef(null);

  // Keep mounted while exit animation runs
  const [shouldRender, setShouldRender] = useState(isOpen);

  // Mount when opening
  useEffect(() => {
    if (isOpen) setShouldRender(true);
  }, [isOpen]);

  // Build timeline once modal nodes exist
  useLayoutEffect(() => {
    if (!shouldRender) return;

    const backdrop = backdropRef.current;

    const top = topCardRef.current;
    const bottom = bottomCardRef.current;
    //safety check that backdrop and card exist
    if (!backdrop || !top || !bottom) return;

    gsap.set(backdrop, { opacity: 0 });
    gsap.set(top, { scaleY: 1, transformOrigin: "top" });
    gsap.set(bottom, { scaleY: 1, transformOrigin: "bottom" });

    const tl = gsap.timeline({ paused: true });
    tl.to(backdrop, {
      opacity: 1,
      duration: 0.3,
      ease: "power2.out",
    })
      .to(
        top,
        { scaleY: 0, duration: 0.6, delay: 0.5, ease: "circ.inOut" },
        "-=0.2"
      )
      .to(bottom, { scaleY: 0, duration: 0.6, ease: "circ.inOut" }, "<");

    // "<" means to start at same time as previous .to()

    tlRef.current = tl;
    tl.play(0);

    return () => {
      tl.kill();
      tlRef.current = null;
    };
  }, [shouldRender]);

  // Watch isOpen changes → reverse when closing
  useEffect(() => {
    const tl = tlRef.current;
    if (!tl) return;

    if (!isOpen) {
      //GSAP gives us these methods .eventcallback and onReverseComplete, onComplete etc
      //this means, when onReverseComplete has finished, carry out the following...

      tl.reverse().eventCallback("onReverseComplete", () => {
        setShouldRender(false); // finally unmount
        onClose?.(); // call onClose, onClose?.() means call it if it exists
      });
    }
  }, [isOpen, onClose]);

  if (!shouldRender) return null;

  return createPortal(
    <div className={styles.backdrop} ref={backdropRef} aria-hidden={false}>
      <div className={styles.topCard} ref={topCardRef} aria-hidden="true" />
      <div
        className={styles.bottomCard}
        ref={bottomCardRef}
        aria-hidden="true"
      />
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
          onClick={() => {
            // just flip isOpen=false in parent
            onClose?.();
          }}
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
