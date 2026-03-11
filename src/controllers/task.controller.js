import { Task } from '../models/index.js';

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      where: { userId: req.user.id },
      attributes: ['id', 'name', 'done'],
    });
    return res.json({ total: tasks.length, data: tasks });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const createTask = async (req, res) => {
  try {
    const { name } = req.body;
    const task = await Task.create({ name, userId: req.user.id });
    return res.json(task);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({
      where: { id: req.params.id, userId: req.user.id },
      attributes: ['name', 'done'],
    });
    if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });
    return res.json(task);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const { name } = req.body;
    const result = await Task.update(
      { name },
      { where: { id: req.params.id, userId: req.user.id } }
    );
    return res.json(result);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const patchTask = async (req, res) => {
  try {
    const { done } = req.body;
    const result = await Task.update(
      { done },
      { where: { id: req.params.id, userId: req.user.id } }
    );
    return res.json(result);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    await Task.destroy({ where: { id: req.params.id, userId: req.user.id } });
    return res.status(204).send();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export default { getTasks, createTask, getTaskById, updateTask, patchTask, deleteTask };
