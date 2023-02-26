const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const port = 8000;
// used for cookie-session
const session = require('express-session')
const passport = require('passport');
const passportlocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');
const sassMiddleware =require('node-sass-middleware');
const flash = require('connect-flash');
const customware = require('./config/middleware');

app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));
app.use(express.urlencoded());
app.use(cookieParser());


// use express router
app.use(express.static('./assets'));

//make the uploads path available to the user
app.use('/uploads',express.static(__dirname+'/uploads'))

app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// seet up the view engine
app.set('view engine','ejs');
app.set('views','./views');

//mongo store is used to store the session cookiees in the db 
app.use(session({
    name:'codeial',
    //todo change the secret before deployment in production mode
    secret:'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*10)
    },
    store:new MongoStore(
        { mongoUrl: 'mongodb://0.0.0.0/test-app' },
        {
        mongooseConnection:db,
        autoRemove:'disabled'
        },
        function(err)
        {
            console.log(err || 'connect-mongodb setup ok');
        }

    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customware.setflash); 


app.use('/',require('./routes/index'));

app.listen(port,function(err){
    if(err)
    {
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
}) 
