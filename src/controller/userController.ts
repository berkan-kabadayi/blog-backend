import { type Request, type Response } from "express";
import {
  createUser,
  getAllUsers,
  getUserByUsername,
  getUserById,
  updateUser,
  deleteUser,
} from "../models/userModel.js";
import argon2, { argon2id } from "argon2";

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
    const hashedPassword = await argon2.hash(password, {
      type: argon2.argon2id,
      memoryCost: 2 ** 16,
      timeCost: 3,
      parallelism: 1,
    });
    await createUser(name, username, hashedPassword);
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error deleting users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await getUserById(Number(id));
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateUserController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, username, password } = req.body;
    if (!name && !username && !password) {
      return res
        .status(400)
        .json({ message: "Name, username or password are required" });
    }
    const userId = Number(id);
    const user = await getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const updateData: {
      name?: string;
      username?: string;
      hashed_password?: string;
    } = {};

    if (username && username !== user.username) {
      const existingUser = await getUserByUsername(username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }
      updateData.username = username;
    }
    if (password) {
      const hashedPassword = await argon2.hash(password, {
        type: argon2.argon2id,
        memoryCost: 2 ** 16,
        timeCost: 3,
        parallelism: 1,
      });
      updateData.hashed_password = hashedPassword;
    }
    if (name) {
      updateData.name = name;
    }

    await updateUser(userId, updateData);

    return res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteUserController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await getUserById(Number(id));
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await deleteUser(Number(id));
    res.status(204).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
