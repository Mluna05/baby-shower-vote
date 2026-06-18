/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#F8F5EE',
        'cream-alt': '#FAF8F2',
        nina: '#E8A598',
        nino: '#8FA5B5',
        gold: '#B79B5B',
        'gold-light': '#C4A35A',
        dark: '#2C2A27',
        beige: '#CBBBA5',
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
