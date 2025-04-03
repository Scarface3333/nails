module.exports = {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'your_database_user',
      password: process.env.DB_PASSWORD || 'your_database_password',
      database: process.env.DB_NAME || 'your_database_name',
    },
    migrations: {
      tableName: 'migrations',
      directory: './migrations',
    },
  };
  