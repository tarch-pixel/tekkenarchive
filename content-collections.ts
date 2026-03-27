import { defineCollection, defineConfig } from '@content-collections/core'
import { z } from 'zod'

const contentTypeEnum = z.enum(['game-files', 'movies', 'extras'])

const entries = defineCollection({
  name: 'entries',
  directory: 'content/entries',
  include: '**/*.md',
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    categories: z.array(z.string()),
    type: contentTypeEnum,
    slug: z.string().optional(),
    image: z.string(),
    date: z.string(),
    fileSize: z.string().optional(),
    format: z.string().optional(),
    downloadUrl: z.string().optional(),
    region: z.string().optional(),
    platform: z.string().optional(),
  }),
  transform: async (doc) => {
    return {
      ...doc,
      slug: doc.title
        .toLowerCase()
        .replace(/[^\w-]+/g, '-')
        .replace(/^-+|-+$/g, ''),
    }
  },
})

export default defineConfig({
  collections: [entries],
})
