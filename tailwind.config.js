/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#00FF00",
        "primary-hover": "#00CC00",
        secondary: "#00AA00",
        accent: "#00FF00",
        dark: "#000000",
        "dark-secondary": "#1a1a1a",
      },
      fontFamily: {
        mono: [
          "JetBrains Mono",
          "Fira Code", 
          "Consolas",
          "Monaco",
          "Courier New",
          "monospace"
        ],
      },
      spacing: {
        section: "2rem",
        container: "1rem",
      },
      borderRadius: {
        container: "0.5rem",
      },
      animation: {
        glow: "glow 2s ease-in-out infinite",
        matrix: "matrix 0.5s ease-out",
        "pulse-green": "pulse-green 1.5s ease-in-out infinite",
      },
      gridTemplateColumns: {
        '13': 'repeat(13, minmax(0, 1fr))',
      },
    },
  },
  plugins: [],
}
