import { prisma } from "../config/database.js";
import { SHOW_DELETED_TRUE, POST_STATUS } from "../utils/constants.js";

const createWhereClause = (id: number, deleted_at: Date | null) => {
  return {
    id,
    deleted_at: deleted_at,
  };
};

export const getAllPosts = async (
  showDeleted: string,
  category: number,
  status: string,
) => {
  let whereClause: any = {};
  if (showDeleted === SHOW_DELETED_TRUE.TRUE) {
  } else if (showDeleted === SHOW_DELETED_TRUE.ONLY_DELETED) {
    whereClause.deleted_at = { not: null };
  } else {
    whereClause.deleted_at = null;
  }
  if (category) {
    whereClause.category_id = category;
  }

  if (status === POST_STATUS.PUBLISHED) {
    whereClause.post_id = { not: null };
  } else if (status === POST_STATUS.DRAFT) {
    whereClause.published_at = null;
  }
  return prisma.post.findMany({
    where: whereClause,
    select: {
      id: true,
      title: true,
    },
  });
};

export const createPost = async (data: object) => {
  return prisma.post.create({ data: data as any });
};

export const updatePost = async (id: number, data: object) => {
  return prisma.post.update({
    where: createWhereClause(id, null),
    data: data as any,
  });
};

export const deletePost = async (id: number) => {
  return prisma.post.update({
    where: createWhereClause(id, null),
    data: { deleted_at: new Date() },
  });
};

export const getPostById = async (id: number) => {
  return prisma.post.findFirst({
    where: createWhereClause(id, null),
  });
};
