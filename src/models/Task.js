//import { DataTypes } from 'sequelize';
const { DataTypes } = require('sequelize')
import sequelize from '../config/database.js';

const Task = sequelize.define('Task', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  done: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  tableName: 'tasks',
});

export default Task;
