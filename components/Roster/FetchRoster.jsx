import { sanityFetch } from "@/sanity/lib/live";
import { allArtistsQuery } from "@/sanity/lib/queries";
import Roster from "./RosterCopy";

export default async function FetchRoster() {
  const { data: artists } = await sanityFetch({ query: allArtistsQuery });

  return <Roster artistRoster={artists} />;
}
