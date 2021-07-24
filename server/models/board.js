const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BoardSchema = new Schema(
  {
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
    boardTitle: { type: String, required: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'Account' }],
  },
  {
    timestamps: true,
  }
);

BoardSchema.virtual('url').get(() => {
  return `/b/${this._id}`;
});

module.exports = mongoose.model('Board', BoardSchema);
