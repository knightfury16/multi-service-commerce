const product = require('../../data/product.json');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // ... you will write your Prisma Client queries here
  await prisma.product.deleteMany({});
  const products = await prisma.product.createMany({ data: product });
  prisma.product.create({data:{}})
  console.log(products);
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
