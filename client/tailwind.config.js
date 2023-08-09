/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'dodgerblue',
        secondary: '#28282B',
        light: '#fff',
        danger: '#D61A3C',
        success: '#50c878',
      },
    },
  },
  plugins: [],
};
