import { type Request, type Response } from "express";
import {
  getAllComments,
  createComment,
  updateComment,
  deleteComment,
  getCommentById,
} from "../models/commentModel.js";

export const getAllCommentController = async (req: Request, res: Response) => {
  try {
    const { post, commenter } = req.query;
    const items = await getAllComments(Number(post), Number(commenter));
    res.json(items);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createCommentController = async (req: Request, res: Response) => {
  try {
    const newItem = await createComment(req.body);
    res.status(201).json(newItem);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const updateCommentController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedItem = await updateComment(Number(id), req.body);
    if (!updatedItem) {
      res.status(404).json({ message: "Comment not found" });
    }
    res.json(updatedItem);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const deleteCommentController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedItem = await deleteComment(Number(id));
    if (!deletedItem) {
      res.status(404).json({ message: "Comment not found" });
    }
    res.json(deletedItem);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getCommentByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const item = await getCommentById(Number(id));
    if (!item) {
      res.status(404).json({ message: "Comment not found" });
    }
    res.json(item);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
