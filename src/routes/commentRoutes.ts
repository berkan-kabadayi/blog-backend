import { Router } from "express";
import {
  createCommentController,
  deleteCommentController,
  getAllCommentController,
  getCommentByIdController,
  updateCommentController,
} from "../controller/commentController.js";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.get("/", getAllCommentController);
router.post("/", authMiddleware, createCommentController);
router.put("/:id", authMiddleware, updateCommentController);
router.delete("/:id", authMiddleware, deleteCommentController);
router.get("/:id", getCommentByIdController);

export default router;
