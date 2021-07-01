import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const ListSchema = new Schema(
  {
    listTitle: { type: String, required: true },
    position: { type: Number },
    boardId: { type: Schema.Types.ObjectId, ref: 'Board' },
    cards: [{ type: Schema.Types.ObjectId, ref: 'Card' }],
  },
  {
    timestamps: true,
  }
);

const List = mongoose.model('List', ListSchema);

export default List;
