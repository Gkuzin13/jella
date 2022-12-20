export const calcPercentage = (done, total) => {
  return Math.round((done / total || 0) * 100);
};

export const isFloat = (number) => number % 1 !== 0;
