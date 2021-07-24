const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CardSchema = new Schema(
  {
    cardTitle: { type: String, required: true },
    description: String,
    coverColor: String,
    position: { type: Schema.Types.Number, required: true },
    listId: { type: Schema.Types.ObjectId, ref: 'List', required: true },
    boardId: { type: Schema.Types.ObjectId, ref: 'Board', required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Card', CardSchema);
