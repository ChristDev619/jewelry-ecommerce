/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2D2D2D',
          light: '#4A4A4A',
          dark: '#1A1A1A',
        },
        secondary: {
          DEFAULT: '#8B7355',
          light: '#A68968',
          dark: '#6B5842',
        },
        background: {
          DEFAULT: '#F5F5F0',
          light: '#FAFAF8',
          dark: '#E8E8E3',
        },
        accent: {
          gold: '#D4AF37',
          rose: '#B76E79',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      boxShadow: {
        'soft': '0 2px 15px rgba(0, 0, 0, 0.08)',
        'hover': '0 8px 30px rgba(0, 0, 0, 0.12)',
      },
      transitionDuration: {
        '400': '400ms',
      }
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false, // Disable Tailwind's reset to work nicely with MUI
  }
}

