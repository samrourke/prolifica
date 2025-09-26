"use client";

import styles from "./ArtistModal.module.css";
import { urlFor } from "@/sanity/lib/imageUrl";

export default function ArtistModal({ selectedArtist, isOpen }) {
  if (!selectedArtist) return null;

  const icons = {
    Facebook: "/Socials/facebook-cropped.svg",
    Instagram: "/Socials/insta-cropped.svg",
    Spotify: "/Socials/spotify-cropped.svg",
    TikTok: "/Socials/tiktok-cropped.svg",
    Website: "/Socials/World-edit.png",
    YouTube: "/Socials/youtube-cropped.svg",
    X: "/Socials/x-cropped.svg",
    Apple: "/Socials/apple.svg",
  };

  return (
    <div className={styles.overlayCard} role="dialog" aria-modal="true">
      <img
        className={styles.bg}
        src={urlFor(selectedArtist.modalImage).width(1024).format("webp").url()}
        alt={selectedArtist.name}
        loading="lazy"
        decoding="async"
      />

      <div className={styles.vignette} aria-hidden />
      <div className={styles.gradient} aria-hidden />

      <header className={styles.header}>
        <h1 className={styles.title}>{selectedArtist.name}</h1>
      </header>

      {!!selectedArtist.socials?.length && (
        <nav
          className={styles.socials}
          aria-label={`${selectedArtist.name} social links`}
        >
          {selectedArtist.socials.map((s, i) => (
            <a
              key={i}
              href={s.link}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label={s.platform}
              title={s.platform}
            >
              <img
                src={icons[s.platform] || "/Socials/World-edit.png"}
                alt=""
                className={styles.icon}
              />
            </a>
          ))}
        </nav>
      )}
    </div>
  );
}
