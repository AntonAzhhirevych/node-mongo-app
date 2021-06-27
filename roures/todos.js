const { Router } = require('express');
const Todo = require('../models/todo');

const router = Router();

router.get('/', (req, res) => {
  res.render('index', {
    title: 'index',
    isIndex: true,
  });
});

router.get('/create', (req, res) => {
  res.render('create', {
    title: 'create',
    isCreate: true,
  });
});

router.get('/todos', async (req, res) => {
  const todos = await Todo.find({}).lean();

  console.log(todos);
  res.render('todos', {
    title: 'todos',
    isTodos: true,
    todos,
  });
});

router.post('/create', async (req, res) => {
  const todo = new Todo({
    title: req.body.title,
  });

  await todo.save();

  res.redirect('/todos');
});

router.post('/complete', async (req, res) => {
  const todo = await Todo.findById(req.body.id);

  todo.completed = req.body.completed;

  await todo.save();

  res.redirect('/');
});

module.exports = router;
