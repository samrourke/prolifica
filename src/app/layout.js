import SmoothScroll from "../../components/SmoothScroll/SmoothScroll";
import Head from "./head";
import Navbar from "../../components/Nav/Nav";
import "./globals.css";

import { Space_Grotesk } from "next/font/google";

const space_grotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--space-grotesk", // Optional: for CSS variables
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={space_grotesk.variable}>
      <Head></Head>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
