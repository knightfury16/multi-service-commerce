module.exports = {
  redisHost: process.env.REDIS_HOST || "localhost",
  redisPort: process.env.REDIS_PORT || 6379,
  pgHost: process.env.PG_HOST || "localhost",
  pgUser: process.env.PG_USER || "postgres",
  pgDatabase: process.env.PG_DATABASE || "postgres",
  pgPassword: process.env.PG_PASSWORD || "admin",
  pgPort: process.env.PG_PORT || 5432,
  amqpHost: process.env.AMQP_HOST || "localhost",
  amqpPassword: process.env.AMQP_PASSWORD || "admin",
  amqpUser: process.env.AMQP_USER || "admin",
  amqpPort: process.env.AMQP_PORT || "5672",
};

