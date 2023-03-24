/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    colors: {
      Celadon: "#9ec8a2",
      Jet: "#313131",
      Erin: "#03fd5b",
      Mint: "#f8fefd",
      Black: "#000000"
    },
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ]
}