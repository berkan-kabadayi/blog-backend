import { type Request, type Response } from "express";
import {
  createTag,
  getAllTags,
  getTagById,
  updateTag,
  deleteTag,
} from "../models/tagModel.js";

export const getAllTagsController = async (req: Request, res: Response) => {
  try {
    const items = await getAllTags();
    res.status(200).json(items);
  } catch (error) {
    console.error("Error deleting tags:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createTagController = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const createdItem = await createTag(name);
    res.status(201).json(createdItem);
  } catch (error) {
    console.error("Error deleting tags:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getTagByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const item = await getTagById(Number(id));
    if (!item) {
      res.status(404).json({ message: "Tag not found" });
      return;
    }
    res.status(200).json(item);
  } catch (error) {
    console.error("Error deleting tags:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateTagController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updatedItem = await updateTag(Number(id), name);
    if (!updatedItem) {
      res.status(404).json({ message: "Tag not found" });
      return;
    }
    res.status(200).json(updatedItem);
  } catch (error) {
    console.error("Error deleting tags:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteTagController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedItem = await deleteTag(Number(id));
    if (!deletedItem) {
      res.status(404).json({ message: "Tag not found" });
      return;
    }
    res.status(200).json(deletedItem);
  } catch (error) {
    console.error("Error deleting tags:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
