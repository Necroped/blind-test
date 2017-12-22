const AdminController = require('./controllers/AdminController.js'),
  PlayerController = require('./controllers/PlayerController.js'),
  TeamController = require('./controllers/TeamController.js'),
  SongController = require('./controllers/SongController.js');

module.exports = io => {
  io.on('connection', socket => {
    socket.on('player/new', data => {
      let player_id = data.player_id,
        action = { $set: { socket: socket.id } };
      PlayerController.update(
        {
          player_id: player_id,
          action: action
        },
        player => {
          io.to('admin_room').emit('player/new', {
            username: player.username
          });
        }
      );
    });
    socket.on('admin/connected', data => {
      socket.join('admin_room');
    });
    socket.on('player/click', data => {
      io.to('admin_room').emit('player/click', {
        player_id: data.player_id,
        time: data.time
      });
    });
  });
};
