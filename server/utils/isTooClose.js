// Checks if item position is
const isTooClose = (position) => {
  if (!Number.isInteger(position) && position % 1 < 0.01) {
    return true;
  }

  return false;
};

module.exports = isTooClose;
