import { type Request, type Response } from "express";
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryById,
} from "../models/categoryModel.js";

export const getAllCategoriesController = async (
  req: Request,
  res: Response
) => {
  try {
    const items = await getAllCategories();
    res.status(200).json(items);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createCategoryController = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const item = await createCategory(name);
    res.status(201).json(item);
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateCategoryController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const item = await updateCategory(Number(id), data);
    res.status(200).json(item);
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteCategoryController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedItem = await deleteCategory(Number(id));
    res.status(204).json(deletedItem);
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ message: "Internals server error" });
  }
};

export const getCategoryByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const item = await getCategoryById(Number(id));
    if (!item) {
      res.status(404).json({ message: "Category not found" });
      return;
    }
    res.status(200).json(item);
  } catch (error) {
    console.error("Error fetching category by ID:", error);
    res.status(500).json({ message: "Internals server error" });
  }
};
