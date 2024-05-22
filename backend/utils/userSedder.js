const user = require('../../data/user.json');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // ... you will write your Prisma Client queries here
  // await prisma.user.deleteMany({});
  const users = await prisma.user.createMany({ data: user });
  console.log(users);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
