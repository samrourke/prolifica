"use client";

import ProlificaHero from "../../components/Hero/Hero";
import Contact from "../../components/Contact/Contact";
import Roster from "../../components/Roster/Roster";
import Navbar from "../../components/Nav/Nav";
import useResponsiveWidth from "../../components/ResponsiveWidth/ResponsiveWidth";

import { useState, useEffect } from "react";

export default function Home() {
  const width = useResponsiveWidth();

  useEffect(() => {
    if (width > 768) {
      window.dispatchEvent(new Event("lenis:resume"));
    }
  }, [width]);

  return (
    <>
      {" "}
      <Navbar screenSize={width} />
      <ProlificaHero />
      <Roster />
      <Contact />
    </>
  );
}
