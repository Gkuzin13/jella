const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListSchema = new Schema(
  {
    listTitle: { type: String, required: true },
    position: { type: Number },
    boardId: { type: Schema.Types.ObjectId, ref: 'Board' },
    cards: [{ type: Schema.Types.ObjectId, ref: 'Card' }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('List', ListSchema);
