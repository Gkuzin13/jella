const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListSchema = new Schema(
  {
    listTitle: { type: String, required: true },
    position: { type: Schema.Types.Number, required: true },
    coverColor: { type: Schema.Types.String, required: true, default: 'gray' },
    boardId: { type: Schema.Types.ObjectId, ref: 'Board', required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('List', ListSchema);
