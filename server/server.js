import express, { json } from 'express';
import { Database } from './db/Database.js';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const db = new Database();

// Middleware
app.use(cors());
app.use(json());

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Notes CRUD endpoints
app.post('/api/notes', async (req, res) => {
  const note = await prisma.notes.create({
    data: {
      title: req.body.title,
      content: req.body.content
    }
  }).catch((err) => {
    return res.status(500).json({ error: err.message });
  })
  res.json(note);
});

app.get('/api/notes', async (req, res) => {
  try {
    const notes = await db.getAllNotes();
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/notes/:id', async (req, res) => {
  try {
    const note = await db.getNoteById(req.params.id);
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    res.json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/notes/:id', async (req, res) => {
  try {
    const { title, content } = req.body;
    const result = await db.updateNote(req.params.id, title, content);
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Note not found' });
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/notes/:id', async (req, res) => {
  try {
    const result = await db.deleteNote(req.params.id);
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Note not found' });
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
