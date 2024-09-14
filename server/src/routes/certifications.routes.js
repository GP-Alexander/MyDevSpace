import { Router } from "express";
import { createCertification, getCertifications, getCertification, updateCertification, deleteCertification } from "../controllers/certifications.controller.js";

const router = Router();

router.get("/certifications", getCertifications);
router.get("/certifications/:id", getCertification);
router.post("/certifications", createCertification);
router.put("/certifications/:id", updateCertification);
router.delete("/certifications/:id", deleteCertification);

export default router;