import { Router } from "express";
import {createEducation, getEducation, getEducationById, updateEducation, deleteEducation} from "../controllers/education.controller.js";

const router = Router();
router.post("/education", createEducation);
router.get("/education", getEducation);
router.get("/education/:id", getEducationById);
router.put("/education/:id", updateEducation);
router.delete("/education/:id", deleteEducation);

export default router;