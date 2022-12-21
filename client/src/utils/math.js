export const calcPercentage = (value, max) => {
  if (value < 0) return 0;
  if (value > max) return 100;

  return Math.round((value / max || 0) * 100);
};
