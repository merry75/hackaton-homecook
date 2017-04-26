//todo
//everything you need to get a server up and running
//middleware, routes, database connection etc

//use express dependancy for node work
var express = require('express')
var app = express();
//passport and session for authentication
var LocalStrategy = require('passport-local').Strategy;
var passport = require('./models/passport');
var expressSession = require('express-session');

//setup directories for server access
app.use(express.static('public'));
app.use(express.static('node_modules'));

//use mongoose dependancy
var mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTION_STRING||'mongodb://localhost/homecook');
var User = require("./models/userModel");


//link routes
var postsRoutes = require('./routes/postsRoutes');
var authRoutes = require('./routes/authRoutes');

//use body parser middleware
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//configure passport/session
app.use(expressSession({
    secret: 'yourSecretHere',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

//plm user model has local strategy, serial and deserialize
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser()); 


app.use('/posts', postsRoutes);
app.use('/auth', authRoutes);

app.all('*', function(req, res) {
  res.sendFile(__dirname + "/public/index.html")
});

// error handler to catch 404 and forward to main error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});



//start the server
app.listen(process.env.PORT || '8000');

