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
    playerPosition: {
        type: String,
        required: true,
    },
    teamName: {
        type: String,
        required: true,
    },
});

const draftResultSchema = new Schema({
    year: {
        type: Number,
        required: true,
    },
    picks: [pickSchema],
});

const DraftResult = model('DraftResult', draftResultSchema);

module.exports = DraftResult;