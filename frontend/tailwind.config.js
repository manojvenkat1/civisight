/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#7C3AED',
        secondary: '#1E1B4B',
        accent: '#A78BFA',
        background: '#0F0B2D',
        'dark-purple': '#1a0b2e',
        'neon-purple': '#8b5cf6',
        'glow-blue': '#3b82f6'
      },
      boxShadow: {
        glow: '0 0 20px rgba(124, 58, 237, 0.6)',
        'glow-lg': '0 0 40px rgba(124, 58, 237, 0.4)',
        'neon': '0 0 5px theme(colors.primary), 0 0 20px theme(colors.primary), 0 0 35px theme(colors.primary)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-dark': 'linear-gradient(135deg, #0F0B2D 0%, #1E1B4B 50%, #7C3AED 100%)',
        'gradient-card': 'linear-gradient(135deg, rgba(124, 58, 237, 0.1) 0%, rgba(30, 27, 75, 0.2) 100%)',
      }
    },
  },
  plugins: [],
}