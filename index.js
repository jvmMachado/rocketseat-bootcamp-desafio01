const express = require('express');

const server = express();

const projects = [];

server.use(express.json());

server.post('/projects/', (req, res) => {
  const { id, title } = req.body;

  projects.push({
    id,
    title,
    tasks: []
  });

  return res.status(200).json({ message: 'Project registered.' });
});

server.get('/projects', (req, res) => {
  res.status(200).json(projects);
});

server.listen(3000, () => console.log('Server is running on port 3000.'));
