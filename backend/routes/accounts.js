const express = require('express');
const router = express.Router();

// In-memory storage for now
const accounts = [];

router.get('/', (req, res) => {
  res.json(accounts);
});

router.post('/', (req, res) => {
  const account = { id: accounts.length + 1, ...req.body };
  accounts.push(account);
  res.status(201).json(account);
});

module.exports = router;
