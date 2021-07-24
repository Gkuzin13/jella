const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubTaskSchema = new Schema(
  {
    taskName: { type: Schema.Types.String, require: true },
    isDone: { type: Schema.Types.Boolean, default: false, required: true },
    cardId: { type: Schema.Types.ObjectId, ref: 'Card', required: true },
    boardId: { type: Schema.Types.ObjectId, ref: 'Board', required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('SubTask', SubTaskSchema);
