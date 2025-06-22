export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      animation: {
        fadeIn: "fadeIn 1s ease-out",
        float: "float 3s ease-in-out infinite",
        pulseSlow: "pulse 4s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: 0, transform: "translateY(20px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10%)" },
        },
      },
    },
  },
  plugins: [],
};
