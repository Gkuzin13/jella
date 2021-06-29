import { BoardSchema } from './board.js';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
  email: { type: String, required: true, lowercase: true, trim: true },
  username: { type: String, required: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  creation_date: { type: Date, default: Date.now() },
  boards: [{ type: Schema.Types.ObjectId, ref: 'Board' }],
});

AccountSchema.virtual('url').get(() => {
  return `/${this.username}`;
});

const Account = mongoose.model('Account', AccountSchema);

export default Account;
