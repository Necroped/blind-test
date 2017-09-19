const
  express       = require('express'),
  app           = express();
  path          = require('path'),
  favicon       = require('serve-favicon'),
  logger        = require('morgan'),
  cookieParser  = require('cookie-parser'),
  bodyParser    = require('body-parser'),
  mongoose      = require('mongoose'),
  passport      = require('passport'),
  LocalStrategy = require('passport-local').Strategy;
  
mongoose.Promise = global.Promise;
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('express-session')({
  secret:            'ITEventMacon',
  resave:            false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

const AdminModel = require('./models/AdminModel');
passport.use(new LocalStrategy(AdminModel.authenticate()));
passport.serializeUser(AdminModel.serializeUser());
passport.deserializeUser(AdminModel.deserializeUser());


mongoose.connect('mongodb://localhost:27017/blind-quiz')
.then(()     => console.log('connection succesful'))
.catch((err) => console.error(err))
.then(() => {
  AdminModel.register( new AdminModel({ 
    username : 'admin'
  }), 
  'admin', 
  (err, admin) => {
    if (err) {
      console.log('trouble when adding admin to DB');
    } else  {
      console.log('admin added to DB');
    }
  });
})

const
  AdminRoutes  = require('./routes/AdminRoutes'),
  PlayerRoutes = require('./routes/PlayerRoutes');

app.use('/', PlayerRoutes);
app.use('/admin', AdminRoutes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error   = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;