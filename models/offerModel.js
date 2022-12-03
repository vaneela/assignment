const mongoose = require('mongoose');

const offerSchema = ({
    investor: {
        type: String,
        required: [true, "Please add a text value"],
    },
    comment: {
        type: String,
        required: [true, "Please add a text value"],
    },
    amount: {
        type: Number,
        required: [true, "Please add a numeric value"],
    },
    equity: {
        type: Number,
        required: [true, "Please add a numeric value"],
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }
}
);

module.exports = mongoose.model('Offer', offerSchema);