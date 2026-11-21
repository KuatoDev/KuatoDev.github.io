import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://vernkuato.zone.id',
  build: {
    format: 'file'
  },
  devToolbar: {
    enabled: false
  },
  vite: {
    optimizeDeps: {
      exclude: ['aria-query', 'axobject-query']
    }
  },
  integrations: [tailwind({
    applyBaseStyles: false
  })]
});
