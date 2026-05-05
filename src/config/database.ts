import "dotenv/config";
import pg from "pg"; // pg paketini import ettiğinden emin ol
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/client/index.js";

const connectionString = `${process.env.DATABASE_URL}`;

const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);
export const prisma = new PrismaClient({ adapter });
