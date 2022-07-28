/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",],
    theme: {
      extend: {
        colors: {
          'red': '#fe493e ',
          'fb-blue': '#3b5998'
      },
      spacing: { 
        '80': '80vw',
        '80h': '80vh'
      }
    },
      // screens: {
      //   'sm': '300px',
      //   // => @media (min-width: 640px) { ... }

      //   'md': '768px',
      //   // => @media (min-width: 768px) { ... }

      //   'lg': '1024px',
      //   // => @media (min-width: 1024px) { ... }

      //   'xl': '1280px',
      //   // => @media (min-width: 1280px) { ... }

      //   '2xl': '1536px',
      //   // => @media (min-width: 1536px) { ... }
      // },
    plugins: [],
  }
}
