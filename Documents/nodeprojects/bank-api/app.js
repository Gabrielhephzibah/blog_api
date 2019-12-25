const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require ('mongoose');


const bankRoutes = require('./api/routes/bank');
mongoose.connect('mongodb+srv://Cherish:' +
 process.env.MONGO_ATLAS_PW +
  'Cherish2470@cherish-ittmt.mongodb.net/test?retryWrites=true&w=majority',
  {
  useMongoClient: true  
}
);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use((req, res, next) =>{
    res.header ('Acess-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    
        if (req.method === 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }
        next();

});


//routes handling request

app.use('/bank', bankRoutes);

app.use((req, res, next) => {
    const error = new Error('not found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) =>{
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }

    });
});

module.exports = app;