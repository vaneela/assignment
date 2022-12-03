const mongoose = require('mongoose');

const pitchSchema = ({
    entrepreneur: {
        type: String,
        required: [true, "Please add a text value"],
    },
    pitchTitle: {
        type: String,
        required: [true, "Please add a text value"],
    },
    pitchIdea: {
        type: String,
        required: [true, "Please add a text value"],
    },
    askAmount: {
        type: Number,
        required: [true, "Please add a numeric value"],
    },
    equity: {
        type: Number,
        required: [true, "Please add a numeric value"],
    },
    offers: {
        type: [mongoose.Types.ObjectId],
        ref: "Offer",
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }
}
);

module.exports = mongoose.model('Pitch', pitchSchema);