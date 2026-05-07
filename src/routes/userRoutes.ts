import { Router } from "express";
import {
  getAllUsersController,
  createUserController,
  getUserByIdController,
  updateUserController,
  deleteUserController,
} from "../controller/userController";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.get("/", getAllUsersController);
router.post("/", authMiddleware, createUserController);
router.get("/:id", getUserByIdController);
router.patch("/:id", authMiddleware, updateUserController);
router.delete("/:id", authMiddleware, deleteUserController);

export default router;
