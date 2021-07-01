import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const BoardSchema = new Schema(
  {
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account' },
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

const Board = mongoose.model('Board', BoardSchema);

export default Board;
