const express = require('express');

const server = express();

const projects = [];

var requests = 0;

server.use(express.json());

server.use(function numberOfRequests(req, res, next) {
  requests++;

  console.log(`Current number of requests: ${requests}`);

  return next();
});

function checkIdExists(req, res, next) {
  const { id } = req.params;
  const project = projects.find(p => p.id == id);
  if (!project) {
    return res.status(400).json({ message: 'Project not found.' });
  }

  return next();
}

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
  return res.status(200).json(projects);
});

server.put('/projects/:id', checkIdExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.title = title;

  return res.json(project);
});

server.delete('/projects/:id', checkIdExists, (req, res) => {
  const { id } = req.params;
  const projectIndex = projects.findIndex(p => p.id == id);

  projects.splice(projectIndex, 1);

  return res.send();
});

server.post('/projects/:id/tasks', checkIdExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.tasks.push(title);

  return res.status(200).json({ message: 'Task registered.' });
});

server.listen(3000, () => console.log('Server is running on port 3000.'));
