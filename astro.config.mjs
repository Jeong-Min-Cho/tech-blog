import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import pagefind from 'astro-pagefind';

export default defineConfig({
  site: 'https://blog.jeongmincho.dev',
  integrations: [
    tailwind(),
    mdx(),
    sitemap(),
    pagefind()
  ],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true
    }
  }
});
