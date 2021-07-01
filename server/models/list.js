import mongoose from 'mongoose';
import { CardSchema } from './card.js';
const Schema = mongoose.Schema;

export const ListSchema = new Schema(
  {
    listTitle: { type: String, required: true },
    position: { type: Number },
    boardId: { type: Schema.Types.ObjectId, ref: 'Board' },
  },
  {
    timestamps: true,
  }
);

const List = mongoose.model('List', ListSchema);

export default List;
