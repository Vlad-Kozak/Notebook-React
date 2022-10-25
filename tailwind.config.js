module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: { center: true, padding: "40px" },
    extend: {
      transitionDuration: {
        DEFAULT: "250ms",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-10deg)" },
          "50%": { transform: "rotate(10deg)" },
        },
      },
      animation: { wiggle: "wiggle 500ms linear" },
    },
  },
  plugins: [],
};
