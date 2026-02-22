module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        brand: {
          dark: '#1e3a8a',
          primary: '#3b82f6',
          pink: '#ec4899',
          light: '#f8fafc',
        }
      }
    }
  },
  plugins: [],
}
