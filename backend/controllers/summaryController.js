const { accountSummaries, accountBalances } = require('../services/summaryService');

async function getAllSummaries(req, res) {
  try {
    const rows = await accountSummaries();
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function getAccountBalances(req, res) {
  try {
    const { id } = req.params;
    const balances = await accountBalances(id);
    res.json(balances);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { getAllSummaries, getAccountBalances };
