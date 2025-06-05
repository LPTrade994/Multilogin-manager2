const prisma = require('../prismaClient');

async function createTransaction(req, res) {
  try {
    const { accountId, date, codeOrOrderId, value, country, type } = req.body;
    const tx = await prisma.transaction.create({
      data: { accountId, date: new Date(date), codeOrOrderId, value, country, type }
    });
    res.status(201).json(tx);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function listTransactions(req, res) {
  try {
    const txs = await prisma.transaction.findMany();
    res.json(txs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { createTransaction, listTransactions };
