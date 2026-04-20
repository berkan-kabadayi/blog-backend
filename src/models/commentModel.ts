import { prisma } from "../config/database.js";

export const getAllComments = async (post: number, commenter: number) => {
  let whereClause: any = {};
  if (post) {
    whereClause.post.id = post;
  }

  if (commenter) {
    whereClause.commenter.name = commenter;
  }

  return prisma.comment.findMany({
    where: whereClause,
    select: { id: true, commenter_name: true },
  });
};

export const createComment = async (data: object) => {
  return prisma.comment.create({ data: data as any });
};

export const updateComment = async (id: number, data: object) => {
  return prisma.comment.update({ where: { id }, data: data as any });
};

export const deleteComment = async (id: number) => {
  return prisma.comment.delete({ where: { id } });
};

export const getCommentById = async (id: number) => {
  return prisma.comment.findFirst({ where: { id } });
};
