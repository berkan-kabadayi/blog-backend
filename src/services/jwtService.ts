import { SignJWT, jwtVerify } from "jose";
import { JWT_EXPIRATION } from "../utils/constants.js";

const generateAccessSecret = async () => {
  return new TextEncoder().encode(process.env.JWT_ACCESS_SECRET_KEY);
};

const generateRefreshSecret = async () => {
  return new TextEncoder().encode(process.env.JWT_REFRESH_SECRET_KEY);
};

export const verifyAccessToken = async (token: string) => {
  const secret = await generateAccessSecret();
  const { payload } = await jwtVerify(token, secret);
  return payload;
};

export const verifyRefreshToken = async (token: string) => {
  const secret = await generateRefreshSecret();
  const { payload } = await jwtVerify(token, secret);
  return payload;
};

export const generateRefreshToken = async (userId: number) => {
  const secret = generateRefreshSecret();
  const token = await new SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(JWT_EXPIRATION.REFRESH)
    .sign(await secret);
  return token;
};

export const generateAccessToken = async (userId: number) => {
  const expires_at = new Date(Date.now() + JWT_EXPIRATION.ACCESS);
  const secret = generateAccessSecret();
  const token = await new SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(expires_at)
    .sign(await secret);
  return token;
};
