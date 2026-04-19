import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        accent: '#ff3b30',
        ink: '#050505',
        paper: '#fbf7f1',
        bone: '#ece5d8',
        lime: '#c6ff3d',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        display: ['var(--font-display)', 'Georgia', 'Times New Roman', 'serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      fontSize: {
        'display-1': ['clamp(3.2rem, 9vw, 9rem)', { lineHeight: '0.92', letterSpacing: '-0.04em' }],
        'display-2': ['clamp(2.5rem, 6vw, 5.5rem)', { lineHeight: '0.98', letterSpacing: '-0.03em' }],
      },
      backgroundImage: {
        'app-gradient': 'linear-gradient(180deg, rgba(10,10,25,1) 0%, rgba(0,0,5,1) 100%)',
        'grain': "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.35 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'ticker-pulse': {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        'ticker-pulse': 'ticker-pulse 1.6s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
