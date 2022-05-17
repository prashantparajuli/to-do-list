const express = require('express');
const app = express();
const mongoose = require('mongoose');

require('dotenv/config');


//middleware
app.use(express.json());

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