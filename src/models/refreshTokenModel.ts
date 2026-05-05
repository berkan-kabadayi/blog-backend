import { prisma } from "../config/database.js";
import type { Prisma } from "../../generated/client/index.js";

export const createRefreshToken = async (
  refreshToken: Prisma.RefreshTokenUncheckedCreateInput,
) => {
  return prisma.refreshToken.create({ data: refreshToken });
};
