import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const BoardSchema = new Schema({
  board_creator: { type: Schema.Types.ObjectId, ref: 'Account' },
  title: String,
  lists: [{ type: Schema.Types.ObjectId, ref: 'List' }],
});

const Board = mongoose.model('Board', BoardSchema);

export default Board;
