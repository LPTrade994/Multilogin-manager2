import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const account = await prisma.account.create({
    data: {
      name: 'Demo Account',
      notes: 'Seed data'
    }
  });

  await prisma.transaction.createMany({
    data: [
      {
        accountId: account.id,
        date: new Date(),
        codeOrOrderId: 'GC123',
        value: 100,
        country: 'IT',
        type: 'GiftCardAdded'
      },
      {
        accountId: account.id,
        date: new Date(),
        codeOrOrderId: 'ORD456',
        value: 50,
        country: 'IT',
        type: 'OrderPlaced'
      }
    ]
  });
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
