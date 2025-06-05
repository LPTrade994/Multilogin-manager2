const express = require('express');
const router = express.Router();

const { createTransaction, listTransactions } = require('../controllers/transactions');

router.get('/', listTransactions);
router.post('/', createTransaction);

module.exports = router;
