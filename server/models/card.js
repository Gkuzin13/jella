import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const CardSchema = new Schema(
  {
    cardTitle: { type: String, required: true },
    description: String,
    coverColor: String,
    listId: { type: Schema.Types.ObjectId, ref: 'List' },
  },
  {
    timestamps: true,
  }
);

const Card = mongoose.model('Card', CardSchema);

export default Card;
