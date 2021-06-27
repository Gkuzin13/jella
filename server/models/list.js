const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListSchema = new Schema({
  title: String,
  board_id: { type: Schema.Types.ObjectId, ref: 'Board' },
  cards: [{ type: Schema.Types.ObjectId, ref: 'Card' }],
  position: Number,
});

module.exports = mongoose.model('List', ListSchema);
