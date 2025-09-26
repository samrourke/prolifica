import { defineType, defineField } from "sanity";
import {
  orderRankField,
  orderRankOrdering,
} from "@sanity/orderable-document-list";

export const Artists = defineType({
  name: "artist",
  title: "Artists",
  type: "document",
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: "artist" }), // 👈 this adds a hidden order field
    defineField({ name: "name", title: "Artist Name", type: "string" }),

    defineField({
      name: "mobileImage",
      title: "Mobile Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "modalImage",
      title: "Large Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "socials",
      title: "Social Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "platform",
              type: "string",
              title: "Platform",
              options: {
                list: [
                  { title: "Twitter", value: "X" },
                  { title: "Instagram", value: "Instagram" },
                  { title: "YouTube", value: "YouTube" },
                  { title: "Spotify", value: "Spotify" },
                  { title: "Website", value: "Website" },
                  { title: "Apple", value: "Apple" },
                  { title: "TikTok", value: "TikTok" },
                  { title: "Facebook", value: "Facebook" },
                ],
              },
            },
            { name: "link", type: "url", title: "Link" },
          ],
        },
      ],
    }),
    defineField({
      name: "mobileKey",
      title: "Mobile Position",
      type: "string",
    }),
  ],
});
