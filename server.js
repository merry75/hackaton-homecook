//todo
//everything you need to get a server up and running
//middleware, routes, database connection etc
//package and module requirements
var express = require('express')
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('./models/passport');
var postsRoutes = require('./routes/postsRoutes');
var authRoutes = require('./routes/authRoutes');

//let's get going...
var app = express();
mongoose.connect(process.env.CONNECTION_STRING||'mongodb://localhost/posts');

app.use(passport.initialize());

app.use(express.static('public'));
app.use(express.static('node_modules'));

//some middleware that we need
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/posts', postsRoutes);
app.use('/auth', authRoutes);

app.all('*', function(req, res) {
  res.sendFile(__dirname + "/public/index.html")
});

//start the server
app.listen(process.env.PORT || '8000');