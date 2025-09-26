"use client";

import styles from "./Roster.module.css";
import { urlFor } from "@/sanity/lib/imageUrl";
import Modal from "../Modal/Modal";
import ArtistModal from "../ArtistModal/ArtistModal";
import { useState, useMemo } from "react";
import useResponsiveWidth from "../ResponsiveWidth/ResponsiveWidth";

export default function Roster({ artistRoster }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState(null);

  // monitor viewport width to change roster order on single column layout
  const width = useResponsiveWidth();
  const isMobile = width < 800;

  // Order items depending on viewport key
  const ordered = useMemo(() => {
    if (isMobile) {
      const sorted = [...artistRoster].sort((a, b) => {
        const aKey = Number(a.mobileKey?.trim?.()) || Infinity;
        const bKey = Number(b.mobileKey?.trim?.()) || Infinity;

        if (aKey !== bKey) {
          return aKey - bKey;
        }

        // Log for debugging
        console.log("Same mobileKey, comparing by _createdAt:");
        console.log("a:", a.name, a._createdAt);
        console.log("b:", b.name, b._createdAt);

        return new Date(b._createdAt) - new Date(a._createdAt);
      });

      return sorted;
    }

    return artistRoster;
  }, [isMobile, artistRoster]);

  function handleOpenModal(artist) {
    setSelectedArtist(artist);

    setIsOpen(true);
    window.dispatchEvent(new Event("lenis:pause"));
  }

  function handleCloseModal() {
    setIsOpen(false);
    window.dispatchEvent(new Event("lenis:resume"));
  }

  return (
    <section
      id="roster"
      className={styles.roster}
      aria-labelledby="roster-heading"
    >
      <div className={styles.gridContainer}>
        {ordered.map((artist) => (
          <button
            key={artist._id}
            className={styles.gridItem}
            onClick={() => handleOpenModal(artist)}
          >
            <figure className={styles.card}>
              <div className={styles.imageWrap}>
                <img
                  src={urlFor(artist.mobileImage)
                    .width(700)
                    .format("webp")
                    .url()}
                  alt={`image of ${artist.name}`}
                  loading="lazy"
                  decoding="async"
                />
                <div className={styles.scrim} aria-hidden />
                <figcaption className={styles.caption}>
                  <h2 className={styles.name}>{artist.name}</h2>
                </figcaption>
                <span className={styles.focusRing} aria-hidden />
              </div>
            </figure>
          </button>
        ))}
      </div>

      <Modal
        isOpen={isOpen}
        onClose={handleCloseModal}
        titleId="roster-modal-title"
      >
        <ArtistModal selectedArtist={selectedArtist} isOpen={isOpen} />
      </Modal>
    </section>
  );
}
