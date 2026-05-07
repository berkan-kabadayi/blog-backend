import { Router } from "express";
import {
  createPostController,
  deletePostController,
  getAllPostsController,
  getPostByIdController,
  updatePostController,
  addTagToPostController,
  removeTagFromPostController,
} from "../controller/postController.js";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.get("/", getAllPostsController);
router.post("/", authMiddleware, createPostController);
router.put("/:id", authMiddleware, updatePostController);
router.delete("/:id", authMiddleware, deletePostController);
router.get("/:id", getPostByIdController);

router.post("/:id/tags", authMiddleware, addTagToPostController);
router.delete("/:id/tags", authMiddleware, removeTagFromPostController);

export default router;
