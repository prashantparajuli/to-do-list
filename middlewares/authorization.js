const mongoose = require('mongoose');
const { Todos } = require('../models/todos');
const { User } = require('../models/user');
const { Role } = require('../role');

function getAuthorization(req, res, next) {
    const user = req.user;
    console.log(user);
    try {
        if (user.role === Role.admin) {
            next()
        } else {
            return res.status(401).send({ status: 'fail', message: 'unauthorized access' })
        }
    } catch (ex) {
        return res.status(404).send('Something went wrong');
    }

}

async function userPermission(req, res, next) {
    const user = req.user;
    console.log(user);
    const todoId = req.params.id;
    console.log(todoId);
    try {
        await Todos.findById(todoId)
            .populate('userID')
            .exec((error, todos) => {
                if (!todos) {
                    return res.status(400).send({ status: 'fail', data: { message: 'cannot get todos' } })
                }
                if (error) {
                    return res.status(400).send({ status: 'error', message: error.message });
                } else {
                    if (todos.userID._id == user._id || user.role === Role.admin) {
                        next();
                    } else {

                        return (res.status(400).send({ status: 'fail', data: { user: 'User not authorized' } }))
                    }
                }
            });
    } catch (ex) {
        return res.status(400).send({ status: 'error', message: 'Something went wrong' });
    }

}

module.exports.getAuthorization = getAuthorization;
module.exports.userPermission = userPermission;