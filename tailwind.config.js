/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'gami-primary': '#fabb15',
        'gami-text': '#232c4f',
        'gami-background': '#c7a76d',
        'gami-link': '#7f4f21',
        'gami-accent': '#907232',
      },
      spacing: {
        "safe-top": "env(safe-area-inset-top)",
        "safe-bottom": "env(safe-area-inset-bottom)",
        "safe-left": "env(safe-area-inset-left)",
        "safe-right": "env(safe-area-inset-right)",
      },
    },
    screens: {
      xs: '480px',
      mobileXS: '0px',
      mobileS: '350px',
      ...defaultTheme.screens,
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          /* IE and Edge */
          '-ms-overflow-style': 'none',

          /* Firefox */
          'scrollbar-width': 'none',

          /* Safari and Chrome */
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
      });
    }),
  ],
};
