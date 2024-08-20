const { Schema, model } = require('mongoose');

const draftResultSchema = new Schema({
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

const DraftResult = model('DraftResult', draftResultSchema);

module.exports = DraftResult;