import { Router } from "express";
import {
  getProjects,
  getProject,
  createProject,
  deleteProject,
  updateProject,
} from "../controllers/projects.controllers.js";
import { auth } from "../middlewares/auth.middleware.js";
import { ValidateSchema } from "../middlewares/validator.middleware.js";
import { createProjectSchema, updateProjectSchema } from "../schemas/projects.schema.js";

const useRoute = (schema, controller) => {
  return [auth, schema ? ValidateSchema(schema) : (req, res, next) => next(), controller];
}


const router = Router();

router.route("/projects")
  .get(...useRoute(null, getProjects))
  .post(...useRoute(createProjectSchema, createProject));

router.route("/projects/:id")
  .get(...useRoute(null, getProject))
  .put(...useRoute(updateProjectSchema, updateProject))
  .delete(...useRoute(null, deleteProject));



export default router;