import { Router } from "express";
import {
  createCommentController,
  deleteCommentController,
  getAllCommentController,
  getCommentByIdController,
  updateCommentController,
} from "../controller/commentController.js";

const router = Router();

router.get("/", getAllCommentController);
router.post("/", createCommentController);
router.put("/:id", updateCommentController);
router.delete("/:id", deleteCommentController);
router.get("/:id", getCommentByIdController);

export default router;
