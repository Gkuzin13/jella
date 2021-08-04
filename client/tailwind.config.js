module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'open-sans': ['"Open Sans"', 'sans-serif'],
      },
      backgroundImage: (theme) => ({
        main: 'linear-gradient(90deg, rgba(29,78,216,0.12368697478991597) 0%, rgba(255,255,255,0.3561799719887955) 74%, rgba(201,143,60,0.10968137254901966) 100%)',
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
