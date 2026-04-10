import { db } from "../config/database.js";

export const getAllPosts = async () => {
  const query = db("posts");
  return query.select("id", "title");
};

export const createPost = async (data: object) => {
  return db("posts").insert(data).returning("*");
};

export const updatePost = async (id: number, data: object) => {
  return db("posts")
    .where({ id, deleted_at: null })
    .update(data)
    .returning("*");
};

export const deletePost = async (id: number) => {
  return db("posts")
    .where({ id, deleted_at: null })
    .update({ deleted_at: new Date() })
    .returning("*");
};

export const getPostById = async (id: number) => {
  return db("posts").where({ id, deleted_at: null }).first();
};
