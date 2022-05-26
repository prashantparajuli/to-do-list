require('dotenv/config');

const bcrypt = require('bcrypt');
const { User } = require('../models/user');
const { authJwt } = require('../helpers/auth');
const { signAccessToken } = require('../helpers/auth');
const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');


router.post('/signup', async(req, res) => {
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        isAdmin: req.body.isAdmin,
    })
    user = await user.save();
    if (!user) return res.status(400).send('canot create user');
    res.send(user);

})
router.post('/login', async(req, res) => {
    //authentication here

    const user = await User.findOne({ email: req.body.email }).lean();

    if (!user) return res.json({ status: 'error', error: 'invalid email/password' })

    if (user && bcrypt.compareSync(req.body.password, user.password)) {
        const accessToken = await signAccessToken(user._id, user.isAdmin);
        res.json({ status: 'Success', message: 'logged in successfully', accesstoken: accessToken })
    } else {
        res.json({ status: 'error', error: 'invalid email/pass' });
    }
})

module.exports = router;