import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    headline: z.string().optional(),
    description: z.string(),
    date: z.string(),
    pubDate: z.string().optional(),
    tag: z.string(),
    author: z.string().default('Vern Kuato'),
    image: z.string().default('https://vernkuato.zone.id/assets/profile.webp'),
    order: z.number().optional()
  })
});

export const collections = {
  blog: blogCollection
};
