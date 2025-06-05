const express = require('express');
const { getAllSummaries, getAccountBalances } = require('../controllers/summaryController');

const router = express.Router();

router.get('/summary', getAllSummaries); // /accounts/summary
router.get('/:id/balances', getAccountBalances);

module.exports = router;
