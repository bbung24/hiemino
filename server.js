var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var app = express();

var postSchema = new mongoose.Schema({
  title: {type: String, required: true},
  category: [String],
  content: {type: String, required: true},
  poster: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true
  }
});

var userSchema = new mongoose.Schema({
  username: {type: String, unique: true, required: true},
  nickname: String,
  password: {type: String, required: true}
});

userSchema.pre('save', function(next) {
  var user = this;
  if (!user.isModified('password')) return next();
  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

var User = mongoose.model('User', userSchema);
var Post = mongoose.model('Post', postSchema);

if (app.get('env') === 'development') {
  console.log('development');
  mongoose.connect('mongodb://127.0.0.1/mydb');
} else {
  console.log('production');
  mongoose.connect('mongodb://hiemino:hiemino@ds031902.mongolab.com:31902/heroku_app37202122');
}
mongoose.connection.on('error', function() {
  console.error('MongoDB Connection Error. Make sure MongoDB is running.')
});

app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({ secret: 'sleocvreehtileymin' }));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public', 'views')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));
app.use(function(req, res, next) {
  if (req.user) {
    res.cookie('user', JSON.stringify(req.user));
  }
  next();
});

passport.use(new LocalStrategy({ usernameField: 'username' }, function(username, password, done) {
  User.findOne({ username: username }, function(err, user) {
    if (err) return done(err);
    if (!user) return done(null, false);
    user.comparePassword(password, function(err, isMatch) {
      if (err) return done(err);
      if (isMatch) return done(null, user);
      return done(null, false);
    });
  });
}));

passport.serializeUser(function(user, done) {
  return done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    return done(err, user);
  });
});

app.post('/api/login', passport.authenticate('local'), function(req, res) {
  res.cookie('user', JSON.stringify(req.user));
  res.send(req.user);
});


app.get('/api/createaccount', function(req, res, next) {
  var inhoyong = new User({
    username: 'inhoyong',
    password: 'lovehiemin'
  });
  inhoyong.save(function(err) {
    if (err) return next(err);
    var hieminhan = new User({
      username: 'hieminhan',
      password: 'loveinho'
    });
    hieminhan.save(function(err) {
      if (err) return next(err);
      res.sendStatus(200);
    })
  });
});

app.get('/api/logout', function(req, res, next) {
  req.logout();
  res.sendStatus(200);
});

app.get('/api/posts', function(req, res, next) {
  var query = Post.find();
  if (req.query.category) {
    query.where({ category: req.query.category });
  } else if (req.query.alphabet) {
    query.where({ name: new RegExp('^' + '[' + req.query.alphabet + ']', 'i') });
  } else {
    query.limit(12);
  }
  query.exec(function(err, shows) {
    if (err) return next(err);
    res.send(shows);
  });
});

app.get('/api/posts/:id', function(req, res, next) {
  Post.findById(req.params.id, function(err, post) {
    if (err) return next(err);
    res.send(post);
  });
});

app.get('*', function(req, res) {
  res.redirect('/#' + req.originalUrl);
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.sendStatus(500, { message: err.message });
});

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) next();
  else res.sendStatus(401);
}

