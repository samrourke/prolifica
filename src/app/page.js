import ProlificaHero from "../../components/Hero/Hero";
import Contact from "../../components/Contact/Contact";
import Roster from "../../components/Roster/Roster";
import FetchRoster from "../../components/Roster/FetchRoster";

export default function Home() {
  return (
    <>
      <ProlificaHero />
      <FetchRoster />
      <Contact />
    </>
  );
}
