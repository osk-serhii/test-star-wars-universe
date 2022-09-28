// Keep alphabetically sorted
// This tool is helpful https://wordcounter.net/alphabetize

// Color names from http://chir.ag/projects/name-that-color

const colors = {
  black: "#000000",
  doveGray: "#666666",
  millbrook: "#5C472F",
  mineShaft: "#333333",
  white: "#FFFFFF",
};

const breakPoints = {
  mobileS: "320px",
  mobileM: "375px",
  mobileL: "425px",
  tabletS: "560px",
  tabletM: "768px",
  tabletL: "960px",
  laptopS: "1024px",
  laptopM: "1280px",
  laptopL: "1440px",
  desktopS: "1680px",
  desktopM: "1920px",
  desktopL: "2400px",
};

const theme = { colors, breakPoints };

export default theme;
