/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        cormorant: ["var(--font-cormorant)", "serif"],
        sans: ["var(--font-dm-sans)", "sans-serif"],
      },
      colors: {
        gold: {
          DEFAULT: "#C9A227",
          light: "#E8C84A",
          dark: "#8B6914",
        },
      },
      backgroundImage: {
        "premium-gradient": "linear-gradient(135deg, var(--accent-gold-dark), var(--accent-gold), var(--accent-gold-light))",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
