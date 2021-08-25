const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccountSchema = new Schema(
  {
    email: { type: String, required: true, lowercase: true, trim: true },
    username: { type: String, required: true, trim: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

AccountSchema.virtual('url').get(() => {
  return `/${this.username}`;
});

module.exports = mongoose.model('Account', AccountSchema);
