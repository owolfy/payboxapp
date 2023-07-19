const todosModel = require('../models/todos.model');

async function getTodos(res) {
  try {
    const todos = await todosModel.find().select('-__v').exec();
    res.send(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function addTodo(task, deadline, email, res) {
  const todo = new todosModel({
    task,
    deadline: new Date(deadline),
    email,
    isCompleted: false,
    date: new Date(),
  });

  try {
    await todo.save();
    res.status(201).send({ id: todo._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function updateTodoById(id, task, deadline, email, isCompleted, res) {
  try {
    const todo = await todosModel.findByIdAndUpdate(id, {
      task,
      deadline,
      isCompleted,
      email,
      date: new Date(),
    });
    res.status(200).send({ id: todo._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteTodoById(id, res) {
  try {
    await todosModel.findByIdAndDelete(id);
    res.status(200).send({ id: todo._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { getTodos, addTodo, updateTodoById, deleteTodoById };
