import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
  username: String,
  password: String,
  boards: [{ type: Schema.Types.ObjectId, ref: 'Board' }],
});

const Account = mongoose.model('Account', AccountSchema);

export default Account;
