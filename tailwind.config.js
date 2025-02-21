/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'ink-blue': '#1A2333',
        'paper-white': '#FDFBF7',
        'editorial-red': '#D64045',
        'ink-gray': '#4A5568',
        'paper-gray': '#E2E8F0',
        'highlight-yellow': '#FFD700',
      },
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'source-serif': ['Source Serif Pro', 'serif'],
      },
      spacing: {
        '128': '32rem',
      },
      borderWidth: {
        '3': '3px',
      },
    },
  },
  darkMode: 'class',
} 