import { type Request, type Response } from "express";
import {
  createUser,
  getAllUsers,
  getUserByUsername,
} from "../models/userModel.js";

export const getAllUsersController = async (req: Request, res: Response) => {
  try {
    const items = await getAllUsers();
    res.status(200).json(items);
  } catch (error) {
    console.error("Error deleting users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createUserController = async (req: Request, res: Response) => {
  try {
    const { name, username, password } = req.body;
    if (!name || !username || !password) {
      return res
        .status(400)
        .json({ message: "Name, username and password are required" });
    }
    const existingUser = await getUserByUsername(username);
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }
  } catch (error) {
    console.error("Error deleting users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
