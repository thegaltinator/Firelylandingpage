/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'background-start': '#e0e8ff',
        'background-end': '#f0f4ff',
        text: '#111827',
        'text-subtle': '#6b7280',
        'glass-bg': 'rgba(255, 255, 255, 0.15)', // Proper glassmorphic opacity
        'glass-border': 'rgba(255, 255, 255, 0.2)', // Proper glassmorphic border
        'blue-dance': 'rgba(59, 130, 246, 0.18)',  // Boosted more for better visibility
        'blue-dance-alt': 'rgba(96, 165, 250, 0.15)',  // Increased visibility
        'purple-dance': 'rgba(147, 51, 234, 0.12)',  // Enhanced purple
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'blue-dance-1': 'blueDance1 25s infinite ease-in-out', // Slower for subtle effect
        'blue-dance-2': 'blueDance2 30s infinite ease-in-out',
        'blue-dance-3': 'blueDance3 28s infinite ease-in-out',
        'purple-dance': 'purpleDance 35s infinite ease-in-out',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        blueDance1: {
          '0%, 100%': { 
            transform: 'translate(0px, 0px) scale(0.8)', 
            opacity: '0.4' 
          },
          '33%': { 
            transform: 'translate(20px, -15px) scale(1.2)', 
            opacity: '0.6' 
          },
          '66%': { 
            transform: 'translate(-15px, 20px) scale(0.9)', 
            opacity: '0.5' 
          },
        },
        blueDance2: {
          '0%, 100%': { 
            transform: 'translate(0px, 0px) scale(1)', 
            opacity: '0.35' 
          },
          '50%': { 
            transform: 'translate(-25px, -10px) scale(1.3)', 
            opacity: '0.5' 
          },
        },
        blueDance3: {
          '0%, 100%': { 
            transform: 'translate(0px, 0px) scale(0.7)', 
            opacity: '0.4' 
          },
          '25%': { 
            transform: 'translate(15px, 25px) scale(1.1)', 
            opacity: '0.35' 
          },
          '75%': { 
            transform: 'translate(-10px, -20px) scale(0.8)', 
            opacity: '0.5' 
          },
        },
        purpleDance: {
          '0%, 100%': { 
            transform: 'translate(0px, 0px) scale(1)', 
            opacity: '0.25' 
          },
          '30%': { 
            transform: 'translate(-20px, 15px) scale(0.8)', 
            opacity: '0.4' 
          },
          '70%': { 
            transform: 'translate(25px, -10px) scale(1.2)', 
            opacity: '0.3' 
          },
        }
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.15)', // Proper glassmorphic shadow
      },
      backdropBlur: {
        'glass': '10px', // Standard glassmorphic blur
      }
    },
  },
  plugins: [],
} 