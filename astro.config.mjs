import sitemap from '@astrojs/sitemap';
import { satteri } from '@astrojs/markdown-satteri';
import { defineConfig } from 'astro/config';
import lazyMarkdownImages from './src/lib/lazy-markdown-images.mjs';

export default defineConfig({
  site: 'https://coderman.me',
  output: 'static',
  markdown: {
    processor: satteri({ hastPlugins: [lazyMarkdownImages] })
  },
  integrations: [sitemap()]
});
