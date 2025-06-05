const prisma = require('../prismaClient');

async function listAccounts(req, res) {
  try {
    const accounts = await prisma.account.findMany({
      include: {
        transactions: true,
      },
      orderBy: { createdAt: 'asc' }
    });

    const result = await Promise.all(accounts.map(async acc => {
      const balances = await prisma.transaction.groupBy({
        by: ['country'],
        where: { accountId: acc.id },
        _sum: {
          value: true
        },
        _count: true
      });

      const agg = await prisma.$queryRaw`SELECT
        country,
        SUM(CASE WHEN type='GiftCardAdded' THEN value ELSE 0 END) -
        SUM(CASE WHEN type IN ('OrderPlaced','GiftCardSuspended') THEN value ELSE 0 END) AS balance
      FROM "Transaction"
      WHERE "accountId" = ${acc.id}
      GROUP BY country`;

      return {
        ...acc,
        balance: agg
      };
    }));

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function createAccount(req, res) {
  try {
    const { name, notes } = req.body;
    const account = await prisma.account.create({ data: { name, notes } });
    res.status(201).json(account);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function getAccount(req, res) {
  try {
    const { id } = req.params;
    const account = await prisma.account.findUnique({
      where: { id },
      include: { transactions: true }
    });
    if (!account) return res.status(404).json({ error: 'Not found' });
    res.json(account);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { listAccounts, createAccount, getAccount };
