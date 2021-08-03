module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'open-sans': ['"Open Sans"', 'sans-serif'],
      },
      backgroundImage: (theme) => ({
        main: 'linear-gradient( 109.6deg,  rgba(245,239,249,1) 30.1%, rgba(207,211,236,1) 100.2% )',
      }),
      zIndex: {
        '-10': '-10',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
