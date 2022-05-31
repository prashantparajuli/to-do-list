require('dotenv/config');

const bcrypt = require('bcrypt');
const { User } = require('../models/user');
const { check, validationResult } = require('express-validator');

const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');


router.post('/signup', [
    check('name').notEmpty().withMessage('Username cannot be empty'),
    check('email').isEmail().withMessage('please provide valid email'),
    check('password').isLength({ min: 4 }).withMessage('password must be at leasr 4 character long'),
], async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }
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

    const user = await User.findOne({ email: req.body.email }).lean();

    if (!user) return res.json({ status: 'error', error: 'invalid email/password' })

    if (user && bcrypt.compareSync(req.body.password, user.password)) {
        const accessToken = await jwt.sign({
                _id: user._id,
                name: user.name,
                isAdmin: user.isAdmin
            },
            process.env.ACCESS_TOKEN, { expiresIn: '10d' }
        )
        res.json({ status: 'Success', message: 'logged in successfully', accesstoken: accessToken })
    } else {
        res.json({ status: 'error', error: 'invalid email/pass' });
    }
})

module.exports = router;