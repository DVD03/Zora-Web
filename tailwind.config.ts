import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        obsidian: '#02050D',
        midnight: '#060D1F',
        cyan: {
          electric: '#00F0FF',
          glow: 'rgba(0, 240, 255, 0.35)',
        },
        royal: {
          neon: '#0051FF',
          deep: '#002B80',
        },
        violet: {
          hyper: '#7000FF',
        },
        slate: {
          metallic: '#94A3B8',
        },
      },
      fontFamily: {
        display: ['Space Grotesk', 'Segoe UI', 'sans-serif'],
        portal: ['Syne', 'Space Grotesk', 'sans-serif'],
        sans: ['Plus Jakarta Sans', 'Segoe UI', 'sans-serif'],
        mono: ['JetBrains Mono', 'Consolas', 'monospace'],
      },
      backgroundImage: {
        'cyber-grid':
          'linear-gradient(to right, rgba(0, 240, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 240, 255, 0.05) 1px, transparent 1px)',
        'neon-gradient':
          'linear-gradient(135deg, #00F0FF 0%, #0051FF 55%, #7000FF 100%)',
        'glass-gradient':
          'linear-gradient(180deg, rgba(6, 13, 31, 0.78) 0%, rgba(2, 5, 13, 0.92) 100%)',
      },
      boxShadow: {
        'cyan-glow': '0 0 30px rgba(0, 240, 255, 0.35)',
        'cyan-intense': '0 0 50px rgba(0, 240, 255, 0.65)',
        'royal-glow': '0 0 35px rgba(0, 81, 255, 0.4)',
        'glass-inset': 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.12)',
      },
      keyframes: {
        'pulse-neon': {
          '0%, 100%': {
            filter: 'drop-shadow(0 0 22px rgba(0, 240, 255, 0.75))',
          },
          '50%': {
            filter: 'drop-shadow(0 0 42px rgba(0, 240, 255, 1)) drop-shadow(0 0 80px rgba(0, 81, 255, 0.8))',
          },
        },
        shockwave: {
          '0%': {
            transform: 'scale(0.8)',
            opacity: '0.9',
          },
          '100%': {
            transform: 'scale(2.4)',
            opacity: '0',
          },
        },
        'orbit-spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'orbit-reverse': {
          '0%': { transform: 'rotate(360deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        'pulse-neon': 'pulse-neon 3.5s ease-in-out infinite',
        shockwave: 'shockwave 2.4s cubic-bezier(0.16, 1, 0.3, 1) infinite',
        'orbit-spin': 'orbit-spin 18s linear infinite',
        'orbit-reverse': 'orbit-reverse 24s linear infinite',
        shimmer: 'shimmer 4s linear infinite',
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;

