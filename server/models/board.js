const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BoardSchema = new Schema({
  board_creator: { type: Schema.Types.ObjectId, ref: 'Account' },
  title: String,
  lists: [{ type: Schema.Types.ObjectId, ref: 'List' }],
});

module.exports = mongoose.model('Board', BoardSchema);
