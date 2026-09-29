import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const projects = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/projects" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      byline: z.string(),
      cover: image(),
      order: z.number().default(99),
      comingSoon: z.boolean().default(false),
      gallery: z.array(image()).optional(),
    }),
});

const reviews = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/reviews" }),
  // Covers are hosted by the publication, so they stay remote URLs rather than
  // the image() helper projects use — nothing to keep in sync in src/assets.
  schema: z.object({
    title: z.string(),
    venue: z.string(),
    date: z.coerce.date(),
    quote: z.string(),
    cover: z.string().url(),
    url: z.string().url(),
  }),
});

export const collections = { projects, reviews };
