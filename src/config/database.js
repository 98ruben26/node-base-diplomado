import { Sequelize } from 'sequelize';
//import dotenv from 'dotenv';
//const { Sequelize } = require('sequelize');
import env from './env.js';
//dotenv.config();



const dialectOptions = env.db.useSSL
  ? { ssl: { require: true, rejectUnauthorized: false } }
  : {};

const sequelize = new Sequelize(
  env.db.database,
  env.db.user,
  env.db.password,
  {
    host: env.db.host,
    port: env.db.port,
    dialect: env.db.dialect,
    dialectOptions,
    logging: false,
  }
);

export default sequelize;
