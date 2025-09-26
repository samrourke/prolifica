import { groq } from "next-sanity";

export const allArtistsQuery = groq`
  *[_type == "artist"] | order(orderRank) {
    _id,
    name,
    _createdAt,
    mobileKey,
    mobileImage,
    modalImage,
    socials[] { platform, link }
  }
`;
