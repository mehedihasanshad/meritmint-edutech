import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        accent: '#ff3b30',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      backgroundImage: {
        'app-gradient': 'linear-gradient(180deg, rgba(10,10,25,1) 0%, rgba(0,0,5,1) 100%)',
      },
    },
  },
  plugins: [],
};

export default config;
