import { describe, it, expect } from 'vitest';
import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';

const BLOG_DIR = join(process.cwd(), 'src/content/blog');

describe('Blog Posts', () => {
  const blogFiles = readdirSync(BLOG_DIR).filter(f => f.endsWith('.mdx'));

  it('should have at least one blog post', () => {
    expect(blogFiles.length).toBeGreaterThan(0);
  });

  describe('frontmatter validation', () => {
    blogFiles.forEach(file => {
      describe(file, () => {
        const content = readFileSync(join(BLOG_DIR, file), 'utf-8');
        const frontmatterMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);

        it('should have frontmatter', () => {
          expect(frontmatterMatch).not.toBeNull();
        });

        if (frontmatterMatch) {
          const frontmatter = frontmatterMatch[1];

          it('should have a title', () => {
            expect(frontmatter).toMatch(/^title:/m);
          });

          it('should have a description', () => {
            expect(frontmatter).toMatch(/^description:/m);
          });

          it('should have a pubDate', () => {
            expect(frontmatter).toMatch(/^pubDate:/m);
          });

          it('should have valid lang (en or ko)', () => {
            const langMatch = frontmatter.match(/^lang:\s*(\w+)/m);
            if (langMatch) {
              expect(['en', 'ko']).toContain(langMatch[1]);
            }
          });
        }
      });
    });
  });

  describe('content validation', () => {
    blogFiles.forEach(file => {
      describe(file, () => {
        const content = readFileSync(join(BLOG_DIR, file), 'utf-8');
        const bodyContent = content.replace(/^---\n[\s\S]*?\n---\n/, '');

        it('should have content after frontmatter', () => {
          expect(bodyContent.trim().length).toBeGreaterThan(0);
        });

        it('should not contain broken image references', () => {
          const imageRefs = bodyContent.match(/!\[.*?\]\((.*?)\)/g) || [];
          imageRefs.forEach(ref => {
            // Check that image paths start with / or http
            const pathMatch = ref.match(/\]\((.*?)\)/);
            if (pathMatch) {
              const path = pathMatch[1];
              expect(
                path.startsWith('/') || path.startsWith('http')
              ).toBe(true);
            }
          });
        });
      });
    });
  });
});
