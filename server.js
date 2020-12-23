
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');


const app = express();

app.use(express.json());

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}


// import dotenv config file 
dotenv.config({ path: './config/config.env'});

// import mongoDB connection file and connect to DB
const connectDB = require('./config/db');
connectDB();

const transactions = require('./routes/transactions');

// routes
app.use('/api/transactions', transactions);

app.get('/',(req,res) => {
    res.send('API is running...')
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));