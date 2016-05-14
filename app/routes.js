var User = require('./models/user');

module.exports = function(app, passport) {

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
  successRedirect : '/login',
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

// new user routes


app.get('/api/users', function(req, res) {
  User.find(function(err, todos) {
    if (err) {
      res.send(err);
    }

    res.json(todos);
  });
});

app.get('/api/users/:userMail', function(req,res) {
  User.find({'email':req.params.userMail}, function(err,user) {
    if (err) {
      res.send(err);
    }

    res.json(user);
  });
  });

  app.get('/api/users/tasks/', function(req,res) {
    User.find({'email':req.user.email},{'tasks':1, '_id':0}, function(err,tasks){
      if (err) {
        res.send(err);
      }

      res.json(tasks);
    });
  });

  app.get('/api/users/tasks/active/', function(req,res) {
    console.log('Attempting to get active task(s) for user: "' + req.user.email + '".');

    User.aggregate({$match:{'email':req.user.email}},{$unwind:"$tasks"},{$match:{'tasks.done':false}},{$project:{'tasks':1,'_id':0}}, function(err,tasks){
      if (err) {
        console.log('Something went wrong during getting active task(s) for user "' + req.user.email + '": ' + err);
        res.send(err);
      }

      console.log('Succesfully got ' + tasks.length + ' active task(s) for user: "' + req.user.email + '".');
      var result = [];

      for(var a = 0; a< tasks.length; a++) {
          result.push(tasks[a].tasks);
      }
      res.json(result);
    });
  });

  app.get('/api/users/tasks/inactive/', function(req,res) {
    console.log('Attempting to get inactive task(s) for user: "' + req.user.email + '".');
    User.aggregate({$match:{'email':req.user.email}},{$unwind:"$tasks"},{$match:{'tasks.done':true}},{$project:{'tasks':1,'_id':0}}, function(err,tasks){
      if (err) {
        console.log('Something went wrong during getting inactive task(s) for user "' + req.user.email + '": ' + err);
        res.send(err);
      }
      console.log('Succesfully got ' + tasks.length + ' inactive task(s) for user: "' + req.user.email + '".');
      var result = [];

      for(var a = 0; a< tasks.length; a++) {
          result.push(tasks[a].tasks);
      }
      res.json(result);
    })
  });

  app.post('/api/users/tasks/', function(req,res) {
    console.log('Attemting to create new task for user "' + req.user.email +'": ');
    console.log('Title: ' + req.body.title);
    console.log('Description: ' + req.body.description);
    console.log('Date: ' + req.body.date);
    User.findOneAndUpdate(
        {_id: req.user.id},
        {$push: {'tasks':{'title':req.body.title, 'description':req.body.description,
                          'date':req.body.date, 'period_quantity':req.body.periodQuantity,
                          'current_period':0,'done':false}}},
           {safe: true, upsert: true, new: true},
           function(err, model) {
             if (err) {
               console.log('Mongoose error description: '+ err);
             }
             console.log('Look! ');
             var result = [];
             for(var a = 0; a< model.tasks.length; a++) {
                 if(model.tasks[a].done != true) {
                   console.log(model.tasks[a])
                   result.push(model.tasks[a]);
                 }
             }
            res.json(result);
           }
    );
  }, function(err, todo) {
    if(err) {
      console.log('Error descr: '+ err);
      res.send(err);
    }}

  );
};

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/');
};
