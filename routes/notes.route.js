import { Router } from "express";
import {
  addTags,
  createNote,
  deleteNote,
  deleteTags,
  getNoteById,
  getNotes,
  queryNotes,
  updateNote,
} from "../controllers/notes.controller.js";

export const route = Router();

// Query Tags Implementation
route.get("/notes/query", queryNotes);

// Create a new note
route.post("/notes", createNote);

// Read all notes
route.get("/notes", getNotes);

// Read a single note by ID
route.get("/notes/:id", getNoteById);

// Update a note by ID
route.put("/notes/:id", updateNote);

// Delete a note by ID
route.delete("/notes/:id", deleteNote);

// Add Tag
route.put("/notes/:id/tags", addTags);

// Delete Tag from Note
route.delete("/notes/:id/tags", deleteTags);

