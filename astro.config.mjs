import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://coderman.me',
  output: 'static',
  integrations: [sitemap()]
});
