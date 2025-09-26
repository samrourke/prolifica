"use client";

import SmoothScroll from "../../components/SmoothScroll/SmoothScroll";
import Head from "./head";
import Navbar from "../../components/Nav/Nav";
import "./globals.css";
import { Space_Grotesk } from "next/font/google";
import { usePathname } from "next/navigation";

const space_grotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--space-grotesk",
});

export default function RootLayout({ children }) {
  // Determine if we are in the Sanity Studio based on the pathname and disable Lenis smooth scroll
  //so that it doesn't interfere with the Studio's own scroll handling.
  const pathname = usePathname();
  const inStudio = pathname?.startsWith("/studio");

  return (
    <html lang="en" className={space_grotesk.variable}>
      <Head />
      <body>
        {!inStudio && <Navbar />}
        {inStudio ? children : <SmoothScroll>{children}</SmoothScroll>}
      </body>
    </html>
  );
}
