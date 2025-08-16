"use client";

import styles from "./ArtistModal.module.css";
import data from "../../data";

export default function ArtistModal({ selectedArtist }) {
  const artist = data.find((a) => a.artist === selectedArtist);
  if (!artist) return null;

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
    <div className={styles.overlayCard} role="document">
      {/* Full-bleed image */}
      <img
        className={styles.bg}
        src={artist.image}
        alt={artist.artist}
        loading="lazy"
        decoding="async"
      />

      {/* Scrims for readability */}
      <div className={styles.vignette} aria-hidden />
      <div className={styles.gradient} aria-hidden />

      {/* Content overlaid */}
      <header className={styles.header}>
        <h1 className={styles.title}>{artist.artist}</h1>
      </header>

      {!!artist.socials?.length && (
        <nav
          className={styles.socials}
          aria-label={`${artist.artist} social links`}
        >
          {artist.socials.map((s, i) => (
            <a
              key={i}
              href={s.link}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label={s.platform}
              title={s.platform}
            >
              <img src={icons[s.platform]} alt="" className={styles.icon} />
            </a>
          ))}
        </nav>
      )}
    </div>
  );
}
