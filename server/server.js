import express, { json } from 'express';
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(json());

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
