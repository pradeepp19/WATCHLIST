import express from "express";
import routes from "./routes.js";
import { connectDB } from "./db.js";
import { PORT } from "./config.js";

console.log("MONGO_URL:", process.env.MONGO_URL);
connectDB();

const app = express();
app.use(express.json());

app.use("/api/v1",routes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});