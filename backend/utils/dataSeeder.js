const user = require('../data/user.json');
const product = require('../data/product.json');
const prisma = require('../db/prisma'); // why did i use separate client? ME!!

async function main() {
  // ... you will write your Prisma Client queries here
  // await prisma.user.deleteMany({});
  const users = await prisma.user.createMany({ data: user });
  console.log(users);

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
