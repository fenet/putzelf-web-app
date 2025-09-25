// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        'pulse-button': {
          '0%, 100%': { transform: 'scale(1)', boxShadow: '0 0 0px rgba(0,0,0,0)' },
          '50%': { transform: 'scale(1.1)', boxShadow: '0 0 15px rgba(91,227,227,0.7)' },
        },
      },
      animation: {
        'pulse-button': 'pulse-button 1s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
