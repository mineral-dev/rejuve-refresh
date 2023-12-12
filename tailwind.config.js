/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        body: ["ibm-plex-sans", "Arial", "sans-serif"],
        akbar: ["Akbar", "Arial", "sans-serif"]
      },
      colors: {
        primary: {
          100: "#F8F3F7",
          200: "#E9D8E8",
          600: "#963588",
          900: "#5A2E90",
        },
        black: "#2C1438",
        yellow: "#F8CA45",
      },
      screens: {
        "3xl": "1952px", // 1920 - 32px (2rem)
        "4xl": "2592px", // 2560 - 32px (2rem)
      },
      maxWidth: {
        "screen-3xl": "1920px",
        "screen-4xl": "2560px",
      },
      transitionTimingFunction: {
        "in-expo": "cubic-bezier(0.95, 0.05, 0.795, 0.035)",
        "out-expo": "cubic-bezier(0.19, 1, 0.22, 1)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
