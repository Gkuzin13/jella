import mongoose from 'mongoose';
import { ListSchema } from './list.js';
const Schema = mongoose.Schema;

export const BoardSchema = new Schema(
  {
    boardCreator: { type: Schema.Types.ObjectId, ref: 'Account' },
    boardTitle: { type: String, required: true },
    lists: [ListSchema],
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
