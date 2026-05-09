/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary colors
        'navy': '#1A1A2E',
        'charcoal': '#2D2D2D',
        'white': '#FFFFFF',
        'off-white': '#F5F5F7',
        
        // Accent colors (clinical wellness)
        'sage': '#7BA57C',
        'teal': '#4A8B8B',
        'gold': '#C4A747',
        
        // Text colors
        'text-dark': '#1A1A2E',
        'text-body': '#2D2D2D',
        'text-light': '#6B6B76',
        'text-muted': '#9CA3AF',
        
        // UI colors
        'border': '#E5E7EB',
        'shadow': 'rgba(0, 0, 0, 0.05)',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', '-apple-system', 'Helvetica Neue', 'sans-serif'],
        'heading': ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'card': '16px',
        'badge': '20px',
        'button': '8px',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.03)',
        'card-hover': '0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.02)',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
    },
  },
  plugins: [],
}