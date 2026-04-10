import express, { type Request, type Response } from "express";
import dotenv from "dotenv";
import categoryRoutes from "./routes/categoryRoutes.js";
import postRoutes from "./routes/postRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/posts", postRoutes);

app.get("/healthcheck", (req: Request, res: Response) => {
  return res.status(200).json({ message: "OK" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
