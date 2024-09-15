import { Router } from "express";
import {getSkills, getSkillById, createSkill, updateSkill, deleteSkill} from "../controllers/skills.controller.js";
import { ValidateSchema } from "../middlewares/validator.middleware.js";
import { skillsSchema, updateSkillsSchema } from "../schemas/skills.schema.js";    

const useRoute = (schema, controller) => {
    return [schema ? ValidateSchema(schema) : (req, res, next) => next(), controller];
}

const router = Router();
router.route("/skills")
    .get(...useRoute(null, getSkills))
    .post(...useRoute(skillsSchema, createSkill));

router.route("/skills/:id")
    .get(...useRoute(null, getSkillById))
    .put(...useRoute(updateSkillsSchema, updateSkill))
    .delete(...useRoute(null, deleteSkill));
export default router;