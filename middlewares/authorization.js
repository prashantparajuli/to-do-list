const mongoose = require("mongoose");
const { Todos } = require("../models/todos");
const { User } = require("../models/user");

function getAuthorization(req, res, next) {
    const user = req.user;
    console.log(user);
    try {
        if (!user.isAdmin) {
            return res.status(400).send({ status: 'error', error: 'unauthorize access' });
        }
        next();
    } catch (err) {
        console.log(err);
        return res.status(404).send("Something went wrong");
    }
}

module.exports.getAuthorization = getAuthorization;