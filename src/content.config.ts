import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { blogCategorySlugs, defaultBlogCategory } from './lib/blogCategories';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    category: z.enum(blogCategorySlugs).default(defaultBlogCategory),
    draft: z.boolean().default(false)
  })
});

export const collections = { blog };
