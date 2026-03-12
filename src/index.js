import 'dotenv/config'
//import dotenv from 'dotenv';
import app from './app.js';
import env from './config/env.js';
import logger from './logs/logger.js';
//import sequelize from './config/database.js'; // Sin llaves {} porque es export default
import { sequelize } from './models/index.js';

async function main() {
  await sequelize.authenticate();
  logger.info('DB conectada correctamente');//
  await sequelize.sync({ alter: true });
  logger.info('Tablas sincronizadas');

  const port = env.port;
  app.listen(port);
  logger.info('Server on port ' + port);
}

main().catch((err) => {
  logger.error('Error al iniciar: ' + err.message);
  process.exit(1);
});
