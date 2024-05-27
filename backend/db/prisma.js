const { PrismaClient } = require('@prisma/client');
const { connectionUrl } = require('./connectionUrl');

const prisma = new PrismaClient({
  log: ['query'],
  datasources: {
    db: {
      url: connectionUrl,
    }
  }
});

module.exports = prisma;
