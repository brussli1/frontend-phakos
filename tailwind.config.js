/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/routes/**/*.{svelte,js,ts}'],
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      "emerald",
      "business",
      "nord",
    ],
  },
};