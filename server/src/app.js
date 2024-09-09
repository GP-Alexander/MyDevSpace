import express from 'express';
import morgan from 'morgan';
import ProjectRoutes from './routes/projects.routes.js';
import AuthRoutes from './routes/auth.routes.js';
const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(ProjectRoutes, AuthRoutes);

export default app;
