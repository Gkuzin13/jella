exports.appendNew = (items) => {
  if (items.length === 0) return 16384;

  const itemsPos = items.map((item) => {
    return item.position;
  });

  return Math.max(...itemsPos) + 1024;
};

exports.prependItem = (items) => {
  if (items.length === 0) return 16384;

  const itemsPos = items.map((item) => {
    return item.position;
  });

  return Math.min(...itemsPos) / 2;
};

exports.insertItem = (prevPos, nextPos, items) => {
  if (items.length === 0) return 16384;

  return (prevPos + nextPos) / 2;
};
