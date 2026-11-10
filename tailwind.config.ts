import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        obsidian: '#090D16',
        midnight: '#0F172A',
        surface: {
          dark: '#111827',
          darker: '#090D16',
          card: '#161F30',
          light: '#F8FAFC',
          lightCard: '#FFFFFF',
          lightBorder: '#E2E8F0',
        },
        cyan: {
          electric: '#0EA5E9',
          glow: 'rgba(14, 165, 233, 0.15)',
        },
        royal: {
          neon: '#2563EB',
          deep: '#1D4ED8',
        },
        violet: {
          hyper: '#6366F1',
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
      boxShadow: {
        'matte-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'matte-md': '0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -2px rgba(0, 0, 0, 0.06)',
        'matte-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.08)',
        'matte-dark': '0 4px 20px -2px rgba(0, 0, 0, 0.5)',
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

