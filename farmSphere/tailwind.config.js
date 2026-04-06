/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./App.jsx", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: '#2E7D32',
        accent: '#FFC107',
        background: "#F5F5F5",
        text: '#1C1C1C',
        textSecondary: "#757575",
        white: '#FFFFFF',
        grey: '#B0B0B0',
        border: "#E0E0E0"
        
      },
    },
  },
  plugins: [],
}