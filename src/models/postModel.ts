import { db } from "../config/database.js";

export const getAllPosts = async (
  showDeleted: string,
  category: number,
  status: string
) => {
  let query = db("posts")
  if (category) {
    query.where({ category_id: category });
  }
  if (showDeleted === "true") {
  } else if (showDeleted === "onlyDeleted") {
    query.whereNot({ deleted_at: null });
  } else {
    query.where({ deleted_at: null });
  }

  if (status === "published") {
    query.whereNot({ published_at: null });
  } else if (status === "draft") {
    query.where({ published_at: null });
  }

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
