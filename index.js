import express from "express";
import { route as notesRoute } from "./routes/notes.route.js";
import morgan from "morgan"

const app = express();
const port = 3000;

app.use(morgan("dev"))

app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.use("/api", notesRoute);

