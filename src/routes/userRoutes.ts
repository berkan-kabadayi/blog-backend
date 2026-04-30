import { Router } from "express";
import {
  getAllUsersController,
  createUserController,
  getUserByIdController,
  updateUserController,
  deleteUserController,
} from "../controller/userController";

const router = Router();

router.get("/", getAllUsersController);
router.post("/", createUserController);
router.get("/:id", getUserByIdController);
router.patch("/:id", updateUserController);
router.delete("/:id", deleteUserController);

export default router;
