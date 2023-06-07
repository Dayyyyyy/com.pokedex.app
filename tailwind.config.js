/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['"Montserrat"', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        bgPrimary: '#FFFFFF',
        bgSecondary: '#DEE3EC',
        bgTertiary: '#F5F5F6',

        textPrimary: '#24303A',
        textSecondary: '#a1a4a7',
        textTertiary: '#C7CACC',
        contrastText: '#F5F5F6',

        BURed: '#CC0000',
        CBlue: '#3264AF',
        DBlue: '#1B356E',
        GoldenYellow: '#FFCC01',
        GoldFoil: '#C8A102',

        steel: '#C7CACC',
        shadow: '#C7CABB',
        fire: '#fb8c00',
        grass: '#689f38',
        electric: '#ffc107',
        water: '#039be5',
        ice: '#22d3ee',
        ground: '#795548',
        rock: '#546e7a',
        fairy: '#c2185b',
        poison: '#8e24aa',
        bug: '#afb42b',
        ghost: '#b3b6b8',
        dragon: '#ef5350',
        dark: '#424242',
        psychic: '#324242',
        flying: '#CC0000',
        fighting: '#26a69a',
        unknown: '#1264AF',
        normal: '#3264AF',
        tahiti: {
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
        },
      },
      screens: {
        xs: '475px',
      },
    },
    container: {
      padding: '1rem',
      center: true,
      screens: {
        xs: '475px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
    },
  },
  safelist: [
    {
      pattern:
        /text-(steel|unknown|shadow|fire|grass|electric|water|ice|ground|rock|fairy|poison|bug|ghost|dragon|dark|psychic|flying|fighting|normal)/,
    },
    {
      pattern:
        /bg-(steel|unknown|shadow|fire|grass|electric|water|ice|ground|rock|fairy|poison|bug|ghost|dragon|dark|psychic|flying|fighting|normal)/,
    },
    {
      pattern:
        /shadow-(steel|unknown|shadow|fire|grass|electric|water|ice|ground|rock|fairy|poison|bug|ghost|dragon|dark|psychic|flying|fighting|normal)/,
    },
    {
      pattern:
        /border-(steel|unknown|shadow|fire|grass|electric|water|ice|ground|rock|fairy|poison|bug|ghost|dragon|dark|psychic|flying|fighting|normal)/,
    },
    {
      pattern:
        /from-(steel|unknown|shadow|fire|grass|electric|water|ice|ground|rock|fairy|poison|bug|ghost|dragon|dark|psychic|flying|fighting|normal)/,
    },
  ],
  plugins: [],
};
