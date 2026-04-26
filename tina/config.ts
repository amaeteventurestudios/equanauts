import { defineConfig } from "tinacms";
import type { Collection, TinaField } from "@tinacms/schema-tools";

const sharedFields: TinaField[] = [
  {
    type: "string",
    name: "title",
    label: "Title",
    isTitle: true,
    required: true,
  },
  {
    type: "string",
    name: "status",
    label: "Status",
  },
  {
    type: "string",
    name: "classification",
    label: "Classification",
  },
  {
    type: "string",
    name: "excerpt",
    label: "Excerpt",
    ui: {
      component: "textarea",
    },
  },
  {
    type: "number",
    name: "order",
    label: "Sort Order",
  },
  {
    type: "rich-text",
    name: "body",
    label: "Body",
    isBody: true,
  },
];

const archiveCollections: Collection[] = [
  "incidents",
  "characters",
  "realms",
  "gateways",
  "orders",
  "transmissions",
  "relics",
  "episodes",
].map((name) => ({
  name,
  label: name.charAt(0).toUpperCase() + name.slice(1),
  path: `content/${name}`,
  format: "mdx",
  fields:
    name === "incidents" || name === "gateways"
      ? [
          ...sharedFields,
          {
            type: "string",
            name: "coordinates",
            label: "Coordinates",
          },
          {
            type: "datetime",
            name: "date",
            label: "Date",
          },
        ]
      : name === "transmissions"
        ? [
            ...sharedFields,
            {
              type: "datetime",
              name: "date",
              label: "Date",
            },
          ]
        : sharedFields,
}));

export default defineConfig({
  branch: process.env.NEXT_PUBLIC_TINA_BRANCH || process.env.HEAD || "main",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  schema: {
    collections: archiveCollections,
  },
});
