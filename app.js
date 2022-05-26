const express = require('express');
const app = express();
const mongoose = require('mongoose');

require('dotenv/config');

const authJwt = require('./helpers/auth');
const errorHandler = require('./helpers/error-handler');

const userRoutes = require('./routes/user');
const todosRoutes = require('./routes/todos');

//middleware
app.use(express.json());
app.use(errorHandler);

//routes
const api = process.env.API;
app.use('/users', userRoutes);
app.use('/todos', todosRoutes)


mongoose.connect(process.env.DB_CONNECTION)
    .then(() => {
        console.log('Database connected');
    })
    .catch((err) => {
        console.log(err);
    })

app.listen(3000, () => {
    console.log('Server running on localhost:3000');
})