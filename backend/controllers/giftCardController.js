const { giftCardSummary } = require('../services/summaryService');

async function getGiftCardSummary(req, res) {
  const { start, end } = req.query;
  if (!start || !end) {
    return res.status(400).json({ error: 'start and end parameters required' });
  }
  try {
    const summary = await giftCardSummary(start, end);
    res.json(summary);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { getGiftCardSummary };
