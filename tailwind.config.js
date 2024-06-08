/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#F1F7FF",
          dark: "#2E3D52",
        },
        textPrimary: {
          DEFAULT: "#E48500",
          dark: "#FEB755",
        },
        textSecondary: {
          DEFAULT: "#9D8666",
          dark: "#E4C9A3",
        },
        link: {
          DEFAULT: "#C29166",
          dark: "#FFBF87",
        },
      },
    },
  },
  plugins: [],
};
