import express from 'express';
import morgan from 'morgan';
import usersRoutes from './routes/users.route.js';
import authRoutes from './routes/auth.route.js';
import tasksRoutes from './routes/tasks.route.js';

const app = express();

app.use(express.json());
app.use(morgan('combined'));

app.use('/', usersRoutes);
app.use('/', authRoutes);
app.use('/', tasksRoutes);

export default app;

