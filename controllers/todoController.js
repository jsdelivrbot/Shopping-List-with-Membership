var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');

// Connect to the mlab database //
mongoose.connect('mongodb://root:1234@ds151702.mlab.com:51702/todo-list-app');

// Create a schema (like a blueprint) //
var todoSchema = new mongoose.Schema({
  item: String,
  username: String
});

var Todo = mongoose.model('Todo', todoSchema);

// setup bodyParser as a middleware //
var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){

  app.get('/todo', authenticationMiddleware(), function(req, res){
    // console.log(req.user);
    // console.log(req.isAuthenticated());

    // get data from mongodb and pass it to view //
    Todo.find({'username': req.user}, function(err, data){
      if (err) throw err;
      res.render('todo', {login: true, username: req.user, todos: data});
    });

  });

  app.post('/todo', urlencodedParser, function(req, res){
    // get data from the view and add it to mongodb //
    console.log(req.body);
    if(req.body.item!=''){
      var newTodo = new Todo({
        item: req.body.item,
        username: req.body.username
      });

      newTodo.save(function(err, data){
        if (err) throw err;
        res.json(data);
      });
    }else{
      console.log('input is empty!');
    }

  });

  app.delete('/todo/:item', function(req, res){

    // delete the requested item from mongodb //
    Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
      if (err) throw err;
      res.json(data);
    });

  });

  function authenticationMiddleware() {
  	return (req, res, next) => {
  		console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);

  	    if (req.isAuthenticated()) return next();

  	    res.redirect('/login');
    	}
  }

}
