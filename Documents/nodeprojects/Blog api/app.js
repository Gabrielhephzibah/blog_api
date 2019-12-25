const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');


const app = express();

// const userRoutes = require('./routes/apis/user');
// app.use('/api/user', userRoutes);

const db = require('./config/db').database

// database connection

mongoose.connect(db, { 
    useNewUrlParser: true
})
.then(() => {
    console.log('Database Connected Successfully')
})
.catch((err) => {
    console.log('Unable to connect with the database', err)
});

// Defining the port

const port = process.env.PORT || 3000;

//initialize cors middleware
app.use(cors());

// initialize BodyParser middleware
app.use(bodyParser.json());

// Initialize Public Directory
/*
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});
*/
app.get('/', (req,res) => {
    res.send('<h1>Hello world</h1>')
});

const postRoutes = require('./routes/apis/post');
const userRoutes = require('./routes/apis/user');

app.use('/api/posts', postRoutes);
app.use('/user', userRoutes);

app.listen(port, () => {
    console.log('server Started on Port', port)
})