import { db } from "../config/database.js";

export const getAllCategories = async () => {
  const query = db("categories");
  return query.select("id, name");
};

export const createCategory = async (name: string) => {
  return db("categories").insert({ name }).returning("id,name");
};

export const updateCategory = async (id: number, data: object) => {
  return db("categories").where({ id, deleted_at: null }).update(data).returning("*");
};

export const deleteCategory = async (id:number) => {
  return db("categories").where({ id, deleted_at: null }).update({ deleted_at: new Date() }).returning("*");
}

export const getCategoryById = async (id: number) => {
  return db("categories").where({ id, deleted_at: null }).first();
}