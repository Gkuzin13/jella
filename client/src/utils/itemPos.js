export const FIRST_ITEM_POS = 16384;

export const getPrependedItemPos = (items) => {
  if (!items.length) return FIRST_ITEM_POS;

  const positions = items.map(({ position }) => position);

  return Math.min(...positions) / 2;
};

export const getInsertedItemPos = (items, targetIndex) => {
  if (items.length <= 1) return FIRST_ITEM_POS;

  const leftAdjacentItemPos = items[targetIndex - 1].position;
  const rightAdjacentItemPos = items[targetIndex + 1].position;

  return (leftAdjacentItemPos + rightAdjacentItemPos) / 2;
};

export const getAppendedItemPos = (items) => {
  if (!items.length) return FIRST_ITEM_POS;

  const positions = items.map(({ position }) => position);

  return Math.max(...positions) + FIRST_ITEM_POS;
};

export const getNewItemPos = (items, targetIndex) => {
  if (!items?.length || !Array.isArray(items)) return FIRST_ITEM_POS;

  const isPrepended = targetIndex === 0;
  const isAppended = targetIndex === items.length - 1;

  if (isPrepended) return getPrependedItemPos(items);
  if (isAppended) return getAppendedItemPos(items);

  return getInsertedItemPos(items, targetIndex);
};
