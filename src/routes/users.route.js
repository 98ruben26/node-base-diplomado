import { Router } from 'express';
import userController from '../controllers/user.controller.js';
import verifyToken from '../middlewares/auth.middleware.js';

const router = Router();

// Rutas estáticas ANTES de /:id para evitar conflictos
router.get('/api/users/list/pagination', userController.getUsersPagination);

router.route('/api/users')
  .get(userController.getUsers)
  .post(userController.createUser);

router.get('/api/users/:id/tasks', userController.getUserWithTasks);

router.route('/api/users/:id')
  .get(verifyToken, userController.getUserById)
  .put(verifyToken, userController.updateUser)
  .patch(verifyToken, userController.patchUser)
  .delete(verifyToken, userController.deleteUser);

export default router;
