import { Router } from "express";
import {
  getAllCategoriesController,
  createCategoryController,
  updateCategoryController,
  deleteCategoryController,
  getCategoryByIdController,
} from "../controller/categoryController.js";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.get("/", getAllCategoriesController);
router.post("/", authMiddleware, createCategoryController);
router.put("/:id", authMiddleware, updateCategoryController);
router.delete("/:id", authMiddleware, deleteCategoryController);
router.get("/:id", getCategoryByIdController);

export default router;
