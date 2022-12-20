export const FIRST_ITEM_POS = 16384;

export const getPrependedItemPos = (items) => {
  const positions = items.map(({ position }) => position);

  return Math.min(...positions) / 2;
};

export const getInsertedItemPos = (items, targetIndex) => {
  const leftAdjacentItemPos = items[targetIndex - 1].position;
  const rightAdjacentItemPost = items[targetIndex + 1].position;

  return (leftAdjacentItemPos + rightAdjacentItemPost) / 2;
};

export const getAppendedItemPos = (items) => {
  const positions = items.map(({ position }) => position);

  return Math.max(...positions) + FIRST_ITEM_POS;
};

export const getNewItemPos = (items, destination) => {
  if (!items?.length || !Array.isArray(items)) return FIRST_ITEM_POS;

  const targetIndex = destination.index;

  const isPrepended = targetIndex === 0;
  const isAppended = targetIndex === items.length - 1;

  if (isPrepended) return getPrependedItemPos(items);

  if (isAppended) return getAppendedItemPos(items);

  return getInsertedItemPos(items, targetIndex);
};
