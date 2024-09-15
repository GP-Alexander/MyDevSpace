import { Router } from "express";
import { login, register, verifyToken, logout } from "../controllers/auth.controller.js";
import { ValidateSchema } from "../middlewares/validator.middleware.js";
import { loginSchema, registerSchema } from "../schemas/auth.schema.js"


 const router = Router();
router.post("/login", ValidateSchema(loginSchema), login);
router.post("/register",ValidateSchema(registerSchema), register);
router.get("/verify", verifyToken);
router.get("/logout", verifyToken, logout);
export default router;
 