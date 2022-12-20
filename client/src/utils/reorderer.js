import { isFloat } from "./math";

export const isTooClose = (number) => isFloat(number) && number % 1 < 0.1;

export const resetItemsOrder = (items) => {
  let sortedItems = items.sort((a, b) => a.position - b.position);
  let position = 16384;

  for (const item of sortedItems) {
    item.position = position;
    position += 16384;
  }

  return sortedItems;
};
