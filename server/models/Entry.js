const { Schema, model } = require('mongoose');

// Entry Schema
const entrySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  pickNumber: {
    type: Number,
    required: true,
  },
  playerName: {
    type: String,
    required: true,
  },
  playerPosition: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Create the Entry model
const Entry = model('Entry', entrySchema);

module.exports = Entry;