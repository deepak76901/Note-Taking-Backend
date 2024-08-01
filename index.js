import express from "express";
import { route as notesRoute } from "./routes/notes.route.js";
import morgan from "morgan"

const app = express();
const port = 3000;

// For HTTP Logs
app.use(morgan("dev"))

// To Parsed Data from Body Json. Alternative, of BodyParser
app.use(express.json());

// Server is Listening
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.use("/api", notesRoute);

