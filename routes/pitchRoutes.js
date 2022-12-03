const express = require('express');
const router = express.Router();
const { check } = require('express-validator/check');
const { getSinglePitch, counterAPitch, createPitch, getAllPitches } = require('../controllers/pitchController');

// post a pitch
router.post('/',[
    check('entrepreneur').isString().withMessage('Entrepreneur must be string'),
    check('equity').isNumeric().withMessage('Equity must be numeric'),
    check('askAmount').isNumeric().withMessage('Amount must be numeric'),
    check('pitchTitle').isString().withMessage('Pitch title must be string'),
    check('pitchIdea').isString().withMessage('Pitch Idea must be string'),
], createPitch);

// make a counter offer for a pitch
router.post('/:id/makeOffer', [
    check('id').isMongoId().withMessage('id is not valid'),
    check('investor').isString().withMessage('Invester must be string'),
    check('equity').isNumeric().withMessage('Equity must be numeric'),
    check('amount').isNumeric().withMessage('Amount must be numeric'),
    check('comment').isString().withMessage('Comment must be string'),
], counterAPitch);

//fetch all the pitches
router.get('/',[
    check('equity').isNumeric()
], getAllPitches);

// fetch a single pitch
router.get('/:id', [
    check('id').isMongoId().withMessage('id is not valid')
],getSinglePitch);

module.exports = router;