import { Router } from "express";
import {
  loginController,
  meController,
  registerController,
} from "../controller/authController";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/me", authMiddleware, meController);

export default router;
