import { Router } from "express";
import { getExperiences, getExperienceById, createExperience, updateExperience, deleteExperience  } from "../controllers/experience.controller.js";
const router = Router();

router.get("/experiences", getExperiences);
router.get("/experiences/:id", getExperienceById );
router.post("/experiences", createExperience);
router.put("/experiences/:id", updateExperience);
router.delete("/experiences/:id", deleteExperience);




export default router;
