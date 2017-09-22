var express = require('express');
var passport = require('passport');
var bodyParser = require('body-parser');
var session = require('express-session');

var todoController = require('./controllers/todoController');
var register_and_login = require('./controllers/register_and_login');

var app = express();

app.set('port', (process.env.PORT || 5000));

var urlencodedParser = bodyParser.urlencoded({extended: false});

// setup middleware for static file
app.use(express.static(__dirname + '/public'));

// setup express-session
app.use(session({
  name: 'mySession',
  secret: 'MySecret',
  saveUninitialized: true,
  resave: false,
  // cookie: {secure: true; maxAge: 60 * 1000}
}));

// setup passport
app.use(passport.initialize());
app.use(passport.session());

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(req, res){

  res.render('home', {login: req.isAuthenticated(), data: req.url});

});

todoController(app);
register_and_login(app);

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
