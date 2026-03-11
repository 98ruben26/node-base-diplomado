import sequelize from '../config/database.js';
import User from './User.js';
import Task from './Task.js';

User.hasMany(Task, { foreignKey: 'userId' });
Task.belongsTo(User, { foreignKey: 'userId' });

export { sequelize, User, Task };
