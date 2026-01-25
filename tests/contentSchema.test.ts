import { describe, it, expect } from 'vitest';
import { z } from 'astro/zod';

// Replicate the blog schema for testing (can't import astro:content in tests)
const blogSchema = z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  heroImage: z.string().optional(),
  tags: z.array(z.string()).default([]),
  category: z.string().optional(),
  lang: z.enum(['en', 'ko']).default('en'),
  featured: z.boolean().default(false),
  draft: z.boolean().default(false)
});

describe('Blog Content Schema', () => {
  describe('required fields', () => {
    it('should require title', () => {
      const result = blogSchema.safeParse({
        description: 'Test description',
        pubDate: '2024-01-15'
      });
      expect(result.success).toBe(false);
    });

    it('should require description', () => {
      const result = blogSchema.safeParse({
        title: 'Test Title',
        pubDate: '2024-01-15'
      });
      expect(result.success).toBe(false);
    });

    it('should require pubDate', () => {
      const result = blogSchema.safeParse({
        title: 'Test Title',
        description: 'Test description'
      });
      expect(result.success).toBe(false);
    });
  });

  describe('valid frontmatter', () => {
    it('should accept minimal valid frontmatter', () => {
      const result = blogSchema.safeParse({
        title: 'Test Post',
        description: 'A test post description',
        pubDate: '2024-01-15'
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.title).toBe('Test Post');
        expect(result.data.tags).toEqual([]);
        expect(result.data.lang).toBe('en');
        expect(result.data.featured).toBe(false);
        expect(result.data.draft).toBe(false);
      }
    });

    it('should accept full frontmatter', () => {
      const result = blogSchema.safeParse({
        title: 'Full Test Post',
        description: 'A complete test post',
        pubDate: '2024-01-15',
        updatedDate: '2024-02-01',
        heroImage: '/images/hero.jpg',
        tags: ['typescript', 'testing'],
        category: 'Tutorial',
        lang: 'ko',
        featured: true,
        draft: false
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.tags).toEqual(['typescript', 'testing']);
        expect(result.data.lang).toBe('ko');
        expect(result.data.featured).toBe(true);
      }
    });
  });

  describe('date coercion', () => {
    it('should coerce string dates to Date objects', () => {
      const result = blogSchema.safeParse({
        title: 'Test',
        description: 'Test',
        pubDate: '2024-06-15'
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.pubDate).toBeInstanceOf(Date);
      }
    });

    it('should accept Date objects', () => {
      const result = blogSchema.safeParse({
        title: 'Test',
        description: 'Test',
        pubDate: new Date('2024-06-15')
      });
      expect(result.success).toBe(true);
    });
  });

  describe('language validation', () => {
    it('should accept "en" language', () => {
      const result = blogSchema.safeParse({
        title: 'Test',
        description: 'Test',
        pubDate: '2024-01-15',
        lang: 'en'
      });
      expect(result.success).toBe(true);
    });

    it('should accept "ko" language', () => {
      const result = blogSchema.safeParse({
        title: 'Test',
        description: 'Test',
        pubDate: '2024-01-15',
        lang: 'ko'
      });
      expect(result.success).toBe(true);
    });

    it('should reject invalid language', () => {
      const result = blogSchema.safeParse({
        title: 'Test',
        description: 'Test',
        pubDate: '2024-01-15',
        lang: 'fr'
      });
      expect(result.success).toBe(false);
    });

    it('should default to "en" when lang not provided', () => {
      const result = blogSchema.safeParse({
        title: 'Test',
        description: 'Test',
        pubDate: '2024-01-15'
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.lang).toBe('en');
      }
    });
  });

  describe('tags validation', () => {
    it('should accept array of strings', () => {
      const result = blogSchema.safeParse({
        title: 'Test',
        description: 'Test',
        pubDate: '2024-01-15',
        tags: ['react', 'typescript', 'testing']
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.tags).toHaveLength(3);
      }
    });

    it('should default to empty array', () => {
      const result = blogSchema.safeParse({
        title: 'Test',
        description: 'Test',
        pubDate: '2024-01-15'
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.tags).toEqual([]);
      }
    });

    it('should reject non-string tags', () => {
      const result = blogSchema.safeParse({
        title: 'Test',
        description: 'Test',
        pubDate: '2024-01-15',
        tags: [123, 456]
      });
      expect(result.success).toBe(false);
    });
  });
});
