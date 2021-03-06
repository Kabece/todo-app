var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({

    username: String,
    email  : String,
    password : String,
    tasks: [{
      title: String,
      description: String,
      date: {type: Array, default:[]}, /* na wypadek, jesli ma to byc grupa dni */
      currentPeriod: {type: Number, default: 0},  /* aktualna ilosc wykonanego taska */
      periodQuantity: {type: Number, default: 1}, /* ilosc razy, ile ma byc wykonany task */
      done: Boolean
    }]

});

userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
