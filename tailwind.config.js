const daisyui = require('daisyui');

module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}', './src/routes/**/*.{svelte,js,ts}'],
  plugins: [daisyui],
  theme: {
    extend: {}
  },
  daisyui: {
    themes: [
      "emerald",
      "business",
      "nord",
    ],
  },
};
