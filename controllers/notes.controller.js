// In-memory data structure to store notes
let notes = [
  {
    id: 1,
    title: "first",
    content: "lorem ipsum hello rohan",
    tags: ["important"],
  },
  {
    id: 2,
    title: "second",
    content: "Invincible ipsum hello rohan",
    tags: ["medium"],
  },
  {
    id: 3,
    title: "third",
    content: "lorem ipsum discussion",
    tags: ["medium"],
  },
];
let currentId = 4;
let tagList = ["important", "medium"];

export const createNote = (req, res) => {
  const { title, content, tags } = req.body;

  try {
    if (!title || !content || !tags) {
      return res.status(301).json({ message: "All Fields required." });
    }
    if (tags !== "important" || tags !== "medium") {
      return res.json({
        message: "Invalid tag value. Tag can only have Important or Medium",
      });
    }

    const note = { id: currentId++, title, content, tags: [tags] || [] };
    notes.push(note);

    return res.status(201).json(note);
  } catch (error) {
    return res.send({ message: error.message });
  }
};

export const getNotes = (req, res) => {
  if (notes.length === 0) {
    return res.status(404).json({ message: "You have no Notes" });
  } else {
    return res.json(notes);
  }
};

export const getNoteById = (req, res) => {
  const note = notes.find((n) => n.id === parseInt(req.params.id));
  if (!note) {
    return res.status(404).json({ message: "Note not found" });
  }
  res.json(note);
};

export const updateNote = (req, res) => {
  const { title, content, tags } = req.body;
  const note = notes.find((n) => n.id === parseInt(req.params.id));
  if (!note) {
    return res.status(404).json({ message: "Note not found" });
  }
  note.title = title || note.title;
  note.content = content || note.content;
  note.tags = tags || note.tags;
  res.status(200).json(note);
};

export const deleteNote = (req, res) => {
  notes = notes.filter((n) => n.id !== parseInt(req.params.id));
  res.status(200).json({ message: "Note deleted Successfully" });
};

export const addTags = (req, res) => {
  const { tags } = req.body;
  const note = notes.find((n) => n.id === parseInt(req.params.id));
  try {
    if (!tags) {
      return res.json({ message: "Please enter Tags" });
    }
    if (tags !== "pending" || tags !== "completed") {
      return res.json({
        message: "Invalid tag value. Tag can only have Pending or Completed",
      });
    }
    if (!note) {
      return res.status(404).json({ message: "Note not found." });
    }

    if (note.tags.find((tag) => tag === tags)) {
      return res.status(300).json({ message: "Tag already exist." });
    } else {
      note.tags.push(tags);
      return res.json(note);
    }
  } catch (error) {
    return res.status(501).json({ message: error.message });
  }
};

export const deleteTags = (req, res) => {
  const { tags } = req.body;
  const note = notes.find((n) => n.id === parseInt(req.params.id));

  try {
    if (!note) {
      return res.status(404).json({ message: "Note not Found" });
    }

    const tag = note.tags.find((tag) => tag === tags);
    if (!tag) {
      return res.json({ message: "Tag not found" });
    } else {
      note.tags = note.tags.filter((tag) => tag !== tags);
      return res.json({ message: "Tag deleted Successfully" });
    }
  } catch (error) {
    return res.json({ message: error.message });
  }
};

export const queryNotes = (req, res) => {
  const { tag1, tag2 } = req.body;

  let result = [];

  try {
    // Define the regular expression to match 'AND', 'OR', 'NOT'
    if (tag1 && tag2 && tag1 !== tag2) {
      return res.json(notes);
    }
    if (tag1 || tag2) {
      if (tag1) {
        notes.map((note) =>
          note.tags.filter((tag) => {
            if (tag1 === tag) {
              result.push(note);
            }
          })
        );
        return res.json(result);
      } else {
        notes.map((note) =>
          note.tags.filter((tag) => {
            if (tag2 === tag) {
              result.push(note);
            }
          })
        );
        return res.json(result);
      }
    }
    if (!tag1 && !tag2) {
      return res.json({ message: "Nothing as per your Query." });
    }
  } catch (error) {
    return res.json({ message: error.message });
  }
};
