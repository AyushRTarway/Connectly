const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cookieParser = require('cookie-parser');
const db = require('./config/mongoose');


app.use(express.urlencoded());
app.use(cookieParser());


const port = 5000;


// use express router
app.use('/',require('./routes/index'));
app.use(express.static('assets'));
// seet up the view engine
app.set('view engine','ejs');
app.set('views','./views');

app.listen(port,function(err){
    if(err)
    {
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
}) 
