import { Router } from "express";
import {
  createTagController,
  deleteTagController,
  getAllTagsController,
  getTagByIdController,
  updateTagController,
} from "../controller/tagController.js";

const router = Router();

router.get("/", getAllTagsController);
router.post("/", createTagController);
router.put("/:id", updateTagController);
router.delete("/:id", deleteTagController);
router.get("/:id", getTagByIdController);

export default router;
