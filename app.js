const
  _config       = require('./config.js'),
  express       = require('express'),
  app           = express(),
  debug         = require( 'debug' )( 'blind-quiz:server' ),
  http          = require( 'http' ),
  server        = http.createServer( app ),
  io            = require('socket.io')(server);
  port          = normalizePort(process.env.PORT || _config.server.port );
  path          = require('path'),
  favicon       = require('serve-favicon'),
  logger        = require('morgan'),
  cookieParser  = require('cookie-parser'),
  bodyParser    = require('body-parser'),
  mongoose      = require('mongoose'),
  passport      = require('passport'),
  session       = require('express-session'),
  LocalStrategy = require('passport-local').Strategy;

const
  AdminRoutes  = require('./routes/AdminRoutes'),
  PlayerRoutes = require('./routes/PlayerRoutes'),
  APIRoutes    = require('./routes/APIRoutes');

const
  AdminModel  = require('./models/AdminModel').Model,
  PlayerModel = require('./models/PlayerModel').Model,
  SongModel   = require("./models/SongModel").Model,
  TeamModel   = require('./models/TeamModel').Model;


app.set( 'port', port );

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen( port );
server.on( 'error', onError );
server.on( 'listening', onListening );

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort( val ) {
  return isNaN( parseInt( val, 10 ) ) ? val : parseInt( val, 10 ) >= 0 ? parseInt( val, 10 ) : false
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError( error ) {
  if ( error.syscall !== 'listen' ) {
    throw error;
  }

  const bind = ( typeof port === 'string' ? 'Pipe ' : 'Port ' ) + port;

  // handle specific listen errors with friendly messages
  switch( error.code ) {
    case 'EACCES':
      console.error( bind + ' requires elevated privileges' );
      process.exit( 1 );
    break;
    case 'EADDRINUSE':
      console.error( bind + ' is already in use' );
      process.exit( 1 );
    break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  debug( 'Listening on ' + bind );
}
  
mongoose.Promise = global.Promise;
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret:            _config.session.secret,
  resave:            false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(AdminModel.authenticate()));
passport.serializeUser(AdminModel.serializeUser());
passport.deserializeUser(AdminModel.deserializeUser());

mongoose.connect(`mongodb://${_config.mongoose.host}:${_config.mongoose.port}/${_config.mongoose.database}`, { 
  useMongoClient: true 
})
.then(()     => {
  console.log('Connection succesful');
  PlayerModel.remove({}, (err) => console.log('Player base removed')); 
  SongModel.remove({}, err => console.log("Song base removed"));  
  TeamModel.remove({},   (err) => console.log('Team base removed'));
  AdminModel.remove({},  (err) => {
    console.log('Admin base removed');  
    AdminModel.register( 
      new AdminModel({ 
        username : 'admin'
      }), 
      'admin', 
      (err, admin) => err ? console.log(`Error when adding admin to DB : ${err}`) : console.log('Admin added to DB')
    );
  })
})
.catch((err) => console.error(err))

app.get('/', (req, res, next) => {
  res.redirect('/player');
});

app.use('/player', PlayerRoutes);
app.use('/admin', AdminRoutes);
app.use('/api', APIRoutes);

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

require('./socket.js')(io)

module.exports = app;