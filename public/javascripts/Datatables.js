var Datatables = function() {};
Datatables.songs;
Datatables.searchsongs;
Datatables.teams;
Datatables.players;
Datatables.loadjs;

var dictionnary = {
  lengthMenu: 'Afficher _MENU_ données par page',
  zeroRecords: 'Aucune donnée trouvée - désolé',
  info: 'Page _PAGE_ / _PAGES_',
  infoEmpty: 'Aucune donnée disponible',
  infoFiltered: '(filtrée sur _MAX_ données totales)'
};

Datatables.initSearchSongs = function(selector) {
  if ($(selector)) {
    Datatables.searchsongs = $(selector).DataTable({
      ordering: false,
      ajax: {
        url: '/api/song/getTrack',
        dataSrc: 'data',
        type: 'POST',
        data: function(d) {
          d.track = $('#search_song_input')
            .val()
            .split(',')[0];
          d.artist = $('#search_song_input')
            .val()
            .split(',')[1];
        }
      },
      columns: [
        {
          data: 'cover',
          createdCell: function(td, cellData, rowData, row, col) {
            $(td)
              .css('background-image', 'url(' + cellData + ')')
              .css('background-repeat', 'no-repeat')
              .css('background-size', '80px 80px')
              .width('80px')
              .html('');
            $(td)
              .parent()
              .height('80px');
          }
        },
        {
          data: 'title'
        },
        {
          data: 'artist'
        },
        {
          data: 'externalId',
          render: function(data, type, row, meta) {
            var isAdded = false;
            if (
              typeof Datatables.loadjs.songs !== 'undefined' &&
              Datatables.loadjs.songs.length > 0
            ) {
              for (var i = 0; i < Datatables.loadjs.songs.length; i++) {
                if (Datatables.loadjs.songs[i].externalId == '' + data) {
                  isAdded = true;
                  break;
                }
              }
            }
            var btn = $('<button>')
              .attr('type', 'button')
              .attr('id', 'addbutton_' + data)
              .addClass('btn')
              .addClass(isAdded == true ? 'btn-danger' : 'btn-success')
              .addClass('btn-block')
              .attr(
                'onclick',
                (isAdded == true
                  ? 'Datatables.loadjs.songRemove'
                  : 'Datatables.loadjs.songAdd') +
                  '(' +
                  JSON.stringify(row) +
                  ')'
              )
              .html(isAdded == true ? 'REMOVE' : 'ADD');
            return btn[0].outerHTML;
          }
        }
      ],
      language: {
        lengthMenu: dictionnary.lengthMenu,
        zeroRecords: dictionnary.zeroRecords,
        info: dictionnary.info,
        infoEmpty: dictionnary.infoEmpty,
        infoFiltered: dictionnary.infoFiltered
      }
    });
  }
};

Datatables.initSongs = function(selector) {
  if ($(selector)) {
    Datatables.songs = $(selector).DataTable({
      ordering: false,
      ajax: {
        url: '/api/songs/all',
        dataSrc: 'data'
      },
      columns: [
        {
          data: 'cover',
          createdCell: function(td, cellData, rowData, row, col) {
            $(td)
              .css('background-image', 'url(' + cellData + ')')
              .css('background-repeat', 'no-repeat')
              .css('background-size', '80px 80px')
              .width('80px')
              .html('');
            $(td)
              .parent()
              .height('80px');
          }
        },
        {
          data: 'title'
        },
        {
          data: 'artist'
        },
        {
          data: 'externalId',
          render: function(data, type, row, meta) {
            var isAdded = false;
            if (
              typeof Datatables.loadjs.songs !== 'undefined' &&
              Datatables.loadjs.songs.length > 0
            ) {
              for (var i = 0; i < Datatables.loadjs.songs.length; i++) {
                if (Datatables.loadjs.songs[i].externalId == '' + data) {
                  isAdded = true;
                  break;
                }
              }
            }
            var btn = $('<button>')
              .attr('type', 'button')
              .attr('id', 'addbutton_' + data)
              .addClass('btn')
              .addClass(isAdded == true ? 'btn-danger' : 'btn-success')
              .addClass('btn-block')
              .attr(
                'onclick',
                (isAdded == true
                  ? 'Datatables.loadjs.songRemove'
                  : 'Datatables.loadjs.songAdd') +
                  '(' +
                  JSON.stringify(row) +
                  ')'
              )
              .html(isAdded == true ? 'REMOVE' : 'ADD');
            return btn[0].outerHTML;
          }
        }
      ],
      language: {
        lengthMenu: dictionnary.lengthMenu,
        zeroRecords: dictionnary.zeroRecords,
        info: dictionnary.info,
        infoEmpty: dictionnary.infoEmpty,
        infoFiltered: dictionnary.infoFiltered
      }
    });
  }
};

Datatables.initPlayers = function(selector) {
  if ($(selector)) {
    Datatables.players = $(selector).DataTable({
      ajax: {
        url: '/api/players/all',
        dataSrc: 'data'
      },
      columns: [
        {
          data: 'username'
        },
        {
          data: 'connected',
          render: function(data, type, row, meta) {
            return '<input type="checkbox" checked=' + data + ' disabled>';
          }
        },
        {
          data: 'score'
        },
        {
          data: 'team',
          render: function(data, type, row, meta) {
            var sel = $('<select>').attr('value', data);
            sel.attr('id', row._id);
            sel.addClass('form-control');
            sel.attr('onchange', 'Ajax.playerUpdateTeam("' + row._id + '")');
            sel.append(
              $('<option>')
                .attr('value', '')
                .text('- NONE -')
            );
            if (
              typeof Datatables.loadjs.teams !== 'undefined' &&
              Datatables.loadjs.teams.length > 0
            ) {
              for (var i = 0; i < Datatables.loadjs.teams.length; i++) {
                var team = Datatables.loadjs.teams[i];
                var option = $('<option>')
                  .css('background- color', '#' + team.color)
                  .attr('value', team._id)
                  .text(team.name);
                if (team._id == data) {
                  option.attr('selected', 'selected');
                }
                sel.append(option);
              }
            }
            return sel[0].outerHTML;
          }
        }
      ],
      language: {
        lengthMenu: dictionnary.lengthMenu,
        zeroRecords: dictionnary.zeroRecords,
        info: dictionnary.info,
        infoEmpty: dictionnary.infoEmpty,
        infoFiltered: dictionnary.infoFiltered
      }
    });
  }
};

Datatables.initTeams = function(selector) {
  if ($(selector)) {
    Datatables.teams = $(selector).DataTable({
      ajax: {
        url: '/api/teams/all',
        dataSrc: 'data'
      },
      columns: [
        {
          data: 'name'
        },
        {
          data: 'color',
          createdCell: function(td, cellData, rowData, row, col) {
            $(td).css('color', '#' + cellData);
            $(td).css('background-color', '#' + cellData);
          }
        }
      ],
      language: {
        lengthMenu: dictionnary.lengthMenu,
        zeroRecords: dictionnary.zeroRecords,
        info: dictionnary.info,
        infoEmpty: dictionnary.infoEmpty,
        infoFiltered: dictionnary.infoFiltered
      }
    });
  }
};
