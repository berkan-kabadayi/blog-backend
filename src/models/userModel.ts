import { prisma } from "../config/database.js";

export const createUser = async (
  name: String,
  username: String,
  hashed_password: String,
) => {
  const user = { name, username, hashed_password };
  return prisma.user.create({ data: user });
};

export const getAllUsers = async () => {
  return prisma.user.findMany({
    select: { id: true, username: true },
    where: { deleted_at: null },
    orderBy: { username: "asc" },
  });
};

export const getUserByUsername = async (username: String) => {
  return prisma.user.findFirst({
    where: { username, deleted_at: null },
  });
};
