const router = require('express').Router();
const { Todos } = require('../models/todos');
const { verifyAccessToken } = require('../helpers/auth');

router.post('/', verifyAccessToken, async(req, res) => {
    let todos = new Todos({
        title: req.body.title,
        task: req.body.task,
        completed: req.body.completed,
    })
    todos = await todos.save();
    if (!todos) return res.status(400).send('task couldnot be created');
    res.send(todos);

})
router.get('/', verifyAccessToken, async(req, res) => {
    const todolist = await Todos.find();
    if (!todolist) return res.json({ status: 'error', message: 'Cannot get todos' });
    res.send(todolist);
})
router.get('/:id', async(req, res) => {
    const todolist = await Todos.findById(req.params.id)

    if (!todolist) return res.json({ status: 'error', message: 'cannot find todo' });

    res.send(todolist);
})
router.put('/:id', async(req, res) => {
    const todolist = await Todos.findById(req.params.id)

    if (!todolist) return res.json({ status: 'error', message: 'cannot find todo' });

    res.send(todolist);
})

module.exports = router;