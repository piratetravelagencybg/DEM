import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#F5F0E8',
        'warm-white': '#FAFAF7',
        walnut: '#8B6F47',
        'walnut-dark': '#6B5235',
        charcoal: '#2C2C2C',
        'warm-gray': '#6B6560',
        'light-tan': '#E8DDD0',
        sand: '#D4C4A8',
        success: '#4A7C59',
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
      },
      fontSize: {
        hero: 'clamp(2.5rem, 6vw, 4.5rem)',
        h1: 'clamp(2rem, 4vw, 3rem)',
        h2: 'clamp(1.5rem, 3vw, 2.25rem)',
      },
      maxWidth: {
        container: '1280px',
      },
      borderRadius: {
        card: '12px',
        btn: '8px',
      },
    },
  },
  plugins: [],
}

export default config
