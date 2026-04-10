import { db } from "../config/database.js";

export const getAllComments = async (post: number, commenter: number) => {
  let query = db("comments");
  if (post) {
    query = query.where({ post_id: post });
  }

  if (commenter) {
    query = query.where({ commenter_name: commenter });
  }

  return query.select("id", "commenter_name");
};

export const createComment = async (data: object) => {
  return db("comments").insert(data).returning("*");
};

export const updateComment = async (id: number, data: object) => {
  return db("comments").where({ id }).update(data).returning("*");
};

export const deleteComment = async (id: number) => {
  return db("comments").where({ id }).delete().returning("*");
};

export const getCommentById = async (id: number) => {
  return db("comments").where({ id }).first();
};
