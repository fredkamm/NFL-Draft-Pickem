const { Schema, model } = require('mongoose');

const pickSchema = new Schema({
  pickNumber: {
    type: Number,
    required: true,
  },
  playerName: {
    type: String,
    required: true,
  },
});

const entrySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  picks: [pickSchema],
  score: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

const Entry = model('Entry', entrySchema);

module.exports = Entry;