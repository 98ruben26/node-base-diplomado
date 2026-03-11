//import 'dotenv/config'

const env = {
  port: process.env.PORT || '3000',
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD ||'',
    database: process.env.DB_DATABASE || 'proyecto',
    dialect: process.env.DB_DIALECT || 'postgres',
    useSSL: process.env.DB_USE_SSL === 'true',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'secret',
    expiresIn: process.env.JWT_EXPIRES || '1d',
  },
  saltRounds: parseInt(process.env.SALT_ROUNDS || '10'),
}

export default env
