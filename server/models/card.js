const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CardSchema = new Schema({
  title: String,
  date_created: Date,
  description: String,
  cover_colour: String,
  list_id: { type: Schema.Types.ObjectId, ref: 'List' },
});

module.exports = mongoose.model('Card', CardSchema);
