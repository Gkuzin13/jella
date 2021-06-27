const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
  username: String,
  password: String,
  boards: [{ type: Schema.Types.ObjectId, ref: 'Board' }],
});

module.exports = mongoose.model('Account', AccountSchema);
