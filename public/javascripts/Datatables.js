var Datatables = function() {}
Datatables.songs;
Datatables.teams;
Datatables.players;
Datatables.loadjs;

var dictionnary = {
    lengthMenu   : 'Afficher _MENU_ données par page',
    zeroRecords  : 'Aucune donnée trouvée - désolé',
    info         : 'Page _PAGE_ / _PAGES_',
    infoEmpty    : 'Aucune donnée disponible',
    infoFiltered : '(filtrée sur _MAX_ données totales)'
}

Datatables.initSongs = function(selector) {
    if ($(selector)) {
        Datatables.songs = $(selector).DataTable({
            rowReorder : false,
            ajax       : {
                url     : '/api/song/getTrack',
                dataSrc : 'data',
                type    : 'POST',
                data    : function(d) {
                    d.track = '*' + $('#search_song_input').val() + '*';
                }
            },
            columns: [
                {
                    data        : 'jacket',
                    createdCell : function(td, cellData, rowData, row, col) {
                        $(td).css('background-image', 'url(' + cellData + ')').css('background-repeat', 'no-repeat').css('background-size', '80px 80px').width('80px').html('');
                        $(td).parent().height('80px');
                    }
                },
                {
                    data: 'title'
                },
                {
                    data: 'artist'
                },
                {
                    data   : 'id',
                    render : function(data, type, row, meta) {
                        var isAdded = false;
                        if (typeof Datatables.loadjs.songs !== 'undefined' && Datatables.loadjs.songs.length > 0) {
                            for(var i = 0; i > Datatables.loadjs.songs.length; i++) {
                                if(Datatables.loadjs.songs[i].idSpotify == data) {
                                    isAdded = true;
                                    break;
                                }
                            }
                        }
/*                         if (typeof window.allSongs !== 'undefined') {
                            for (var i = 0; i < window.allSongs.length; i++) {
                                if (window.allSongs[i].idSpotify == data) {
                                    isAdded = true;
                                    break;
                                }
                            }
                        } */
                        var btn = $('<button>').attr('type', 'button').attr('id', 'addbutton_' + data).addClass('btn').addClass(isAdded == true ? 'btn-danger' : 'btn-success').addClass('btn-block').attr('onclick',(isAdded == true ? 'removeSong' : 'addSong') +'(' +JSON.stringify(row) +')').html(isAdded == true ? 'REMOVE' : 'ADD');
                        return btn[0].outerHTML;
                    }
                }
            ],
            language: {
                lengthMenu   : dictionnary.lengthMenu,
                zeroRecords  : dictionnary.zeroRecords,
                info         : dictionnary.info,
                infoEmpty    : dictionnary.infoEmpty,
                infoFiltered : dictionnary.infoFiltered
            }
        });
    }
    
}

Datatables.initPlayers = function(selector) {
    if ($(selector)) {
        Datatables.players = $(selector).DataTable({
          ajax: {
            url: "/api/players/all",
            dataSrc: "data"
          },
          columns: [
            {
              data: "username"
            },
            {
              data: "connected",
              render: function(data, type, row, meta) {
                return '<input type="checkbox" checked=' + data + ' disabled>';
              }
            },
            {
              data: "score"
            },
            {
              data: "team",
              render: function(data, type, row, meta) {
                var sel = $("<select>").attr("value", data);
                sel.attr("id", row._id);
                sel.addClass("form-control");
                sel.attr("onchange", "updatePlayer(" + row._id + ")");
                sel.append(
                  $("<option>")
                    .attr("value", "")
                    .text("- NONE -")
                );
                if (typeof Datatables.loadjs.teams !== "undefined" && Datatables.loadjs.teams.length > 0) {

                    for (var i = 0; i < Datatables.loadjs.teams.length; i++) {
                      var team = teams[i];
                      var option = $("<option>")
                        .css("background- color", "#" + team.color)
                        .attr("value", team._id)
                        .text(team.name);
                      if (team._id == data) {
                        option.attr("selected", "selected");
                      }
                      sel.append(option);
                    }
                }
                /*                         $(allTeams).each((index, team) => {
                            var option = $('<option>').css('background- color', '#' + team.color).attr('value', team._id).text(team.name);
                            if (team._id == data) {
                                option.attr('selected', 'selected');
                            }
                            sel.append(option);
                        }); */
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
}

Datatables.initTeams = function(selector) {
    
    if ($(selector)) {
        Datatables.teams = $(selector).DataTable({
            ajax: {
                url     : '/api/teams/all',
                dataSrc : 'data'
            },
            columns: [
                {
                    data: 'name'
                },
                {
                    data        : 'color',
                    createdCell : function(td, cellData, rowData, row, col) {
                        $(td).css('color', '#' + cellData);
                        $(td).css('background-color', '#' + cellData);
                    }
                }
            ],
            language: {
                lengthMenu   : dictionnary.lengthMenu,
                zeroRecords  : dictionnary.zeroRecords,
                info         : dictionnary.info,
                infoEmpty    : dictionnary.infoEmpty,
                infoFiltered : dictionnary.infoFiltered
            }
        });
    }
}