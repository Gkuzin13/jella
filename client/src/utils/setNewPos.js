export const prependItem = (items) => {
  if (items.length === 0) return 16 * 1024;

  const pos = items.map((item) => item.position);

  return Math.min(...pos) / 2;
};

export const insertItemMiddle = (prevPos, nextPos) => {
  return (prevPos + nextPos) / 2;
};

export const appendItem = (items) => {
  if (items.length === 0) return 16 * 1024;

  const pos = items.map((item) => item.position);

  return Math.max(...pos) + 16 * 1024;
};

export const setNewPos = (items, destination) => {
  const targetIndex = destination.index;

  if (targetIndex === 0) {
    return prependItem(items);
  }

  if (targetIndex === items.length - 1) {
    return appendItem(items);
  }

  return insertItemMiddle(
    items[targetIndex - 1].position,
    items[targetIndex + 1].position
  );
};
