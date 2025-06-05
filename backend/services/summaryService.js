const prisma = require('../prismaClient');

async function accountSummaries() {
  return prisma.$queryRaw`
    SELECT a.id, a.name,
      COALESCE(json_object_agg(b.country, b.balance) FILTER (WHERE b.country IS NOT NULL), '{}') AS balances,
      SUM(CASE WHEN t.type='GiftCardAdded' THEN t.value ELSE 0 END) AS "totalGiftCardAdded",
      SUM(CASE WHEN t.type='OrderPlaced'   THEN t.value ELSE 0 END) AS "totalOrderPlaced",
      MAX(t.date) AS "lastActivity",
      a.notes
    FROM "Account" a
    LEFT JOIN "Transaction" t ON t."accountId" = a.id
    LEFT JOIN (
      SELECT "accountId", country,
        SUM(CASE WHEN type='GiftCardAdded' THEN value ELSE 0 END) -
        SUM(CASE WHEN type IN ('OrderPlaced','GiftCardSuspended') THEN value ELSE 0 END) AS balance
      FROM "Transaction"
      GROUP BY "accountId", country
    ) b ON b."accountId" = a.id AND b.country = t.country
    GROUP BY a.id
    ORDER BY a.name;
  `;
}

async function accountBalances(accountId) {
  const rows = await prisma.$queryRaw`
    SELECT country,
      SUM(CASE WHEN type='GiftCardAdded' THEN value ELSE 0 END) -
      SUM(CASE WHEN type IN ('OrderPlaced','GiftCardSuspended') THEN value ELSE 0 END) AS balance
    FROM "Transaction"
    WHERE "accountId" = ${accountId}
    GROUP BY country
  `;
  const result = {};
  for (const row of rows) {
    result[row.country] = Number(row.balance);
  }
  return result;
}

async function giftCardSummary(start, end) {
  const rows = await prisma.$queryRaw`
    SELECT country,
      SUM(CASE WHEN type='GiftCardAdded'     THEN 1 ELSE 0 END) AS "countAdded",
      SUM(CASE WHEN type='GiftCardAdded'     THEN value ELSE 0 END) AS "valueAdded",
      SUM(CASE WHEN type='GiftCardSuspended' THEN 1 ELSE 0 END) AS "countSuspended",
      SUM(CASE WHEN type='GiftCardSuspended' THEN value ELSE 0 END) AS "valueSuspended"
    FROM "Transaction"
    WHERE date BETWEEN ${start} AND ${end}
    GROUP BY country
  `;
  const result = {};
  for (const row of rows) {
    result[row.country] = {
      countAdded: Number(row.countAdded),
      valueAdded: Number(row.valueAdded),
      countSuspended: Number(row.countSuspended),
      valueSuspended: Number(row.valueSuspended)
    };
  }
  return result;
}

module.exports = { accountSummaries, accountBalances, giftCardSummary };
