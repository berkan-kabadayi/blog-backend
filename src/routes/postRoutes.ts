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

const router = Router();

router.get("/", getAllPostsController);
router.post("/", createPostController);
router.put("/:id", updatePostController);
router.delete("/:id", deletePostController);
router.get("/:id", getPostByIdController);

router.post("/:id/tags", addTagToPostController);
router.delete("/:id/tags", removeTagFromPostController);

export default router;
