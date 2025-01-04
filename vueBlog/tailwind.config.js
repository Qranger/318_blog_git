/** @type {import('tailwindcss').Config} */

import daisyui from 'daisyui'
export default {
  content: [],
  theme: {
    extend: {},
  },
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false,
  plugins: [daisyui],
}
