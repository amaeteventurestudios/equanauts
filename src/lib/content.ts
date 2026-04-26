import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type Collection =
  | "incidents"
  | "characters"
  | "realms"
  | "gateways"
  | "orders"
  | "transmissions"
  | "relics"
  | "episodes";

export type ArchiveRecord = {
  slug: string;
  collection: Collection;
  title: string;
  status?: string;
  date?: string;
  excerpt?: string;
  classification?: string;
  coordinates?: string;
  order?: number;
  body: string;
};

const contentRoot = path.join(process.cwd(), "content");

export function getCollection(collection: Collection): ArchiveRecord[] {
  const directory = path.join(contentRoot, collection);

  if (!fs.existsSync(directory)) {
    return [];
  }

  return fs
    .readdirSync(directory)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const source = fs.readFileSync(path.join(directory, file), "utf8");
      const { data, content } = matter(source);

      return {
        slug,
        collection,
        title: data.title ?? slug,
        status: data.status,
        date: data.date,
        excerpt: data.excerpt,
        classification: data.classification,
        coordinates: data.coordinates,
        order: data.order,
        body: content.trim(),
      };
    })
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
}

export function getRecord(collection: Collection, slug: string) {
  return getCollection(collection).find((record) => record.slug === slug);
}

export function getArchiveRecords() {
  const collections: Collection[] = [
    "incidents",
    "gateways",
    "orders",
    "realms",
    "transmissions",
    "relics",
    "characters",
    "episodes",
  ];

  return collections.flatMap((collection) => getCollection(collection));
}
