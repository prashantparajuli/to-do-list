const router = require('express').Router();
const { Todos } = require('../models/todos');
const { User } = require('../models/user');
const { verifyLogin } = require('../middlewares/verifyLogin');
const { getAuthorization, userPermission } = require('../middlewares/authorization');
const { check, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const paginatedResult = require('../middlewares/paginatedResult');



//get todos by logged in users
router.get("/mytodos",
    verifyLogin, paginatedResult(Todos), async(req, res) => {
        try {
            const user = req.user;
            Todos.find({ userID: user._id }, (error, todos) => {
                if (error) {
                    return res.status(400).send({ status: "error", message: "something went wrong while getting your todos!" });
                }
                return res.status(200).send({ status: "success", data: { tasks: todos } });
            });
        } catch (ex) {
            return res.status(400).send({ status: "error", message: "Can't get todos" });
        }
    });

//get all todos by admin 
router.get('/', verifyLogin, getAuthorization, paginatedResult(Todos), async(req, res) => {
    const user = req.user;
    console.log(user);
    // const todolist = await Todos.find();
    Todos.find().populate('userID', 'name').then((todos, error) => {
        if (error) {
            // console.log(error);
            return res.status(400).send({ status: 'error', error: error });
        }
        return res.json({ status: 'success', todos: res.paginatedResult });
    });
    // if (!todolist) return res.json({ status: 'error', message: 'Cannot get todos' });
    // res.send(todolist);
});

//create a new todo
router.post('/', [
    check('title').notEmpty().withMessage('Title cannot be empty').isString(),
    check('task').notEmpty().withMessage('task cannot be empty').isString().withMessage('task must be string'),
], verifyLogin, async(req, res) => {
    const user = req.user;
    console.log(user);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }
    let todos = new Todos({
        title: req.body.title,
        task: req.body.task,
        completed: req.body.completed,
        userID: user._id,
    })
    todos = await todos.save();
    if (!todos) return res.status(400).send('task couldnot be created');
    res.send(todos);

});

//get todo by id only admin and logged in user
router.get('/:id', verifyLogin, userPermission, async(req, res) => {
    const todolist = await Todos.findById(req.params.id)

    if (!todolist) return res.json({ status: 'error', message: 'cannot find todo' });

    res.send({ status: 'success', todolist });
});

//update a todo
router.put('/:id', [
    check('title').notEmpty().withMessage('Title cannot be empty').isString(),
    check('task').notEmpty().withMessage('task cannot be empty').isString().withMessage('task must be string'),
], verifyLogin, userPermission, async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }
    const todos = await Todos.findByIdAndUpdate(
        req.params.id, {
            title: req.body.title,
            task: req.body.task,
            completed: req.body.completed,
        }, { new: true }
    )
    if (!todos) return res.json({ status: 'error', error: 'cannot be updated' });

    res.send({ status: 'success', todos })
});

//delete a todo by id
router.delete('/:id', verifyLogin, userPermission, (req, res) => {
    Todos.findByIdAndRemove(req.params.id).then(product => {
        if (product) {
            return res.json({ status: 'success', message: 'deleted successfully' });
        } else {
            return res.json({ status: 'failed', message: 'todo not found' });
        }
    }).catch((err) => {
        res.json({ status: 'failed', error: err });
    })
});

module.exports = router;