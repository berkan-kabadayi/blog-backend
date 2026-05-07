import { type Request, type Response } from "express";
import {
  getAllComments,
  createComment,
  updateComment,
  deleteComment,
  getCommentById,
} from "../models/commentModel.js";
import { getUserById } from "../models/userModel.js";
import { getPostById } from "../models/postModel.js";

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
    const newItem = await createComment(req.body, req.user as number);
    res.status(201).json(newItem);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const updateCommentController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const item = await getCommentById(Number(id));
    if (!item) {
      return res.status(404).json({ message: "Comment not found" });
    }
    const requestUser = await getUserById(req.user as number);
    if (requestUser?.id !== item.user_id) {
      return res
        .status(403)
        .json({ message: " You are not authorized to update this comment" });
    }
    const updatedItem = await updateComment(Number(id), req.body);
    res.json(updatedItem);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const deleteCommentController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const item = await getCommentById(Number(id));
    if (!item) {
      return res.status(404).json({ message: "Comment not found" });
    }

    const post = await getPostById(item.post_id);
    if (!post) {
      res.status(404).json({ message: "Post not found" });
    }

    const requestUser = await getUserById(req.user as number);
    if (
      requestUser?.id !== item.user_id &&
      requestUser?.role !== "ADMIN" &&
      requestUser?.role !== "MODERATOR"
      && post?.user_id !== requestUser?.id
    ) {
      return res
        .status(403)
        .json({ message: " You are not authorized to update this comment" });
    }
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
