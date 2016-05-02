var Todo = require('./models/todo');

module.exports = function(app, passport) {

// ROUTES FOR TODOO FUNCTIONALITY
app.get('/api/todos', function(req, res) {
  Todo.find(function(err, todos) {
    if (err) {
      res.send(err);
    }

    res.json(todos);
  });
});

app.post('/api/todos', function(req, res) {
  Todo.create({
    text : req.body.text,
    done : false
  }, function(err, todo) {
    if(err) {
      res.send(err);
    }

    Todo.find(function(err, todos) {
      if(err) {
        res.send(err);
      }

      res.json(todos);
    });
  });
});

app.delete('/api/todos/:todo_id', function(req, res) {
  Todo.remove({
    _id : req.params.todo_id
  }, function(err, todo) {
    if(err) {
      res.send(err);
    }

    Todo.find(function(err, todos) {
      if(err) {
        res.send(err);
      }

      res.json(todos); }); }); });

// front - tego trezba uzyc jezeli nizej (index.ejs) nie zadziala xDD
//app.get('./public/index.html', function(req, res) {
//  res.sendfile('./public/index.html');
//});


// ROUTES FOR AUTHENTIFICATION
app.get('/', function(req, res) {
  res.render('index.ejs');
});

app.get('/login', function(req, res) {
  res.render('login.ejs', { message : req.flash('loginMessage')});
});

app.post('/login', passport.authenticate('local-login', {
  successRedirect : '/todo',
  failureRedirect : '/login',
  failureFlash : true
}));

app.get('/signup', function(req, res) {
  res.render('signup.ejs', { message : req.flash('signupMessage')});
});

app.post('/signup', passport.authenticate('local-signup', {
  successRedirect : './public/index.html',
  failureRedirect : '/signup',
  failureFlash : true
}));

app.get('/todo', isLoggedIn, function(req, res) {
  res.render('todo.ejs', {
    user : req.user
  });
});

app.get('/logout', function(req, res) {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});
};

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/');
};
