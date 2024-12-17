/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screen: {
        xs: '425px',
      },
      colors: {
        shOrange: '#fb923c',
        shOrange2: '#f39543',
        shOrangeAccent: '#ffedd5',
        shAccent: '#525f7f',
        shBackground: '#f3f4f6',
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require('@tailwindcss/forms'), require('tailwind-scrollbar')],
}
