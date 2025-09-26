"use client";

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.jsx` route
 */

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { Card, Stack, Text } from "@sanity/ui";

import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { dataset, projectId } from "./src/sanity/env";
import { schemaTypes } from "./src/sanity/schemaTypes";
const Icon = () => (
  <img
    src="/favicon-dark.svg"
    alt="Prolifica Icon"
    style={{
      backgroundColor: "#111",
      height: "25px",
      width: "25px",
      padding: "2px",
    }}
  />
);

const Logo = () => {
  return (
    <img
      src="/Prolifica/logo-sm.webp"
      alt="Prolifica Logo"
      style={{ height: "4rem", width: "auto", backgroundColor: "#111" }}
    ></img>
  );
};
function CustomNavbar(NavbarProps) {
  return (
    <Stack space={3} padding={3}>
      <Logo />
      {NavbarProps.renderDefault(NavbarProps)} {/* Render the default navbar */}
    </Stack>
  );
}

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  icon: Icon,

  schema: {
    types: schemaTypes,
  },
  plugins: [
    structureTool({
      structure: (S, context) =>
        S.list()
          .title("Artists")
          .items([
            orderableDocumentListDeskItem({ type: "artist", S, context }),
            ...S.documentTypeListItems().filter(
              (listItem) => listItem.getId() !== "artist"
            ),
          ]),
    }),
    visionTool(),
  ],
  studio: {
    components: {
      navbar: CustomNavbar,
    },
  },
});
