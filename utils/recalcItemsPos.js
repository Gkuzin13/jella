// Resets items position if the new position of the item is too close (< 0.01) to neighbouring items
const recalcItemsPos = async (parentId, Model) => {
  try {
    // Get items by parent item id
    const items = await Model.find(parentId).sort({ position: 1 });
    let pos = 16384;
    // Give new position incrementing each by 16384
    for (const item of items) {
      await Model.findByIdAndUpdate(item._id, { position: pos }, { new: true });
      pos += 16384;
    }
  } catch (error) {
    return error;
  }
};

module.exports = recalcItemsPos;
