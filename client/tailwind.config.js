module.exports = {
  purge: {
    content: ['./src/**/*.{js,jsx}', './public/**/*.html'],
    options: {
      safelist: [/^bg-/, /^text-/],
    },
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'open-sans': ['"Open Sans"', 'sans-serif'],
      },
      backgroundImage: (theme) => ({
        main: 'linear-gradient( 75.2deg, rgb(25, 87 ,232 , 0.15) -2.5%, rgb(222, 100, 29 , 0.025) 55%, rgb(0 ,90 ,255 , 0.05) 102.3% )',
        boardPage:
          'linear-gradient( 73deg, rgb(145, 155, 177, 55%) -2.5%, rgb(66, 77, 103, 40%) 55%, rgb(138,149,167, 75%) 102.3% )',
        homePage:
          'linear-gradient( 75.2deg, rgb(25, 87 ,232 , 0.15) -2.5%, rgb(148, 144, 126, 12%) 55%, rgb(0 ,90 ,255 , 0.05) 102.3% )',
      }),
      zIndex: {
        '-10': '-10',
      },
      outline: {
        blue: '2px solid rgb(37, 99, 235)',
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
