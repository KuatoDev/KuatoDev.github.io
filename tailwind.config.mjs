/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'primary-accent': '#38bdf8',
        'glass-bg': 'rgba(15, 23, 42, 0.65)',
        'glass-border': 'rgba(255, 255, 255, 0.1)'
      }
    }
  },
  plugins: []
};
