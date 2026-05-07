import { type Request, type Response } from "express";
import {
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
  getPostById,
} from "../models/postModel.js";
import { addTagToPost, removeTagFromPost } from "../models/postTagModel.js";
import { getUserById } from "../models/userModel.js";

export const getAllPostsController = async (req: Request, res: Response) => {
  try {
    const { showDeleted, category, status, tags } = req.query;
    const tagIds = tags?.toString().split(" , ").map(Number);
    const items = await getAllPosts(
      showDeleted as string,
      Number(category),
      status as string,
      tagIds,
    );
    res.json(items);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createPostController = async (req: Request, res: Response) => {
  try {
    const newItem = await createPost(req.body, req.user as number);
    res.status(201).json(newItem);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updatePostController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const item = await getPostById(Number(id));
    if (!item) {
      return res.status(404).json({ message: "Post not found" });
    }
    const requestUser = await getUserById(req.user as number);
    const isElevatedRole =
      requestUser?.role === "ADMIN" || requestUser?.role === "MODERATOR";
    const postOwnerId = (item as { user_id?: number }).user_id;
    if (!isElevatedRole && requestUser?.id !== postOwnerId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this user" });
    }

    const updatedItem = await updatePost(Number(id), req.body);
    if (!updatedItem) {
      res.status(404).json({ message: "Post not found" });
    }
    res.json(updatedItem);
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deletePostController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const item = await getPostById(Number(id));
    if (!item) {
      return res.status(404).json({ message: "Post not found" });
    }
    const requestUser = await getUserById(req.user as number);
    const isElevatedRole = requestUser?.role === "ADMIN";
    const postOwnerId = (item as { user_id?: number }).user_id;
    if (!isElevatedRole && requestUser?.id !== postOwnerId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this user" });
    }

    const deletedItem = await deletePost(Number(id));
    if (!deletedItem) {
      res.status(404).json({ message: "Post not found" });
    }
    res.json(deletedItem);
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getPostByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const item = await getPostById(Number(id));
    if (!item) {
      res.status(404).json({ message: "Post not found" });
    }
    res.json(item);
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const addTagToPostController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { tagId } = req.body;
    const item = await addTagToPost(Number(id), Number(tagId));
    res.status(201).json(item);
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const removeTagFromPostController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const { tagId } = req.body;
    const item = await removeTagFromPost(Number(id), Number(tagId));
    res.status(200).json(item);
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
