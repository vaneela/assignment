const Pitch = require('../models/pitchModel');
const Offer = require('../models/offerModel');
const { validationResult } = require('express-validator');


// @desc     Get all Pitches in reverse chronological order
// @route    GET /api/pitches
// @access   Public
const getAllPitches = async (req, res) => {
    try {
        const pitches = await Pitch.find().sort({ createdAt: -1 }).populate('offers');
        res.status(200).json(pitches);
    } catch (error) {
        res.status(400).json({ msg: "Failed to get pitches" });
    }
};

// @desc     Post a Pitch
// @route    POST /api/pitches
// @access   Public
const createPitch = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            res.status(400).json({ success: false, errors: errors.array() });

        const pitch = await Pitch.create({
            entrepreneur: req.body.entrepreneur,
            pitchIdea: req.body.pitchIdea,
            pitchTitle: req.body.pitchTitle,
            askAmount: req.body.askAmount,
            equity: req.body.equity,
            offers: [],
            createdAt: Date.now(),
        })

        res.status(201).json({ "id": pitch.id });
    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: "Failed to create pitch" });
    }
};

// @desc     Counter a Pitches
// @route    POST /api/:id/makeOffer
// @access   Public
const counterAPitch = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            res.status(400).json({ success: false, errors: errors.array() });


        const pitch = await Pitch.findById(req.params.id);

        // console.log(pitch);

        if (!pitch)
            return res.status(404).json({ msg: "Pitch not found" });

        const offer = await Offer.create({
            investor: req.body.investor,
            comment: req.body.comment,
            amount: req.body.amount,
            equity: req.body.equity,
            createdAt: Date.now(),
        });

        pitch.offers = [...pitch.offers, offer];

        await Pitch.findByIdAndUpdate( req.params.id, pitch, {
            new: true,
            runValidators: true,
        })

        res.status(201).json({ "investor": offer.investor });
    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: "Failed to create offer" });
    }
};

// @desc     Get Single Pitches
// @route    GET /api/:id
// @access   Public
const getSinglePitch = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            res.status(400).json({ success: false, errors: errors.array() });

        const pitch = await Pitch.findOne({ _id: req.params.id }).populate('offers');

        if (!pitch)
            res.status(404).json({ msg: "Pitch not found" });

        res.status(200).json(pitch);
    } catch (error) {
        res.status(400).json({ msg: "Failed to get pitch" });
    }
};

module.exports = {
    getAllPitches,
    createPitch,
    counterAPitch,
    getSinglePitch,
}