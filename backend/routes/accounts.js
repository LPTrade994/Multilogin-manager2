const express = require('express');
const router = express.Router();

const { listAccounts, createAccount, getAccount } = require('../controllers/accounts');

router.get('/', listAccounts);
router.post('/', createAccount);
router.get('/:id', getAccount);

module.exports = router;
