const mongoose = require('mongoose');


mongoose.set('debug', true);
mongoose.set('userCreateIndex', true);

mongoose.Promise = Promise;
mongoose.connect('mongodb+srv://tomer:1234@cluster0-st3oe.mongodb.net/test?retryWrites=true', {
  keepAlive: true,
  useNewUrlParser: true
});

module.exports.User = require('./user');
module.exports.Tennant = require('./tennants');

