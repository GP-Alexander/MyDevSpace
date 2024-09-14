import { Router } from "express";
import {getSkills, getSkillById, createSkill, updateSkill, deleteSkill} from "../controllers/skills.controller.js";


const router = Router();

router.get("/skills", getSkills);
router.get("/skills/:id", getSkillById);
router.post("/skills", createSkill);
router.put("/skills/:id", updateSkill);
router.delete("/skills/:id", deleteSkill);
export default router;