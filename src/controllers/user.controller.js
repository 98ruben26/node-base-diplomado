import bcrypt from 'bcrypt';
import { Op } from 'sequelize';
import { User, Task } from '../models/index.js';
import env from '../config/env.js';

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({ attributes: ['id', 'username', 'status'] });
    return res.json({ total: users.length, data: users });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashed = await bcrypt.hash(password, env.saltRounds);
    const user = await User.create({ username, password: hashed });
    return res.json(user);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: ['username', 'status'],
    });
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    return res.json(user);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashed = await bcrypt.hash(password, env.saltRounds);
    const result = await User.update(
      { username, password: hashed },
      { where: { id: req.params.id } }
    );
    return res.json(result);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const patchUser = async (req, res) => {
  try {
    const { status } = req.body;
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    await user.update({ status });
    return res.json(user);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.destroy({ where: { id: req.params.id } });
    return res.status(204).send();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getUserWithTasks = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: ['username'],
      include: [{ model: Task, attributes: ['name', 'done'] }],
    });
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    return res.json(user);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getUsersPagination = async (req, res) => {
  try {
    let { page = 1, limit = 10, search, orderBy = 'id', orderDir = 'DESC', status } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    const allowedLimits = [5, 10, 15, 20];
    if (!allowedLimits.includes(limit)) limit = 10;

    const allowedOrderBy = ['id', 'username', 'status'];
    if (!allowedOrderBy.includes(orderBy)) orderBy = 'id';

    orderDir = String(orderDir).toUpperCase();
    if (orderDir !== 'ASC' && orderDir !== 'DESC') orderDir = 'DESC';

    if (isNaN(page) || page < 1) page = 1;

    const where = {};
    if (search) {
      where.username = { [Op.iLike]: `%${search}%` };
    }
    if (status) {
      const statusMap = { active: 'ACTIVO', inactive: 'INACTIVO', ACTIVO: 'ACTIVO', INACTIVO: 'INACTIVO' };
      const mapped = statusMap[status];
      if (mapped) where.status = mapped;
    }

    const offset = (page - 1) * limit;
    const { count, rows } = await User.findAndCountAll({
      attributes: ['id', 'username', 'status'],
      where,
      order: [[orderBy, orderDir]],
      limit,
      offset,
    });

    const pages = Math.ceil(count / limit);
    return res.json({ total: count, page, pages, data: rows });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export default {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  patchUser,
  deleteUser,
  getUserWithTasks,
  getUsersPagination,
};
