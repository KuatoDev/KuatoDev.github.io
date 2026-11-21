import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://vernkuato.zone.id',
  build: {
    format: 'file'
  },
  integrations: [tailwind({
    applyBaseStyles: false
  })]
});
