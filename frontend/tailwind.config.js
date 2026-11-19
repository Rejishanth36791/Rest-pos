/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"Spline Sans Mono"', 'monospace'],
      },
      colors: {
        wine: {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fce7f3',
          700: '#9f1239',
          800: '#881337',
          850: '#7a0c2e',
          900: '#4c0519',
          950: '#4a071c',
        },
      },
    },
  },
  plugins: [],
};
