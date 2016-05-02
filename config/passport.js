var LocalStrategy = require('passport-local').Strategy;
var User = require('../app/models/user');

module.exports = function(passport) {

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use('local-signup', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback: true
  },
  function(req, email, password, done) {
    process.nextTick(function() {
      console.log('Attempting to create new user: "' + email + '".');

      User.findOne({'local.email' : email}, function(err, user) {
        if(err) {
          console.log('Error while getting user "'+ email + '" from database: '  + err);
          return done(err);
        }

        if(user) {
          console.log('Failed to register user "' + email +'": email already taken.');
          return done(null, false, req.flash('signupMessage', 'That email is already taken!'));
        } else {

          var newUser = new User();
          newUser.local.email = email;
          newUser.local.password = newUser.generateHash(password);

          newUser.save(function(err) {
            if(err) {
              throw err;
            }
            console.log('Successfully created new user: "' + email + '".');
            return done(null, newUser);
          });
        }
      });
    });
  }));

  passport.use('local-login', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
  },
  function(req, email, password, done) {
    console.log('Attempting to log user: "' + email + '".');

    User.findOne({ 'local.email' : email }, function(err, user) {
      if(err) {
        console.log('Error while getting user "'+ email + '" from database: '  + err);
        return done(err);
      }

      if(!user) {
        console.log('Failed to log user "' + email + '": no such user in database');
        return done(null, false, req.flash('loginMessage', 'No such user in database!'));
      }

      if(!user.validPassword(password)) {
        console.log('Failed to log user "' + email + '": wrong password');
        return done(null, false, req.flash('loginMessage', 'Wrong password.'));
      }

      console.log('Successfully logged in user: "' + email + '".');
      return done(null, user);
    });
  }));
};
