/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'home-bg': "url('https://res.cloudinary.com/fastbeetech/image/upload/v1674302179/ecommerce/o8usorwzv4ajq1c1f7cb.jpg')",
      },
      fontFamily: {
        barlow: ['Barlow', 'sans-serif'],
        condensed: ['Barlow Condensed', 'sans-serif'],
        bellefair: ['Bellefair', 'serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      screens: {
        sm: '300px',
        md: '760px',
        lg: '1024px',
      },
    },
  },
  plugins: [],
};

// 'home-bg': "url('https://res.cloudinary.com/fastbeetech/image/upload/v1674302179/ecommerce/o8usorwzv4ajq1c1f7cb.jpg')" || "url('../public/cloth1.jpg')"