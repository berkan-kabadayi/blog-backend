import { Router } from "express";
import {
  createTagController,
  deleteTagController,
  getAllTagsController,
  getTagByIdController,
  updateTagController,
} from "../controller/tagController.js";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.get("/", getAllTagsController);
router.post("/", authMiddleware, createTagController);
router.put("/:id", authMiddleware, updateTagController);
router.delete("/:id", authMiddleware, deleteTagController);
router.get("/:id", getTagByIdController);

export default router;
