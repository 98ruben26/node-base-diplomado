import { Router } from 'express';
import taskController from '../controllers/task.controller.js';
import verifyToken from '../middlewares/auth.middleware.js';

const router = Router();

router.route('/api/tasks')
  .get(verifyToken, taskController.getTasks)
  .post(verifyToken, taskController.createTask);

router.route('/api/tasks/:id')
  .get(verifyToken, taskController.getTaskById)
  .put(verifyToken, taskController.updateTask)
  .patch(verifyToken, taskController.patchTask)
  .delete(verifyToken, taskController.deleteTask);

export default router;
