import { Router } from "express";
import { getExperiences, getExperienceById, createExperience, updateExperience, deleteExperience  } from "../controllers/experience.controller.js";
import { auth } from "../middlewares/auth.middleware.js";
import { ValidateSchema } from "../middlewares/validator.middleware.js";
import { createExperienceSchema, updateExperienceSchema } from "../schemas/experience.schema.js";


const useRoute = (schema, controller) => {
    return [auth, schema ? ValidateSchema(schema) : (req, res, next) => next(), controller];
}


const router = Router();

    router.route("/experiences")
        .get(...useRoute(null, getExperiences))
        .post(...useRoute(createExperienceSchema, createExperience));

        router.route("/experiences/:id")
        .get(...useRoute(null, getExperienceById))
        .put(...useRoute(updateExperienceSchema, updateExperience))
        .delete(...useRoute(null, deleteExperience));






export default router;
