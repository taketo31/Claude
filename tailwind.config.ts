import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Suumo's signature green + Malaysia accent
        suumo: {
          50: '#effaf1',
          100: '#d9f2de',
          500: '#19a453',
          600: '#0f8a43',
          700: '#0b6e37',
        },
        accent: {
          500: '#e8423e', // Suumo red for tags
        },
      },
      fontFamily: {
        jp: [
          '"Hiragino Kaku Gothic ProN"',
          '"Yu Gothic"',
          '"Meiryo"',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
};

export default config;
