const router = require('express').Router();
const { Todos } = require('../models/todos');
const { verifyLogin } = require('../middlewares/verifyLogin');
const { check, validationResult } = require('express-validator');

router.post('/', [
    check('title').notEmpty().withMessage('Title cannot be empty').isString()
], verifyLogin, async(req, res) => {
    let todos = new Todos({
        title: req.body.title,
        task: req.body.task,
        completed: req.body.completed,
        user: req.user._id,
    })
    todos = await todos.save();
    if (!todos) return res.status(400).send('task couldnot be created');
    res.send(todos);

});
router.get('/', async(req, res) => {
    const todolist = await Todos.find();
    if (!todolist) return res.json({ status: 'error', message: 'Cannot get todos' });
    res.send(todolist);
});
router.get('/mytodos', /*verifyLogin,*/ async(req, res) => {
    try {
        const user = req.user;
        await Todos.find({ userId: user._id }, (todos, err) => {
            if (err) {
                return res.status(400).json({ status: 'error', message: 'cannot get todos' });
            }
            return res.status(200).send({ status: 'success', data: { todos: todos } })
        });
    } catch (err) {
        return res.status(400).json({ status: 'error', message: 'cannot get todos' });
    }
});
router.get('/:id', async(req, res) => {
    const todolist = await Todos.findById(req.params.id)

    if (!todolist) return res.json({ status: 'error', message: 'cannot find todo' });

    res.send(todolist);
});
router.put('/:id', async(req, res) => {
    const todos = await Todos.findByIdAndUpdate(
        req.params.id, {
            title: req.body.title,
            task: req.body.task,
            completed: req.body.completed,
        }, { new: true }
    )
    if (!todos) return res.json({ status: 'error', error: 'cannot be updated' });

    res.send(todos)
});
router.delete('/:id', (req, res) => {
    Todos.findByIdAndRemove(req.params.id).then(product => {
        if (product) {
            return res.json({ status: 'success', message: 'deleted successfully' });
        } else {
            return res.json({ status: 'failed', message: 'product not found' });
        }
    }).catch((err) => {
        res.json({ status: 'failed', error: err });
    })
})

module.exports = router;