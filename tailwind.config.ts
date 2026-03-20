import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Syne', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
        serif: ['Instrument Serif', 'serif'],
      },
      colors: {
        cyan: {
          DEFAULT: '#00c8e0',
          light: '#33d6ea',
        },
        navy: {
          DEFAULT: '#070d18',
          2: '#0a1120',
          3: '#0e1729',
        },
        amber: {
          DEFAULT: '#f59e0b',
        },
      },
    },
  },
  plugins: [],
}

export default config
