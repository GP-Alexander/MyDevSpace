import { Router } from "express";
import {createEducation, getEducation, getEducationById, updateEducation, deleteEducation} from "../controllers/education.controller.js";
import { auth } from "../middlewares/auth.middleware.js";
import { ValidateSchema } from "../middlewares/validator.middleware.js";
import { createEducacionSchema, updateEducationSchema } from "../schemas/education.shema.js";

const useRoute = (schema, controller) => {
    return [auth, schema ? ValidateSchema(schema) : (req, res, next) => next(), controller];
};


const router = Router();
router.route("/education")
    .get(...useRoute(null, getEducation))
    .post(...useRoute(createEducacionSchema, createEducation));

router.route("/education/:id")
    .get(...useRoute(null, getEducationById))
    .put(...useRoute(updateEducationSchema, updateEducation))
    .delete(...useRoute(null, deleteEducation));



export default router;