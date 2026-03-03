const sharedConfig = {
  dialect: 'postgres',
};

module.exports = {
  development: {
    ...sharedConfig,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 5432),
    logging: process.env.DB_LOGGING === 'true' ? console.log : false,
  },
  test: {
    ...sharedConfig,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 5432),
    logging: false,
  },
  production: process.env.DATABASE_URL
    ? {
        ...sharedConfig,
        use_env_variable: 'DATABASE_URL',
        logging: false,
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
      }
    : {
        ...sharedConfig,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT || 5432),
        logging: false,
      },
};
