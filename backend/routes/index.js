const express = require('express');
const accountsRouter = require('./accounts');
const transactionsRouter = require('./transactions');
const summaryRouter = require('./summary');
const giftCardRouter = require('./giftcards');

const router = express.Router();

router.use('/accounts', accountsRouter);
router.use('/accounts', summaryRouter); // /accounts/summary and /accounts/:id/balances
router.use('/transactions', transactionsRouter);
router.use('/summary', giftCardRouter); // /summary/giftcards

module.exports = router;
