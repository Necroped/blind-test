const
  express       = require('express'),
  app           = express(),
  debug         = require( 'debug' )( 'blind-quiz:server' ),
  http          = require( 'http' ),
  server        = http.createServer( app ),
  io            = require('socket.io')(server);
  port          = normalizePort( process.env.PORT || '3000' );
  path          = require('path'),
  favicon       = require('serve-favicon'),
  logger        = require('morgan'),
  cookieParser  = require('cookie-parser'),
  bodyParser    = require('body-parser'),
  mongoose      = require('mongoose'),
  passport      = require('passport'),
  session       = require('express-session'),
  LocalStrategy = require('passport-local').Strategy;


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
  

io.on('connection', (socket) => {
  console.log('connected');
  socket.on('connected', (data) => {
    console.log('on connected');
    io.to('admin_room').emit('player/new', {
      username : data.username
    });
  });  
  socket.on('admin/connected', (data) => {
    console.log('on admin_connected');
    socket.join('admin_room');
  });
});
  
mongoose.Promise = global.Promise;
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret:            'ITEventMacon',
  resave:            false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

const AdminModel = require('./models/AdminModel').Model;
passport.use(new LocalStrategy(AdminModel.authenticate()));
passport.serializeUser(AdminModel.serializeUser());
passport.deserializeUser(AdminModel.deserializeUser());

const PlayerModel = require('./models/PlayerModel').Model;
const TeamModel   = require('./models/TeamModel').Model;

mongoose.connect('mongodb://localhost:27017/blind-quiz')
.then(()     => console.log('connection succesful'))
.catch((err) => console.error(err))
.then(() => {
  AdminModel.remove({}, function(err) { 
    console.log('Admin base removed') 
  });  
  PlayerModel.remove({}, function(err) { 
    console.log('Player base removed') 
  });  
  TeamModel.remove({}, function(err) { 
    console.log('Team base removed') 
  });
})
.catch((err) => console.error(err))
.then(() => {
  AdminModel.register( new AdminModel({ 
    username : 'admin'
  }), 
  'admin', 
  (err, admin) => {
    if (err) {
      console.log(`Error when adding admin to DB : ${err}`);
    } else  {
      console.log('Admin added to DB');
    }
  });
})

const
  AdminRoutes  = require('./routes/AdminRoutes'),
  PlayerRoutes = require('./routes/PlayerRoutes'),
  APIRoutes = require('./routes/APIRoutes');


// catch 404 and forward to error handler
app.get('/', (req, res, next) => {
  res.redirect('/player');
});

app.use('/player', PlayerRoutes);
app.use('/admin', AdminRoutes);
app.use('/api', APIRoutes);


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