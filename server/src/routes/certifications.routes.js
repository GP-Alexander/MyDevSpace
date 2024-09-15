import { Router } from "express";
import { createCertification, getCertifications, getCertification, updateCertification, deleteCertification } from "../controllers/certifications.controller.js";
import { auth } from "../middlewares/auth.middleware.js";
import { ValidateSchema } from "../middlewares/validator.middleware.js";
import { createCertificationSchema, updateCertificationSchema } from "../schemas/certifications.schema.js";
// Define una función para evitar repetición en las rutas con middleware
const useRoute = (schema, controller) => {
    return [auth, schema ? ValidateSchema(schema) : (req, res, next) => next(), controller];
};

const router = Router();

router.route("/certifications")
    .get(...useRoute(null, getCertifications))
    .post(...useRoute(createCertificationSchema, createCertification));

router.route("/certifications/:id")
    .get(...useRoute(null, getCertification))
    .put(...useRoute(updateCertificationSchema, updateCertification))
    .delete(...useRoute(null, deleteCertification));

export default router;
