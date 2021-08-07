const recalcItemsPos = async (parentId, Model) => {
  try {
    const items = await Model.find(parentId).sort({ position: 1 });

    let num = 16384;

    for (const item of items) {
      await Model.findByIdAndUpdate(item._id, { position: num });
      num += 16384;
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = recalcItemsPos;
