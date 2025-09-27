// app/page.jsx
import ProlificaHero from "../../components/Hero/Hero";
import Contact from "../../components/Contact/Contact";
import Roster from "../../components/Roster/RosterCopy";

import { sanityFetch } from "@/sanity/lib/live";
import { allArtistsQuery } from "@/sanity/lib/queries";

export default async function Home() {
  const { data: artists } = await sanityFetch({ query: allArtistsQuery });

  console.log(
    "Fetched artists images:",
    artists.map((artist) => artist.modalImage)
  );

  return (
    <>
      <ProlificaHero artistRoster={artists} />
      <Roster artistRoster={artists} />
      <Contact />
    </>
  );
}
