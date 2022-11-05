/* eslint-disable no-undef */

module.exports = {
  content: [
    "./src/components/**/*.{js,jsx}",
    "./src/pages/**/*.{js,jsx}",
    "./public/index.html",
  ],
  safelist: [{ pattern: /(bg|text)-./ }],
  theme: {
    extend: {
      fontFamily: {
        "open-sans": ['"Open Sans"', "sans-serif"],
      },
      backgroundImage: () => ({
        main: "linear-gradient( 75.2deg, rgb(25, 87 ,232 , 0.15) -2.5%, rgb(222, 100, 29 , 0.025) 55%, rgb(0 ,90 ,255 , 0.05) 102.3% )",
        boardPage:
          "linear-gradient( 73deg, rgb(145, 155, 177, 55%) -2.5%, rgb(66, 77, 103, 40%) 55%, rgb(138,149,167, 75%) 102.3% )",
        homePage:
          "linear-gradient( 75.2deg, rgb(25, 87 ,232 , 0.15) -2.5%, rgb(148, 144, 126, 12%) 55%, rgb(0 ,90 ,255 , 0.05) 102.3% )",
      }),
      zIndex: {
        "-10": "-10",
      },
      width: {
        76: "19rem",
      },
      outline: {
        blue: "2px solid rgb(37, 99, 235)",
      },
      animation: {
        scale: "scale 1s infinite",
        scale2: "scale2 1s 0.2s infinite",
        scale3: "scale3 1s 0.4s infinite",
      },
      keyframes: {
        scale: {
          "0%, 100%": {
            transform: "scale(0)",
          },
          "50%": {
            opacity: "1",
            transform: "scale(1)",
          },
        },
        scale2: {
          "0%, 100%": {
            transform: "scale(0)",
          },
          "50%": {
            opacity: "1",
            transform: "scale(1)",
          },
        },
        scale3: {
          "0%, 100%": {
            transform: "scale(0)",
          },
          "50%": {
            opacity: "1",
            transform: "scale(1)",
          },
        },
      },
    },
  },
};
