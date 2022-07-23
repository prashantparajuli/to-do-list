const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
require('dotenv/config');

const errorHandler = require('./helpers/error-handler');

// import routes
const userRoutes = require('./routes/user');
const todosRoutes = require('./routes/todos');

app.set('view-engine', 'ejs');
app.set('views', 'views');

app.use("/public", express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use(errorHandler);

// routes
// const api = process.env.API;
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