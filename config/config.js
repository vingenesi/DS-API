require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT || 5432
  },
  test: {
    dialect: process.env.DB_DIALECT_TEST,
    storage: process.env.STORAGE_TEST,
    logging: process.env.LOGGING_TEST
  },
  production: {
    username: process.env.DB_USER_DEPLOY,
    password: process.env.DB_PASS_DEPLOY,
    database: process.env.DB_NAME_DEPLOY,
    host: process.env.DB_HOST_DEPLOY,
    dialect: process.env.DB_DIALECT_DEPLOY,
    port: process.env.DB_PORT_DEPLOY || 5432
  }
};
