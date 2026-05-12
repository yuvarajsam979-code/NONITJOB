/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./screens/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#2E5BFF",
        secondary: "#25D366",
        dark: "#1A1A1A",
        light: "#F8F9FA",
      },
    },
  },
  plugins: [],
}
