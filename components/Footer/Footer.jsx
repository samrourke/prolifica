import styles from "./Footer.module.css";
import Link from "next/link";

export default function Footer() {
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

        <Link href="/terms-of-service">Terms and Conditions</Link>
      </div>
    </footer>
  );
}
