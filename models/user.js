var mongoose = require('mongoose');

// Connect to the mlab database //
module.exports.db = mongoose.connect('mongodb://root:1234@ds151702.mlab.com:51702/todo-list-app');

// Create a schema (like a blueprint) //
var userAcountSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    index: {unique: true}
  },
  password: {
    type: String,
    required: true
  }
});

module.exports.User = mongoose.model('User', userAcountSchema);

module.exports.secret = 'mysecret';

module.exports.getUserByUsername = function(username, callback){
  var query = {username: username};
  User.findOne(query, callback);
}
