"use client";

import styles from "./Roster.module.css";
import roster from "../../data";
import Modal from "../Modal/Modal";
import ArtistModal from "../ArtistModal/ArtistModal";
import { useState } from "react";

export default function Roster() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState(null);

  function handleOpenModal(artist) {
    setSelectedArtist(artist);
    setIsOpen(true);
    window.dispatchEvent(new Event("lenis:pause")); // ✅ stop Lenis
  }

  function handleCloseModal() {
    setIsOpen(false);
    window.dispatchEvent(new Event("lenis:resume")); // ✅ resume Lenis
  }
  return (
    <section
      id="roster"
      className={styles.roster}
      aria-labelledby="roster-heading"
    >
      <div className={styles.gridContainer}>
        {roster.map((artist, i) => (
          <button
            key={i}
            className={styles.gridItem}
            onClick={() => handleOpenModal(artist.artist)}
            aria-label={artist.artist}
          >
            <figure className={styles.card}>
              <div className={styles.imageWrap}>
                <img
                  src={artist.image}
                  alt={artist.artist}
                  loading="lazy"
                  decoding="async"
                />
                {/* soft gradient scrim */}
                <div className={styles.scrim} aria-hidden />
              </div>

              <figcaption className={styles.caption}>
                <h2 className={styles.name}>{artist.artist}</h2>
                {artist.meta && <p className={styles.meta}>{artist.meta}</p>}
              </figcaption>

              {/* focus ring for keyboard nav */}
              <span className={styles.focusRing} aria-hidden />
            </figure>
          </button>
        ))}
      </div>
      <Modal
        isOpen={isOpen}
        onClose={handleCloseModal}
        titleId="roster-modal-title"
      >
        <ArtistModal selectedArtist={selectedArtist} />
      </Modal>
    </section>
  );
}
