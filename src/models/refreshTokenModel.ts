import { prisma } from "../config/database.js";
import type { Prisma } from "../../generated/client/index.js";

export const createRefreshToken = async (
  refreshToken: Prisma.RefreshTokenUncheckedCreateInput,
) => {
  return prisma.refreshToken.create({ data: refreshToken });
};

export const getRefreshTokenByUserId = async (userId: number) => {
  return prisma.refreshToken.findFirst({
    where: {
      user_id: userId,
      revoked_at: null,
      expires_at: { gt: new Date() },
    },
  });
};

export const getRefreshTokenByTokenAndUserId = async (
  token: string,
  userId: number,
) => {
  return prisma.refreshToken.findFirst({
    where: {
      token,
      user_id: userId,
      revoked_at: null,
      expires_at: { gt: new Date() },
    },
  });
};

export const revokeRefreshToken = async (id: number) => {
  return prisma.refreshToken.update({
    where: {
      id,
    },
    data: { revoked_at: new Date() },
  });
};
