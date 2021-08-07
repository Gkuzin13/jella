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
      animation: {
        stretch: 'stretch 1.2s ease-in-out infinite',
        stretch2: 'stretch2 1.1s ease-in-out infinite',
        stretch3: 'stretch3 1s ease-in-out infinite',
      },
      keyframes: {
        stretch: {
          '0%, 100%': {
            transform: 'scaleY(1)',
            opacity: '0.8',
          },
          '50%': {
            transform: 'scaleY(1.15)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
          },
        },
        stretch2: {
          '0%, 100%': {
            transform: 'scaleY(1)',
            opacity: '0.7',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            transform: 'scaleY(1.2)',
          },
        },
        stretch3: {
          '0%, 100%': {
            transform: 'scaleY(1)',
            opacity: '0.9',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            transform: 'scaleY(1.3)',
          },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
