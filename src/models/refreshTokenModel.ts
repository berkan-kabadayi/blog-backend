import { prisma } from "../config/database.js";
import type { RefreshToken } from "../../generated/client/index.js";

export const createRefreshToken = async (
  refreshToken: Partial<RefreshToken>,
) => {
  return prisma.refreshToken.create({ data: refreshToken });
};
