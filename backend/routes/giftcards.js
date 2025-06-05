const express = require('express');
const { getGiftCardSummary } = require('../controllers/giftCardController');

const router = express.Router();

router.get('/giftcards', getGiftCardSummary);

module.exports = router;
