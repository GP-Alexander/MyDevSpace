import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import AuthRoutes from './routes/auth.routes.js';
import CertificationsRoutes from './routes/certifications.routes.js';
import ContactRoutes from './routes/contacts.routes.js';
import EducationRoutes from './routes/education.routes.js';
import ExperienceRoutes from './routes/experience.routes.js';
import SkillsRoutes from './routes/skills.routes.js';

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(AuthRoutes, CertificationsRoutes, ContactRoutes, EducationRoutes, ExperienceRoutes, SkillsRoutes);

export default app;
