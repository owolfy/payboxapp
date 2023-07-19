const express = require('express');
const router = express.Router();
const {
  getTodos,
  addTodo,
  updateTodoById,
  deleteTodoById,
} = require('../services');

router.get('/', (req, res) => getTodos(res));

router.post('/', async (req, res) => {
  const { task, deadline, email } = req.body;

  if (!task || !deadline || !email) {
    res.status(400).json({ message: 'task and deadline are required' });
    return;
  }

  addTodo(task, deadline, email, res);
});

router.put('/', async (req, res) => {
  const { id, task, deadline, email, isCompleted } = req.body;

  if (!id || !task || !deadline || !email || !isCompleted) {
    res
      .status(400)
      .json({ message: 'id, task, deadline, isCompleted are required' });
    return;
  }

  updateTodoById(id, task, deadline, email, isCompleted, res);
});

router.delete('/', async (req, res) => {
  const { id } = req.body;

  if (!id) {
    res.status(400).json({ message: 'id is required' });
    return;
  }

  deleteTodoById(id, res);
});

module.exports = router;
