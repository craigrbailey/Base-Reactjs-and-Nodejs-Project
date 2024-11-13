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
    const notes = await prisma.notes.findMany().catch((err) => {
      return res.status(500).json({ error: err.message });
    })
    res.json(notes);
});

app.get('/api/notes/:id', async (req, res) => {
    const note = await prisma.notes.findUniqueOrThrow({
      where: {
        id:  req.params.id
      }
    })

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    res.json(note);
});

app.put('/api/notes/:id', async (req, res) => {
    const { title, content } = req.body;
    const result = await prisma.notes.update({
      where: {
        id:  req.params.id
      },
      data: {
        title,
        content
      }
    }).catch((err) => {
      return res.status(500).json({ error: err.message });
    })

    if (!result) {
      return res.status(404).json({ error: 'Note not found' });
    }
    res.json(result);
});

app.delete('/api/notes/:id', async (req, res) => {
    const result = await prisma.notes.delete({
      where: {
        id: req.params.id
      }
    }).catch((err) => {
      return res.status(500).json({ error: err.message });
    })

    res.json(result);
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
