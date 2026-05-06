import { Router } from "express";
import {
  loginController,
  logoutController,
  meController,
  refreshTokenController,
  registerController,
} from "../controller/authController";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/me", authMiddleware, meController);
router.post("/refresh-token", refreshTokenController);
router.post("/logout", logoutController);

export default router;
