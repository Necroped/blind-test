var socket = io('http://localhost:3000');
/* 
window.allTeams = getAllTeams();
window.allSongs = getAllSongs();

function updatePlayer(id) {
    var select = $('#' + id);
    $.ajax({
        dataType      : 'json',
        url           : '/api/player/update/team',
        contentType   : 'application/json',
        data          : JSON.stringify({
            player_id : id,
            team_id   : select.val()
        }),
        type          : 'POST',
        success       : function(response) {
            console.log(response + " updating team");
        }
    });
}

function getAllTeams() {
    $.ajax({
        dataType: "json",
        url: "/api/teams/all",
        type: "GET",
        success: function(response) {
            window.allTeams = response.data;
        }
    });
}

function getAllSongs() {
    $.ajax({
        dataType: "json",
        url: "/api/songs/all",
        type: "GET",
        success: function(response) {
            window.allSongs = response.data;
        },
        error : function(err) {
            console.error(err);
        }
    });
}

function addSong(data, cb) {
  $.ajax({
    dataType: "json",
    url: "/api/song/add",
    contentType: "application/json",
    data: JSON.stringify({
      artist: data.artist,
      title: data.title,
      idSpotify: data.id
    }),
    type: "POST",
    success: function(response) {
        window.allSongs = getAllSongs();
        window.songsTable.ajax.reload();
    }
  });
}

function removeSong(data) {
  $.ajax({
    dataType: "json",
    url: "/api/song/remove",
    contentType: "application/json",
    data: JSON.stringify({
        idSpotify: data.id
    }),
    type: "POST",
    success: function(response) {
        window.allSongs = getAllSongs();
        window.songsTable.ajax.reload();
    }
  });
}

function idealTextColor(bgColor) {
    
    var nThreshold = 105;
    var components = getRGBComponents(bgColor);
    var bgDelta = (components.R * 0.299) + (components.G * 0.587) + (components.B * 0.114);

    return ((255 - bgDelta) < nThreshold) ? "#000000" : "#ffffff";   
}

function getRGBComponents(color) {       

    var r = color.substring(1, 3);
    var g = color.substring(3, 5);
    var b = color.substring(5, 7);

    return {
        R: parseInt(r, 16),
        G: parseInt(g, 16),
        B: parseInt(b, 16)
    };
}

$(document).ready(function() {


    window.reloadContent = function() {
        
        
        jscolor.installByClassName("jscolor");

        window.allTeams = getAllTeams();
        window.allSongs = getAllSongs();

        var timeout;
        $('#search_song_input').on('keydown', function() {
            if(timeout){ 
                clearTimeout(timeout);
            }
            
            timeout = setTimeout(function() {
                window.songsTable.ajax.reload();
            }, 1000);
        });

        
        window.songsTable = $('#songsTable').DataTable({
            rowReorder: false,
            ajax: {
                url : '/api/song/getTrack',
                dataSrc : 'data',
                type : 'POST',
                data : function ( d ) {
                    d.track = '*' + $('#search_song_input').val() + '*';
                }
            },
            columns: [
                { 
                    data: 'jacket',
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('background-image', 'url(' + cellData + ')')
                            .css('background-repeat', 'no-repeat')
                            .css('background-size', '80px 80px')
                            .width('80px')
                            .html('');
                        $(td).parent().height('80px');
                    }
                },
                { data: 'title' },
                { data: 'artist' },
                {             
                    data: 'id',
                    render : function ( data, type, row, meta ) {
                        var isAdded = false;
                        if (typeof window.allSongs !== 'undefined') {
                            for (var i = 0; i < window.allSongs.length ; i++) {
                                if (window.allSongs[i].idSpotify == data) {
                                    isAdded = true;
                                    break;
                                }
                            }
                        }
                        var btn = $("<button>")
                          .attr("type", "button")
                          .attr("id", "addbutton_" + data)
                          .addClass("btn")
                          .addClass(isAdded == true ? "btn-danger" : "btn-success")
                          .addClass("btn-block")
                          .attr("onclick", (isAdded == true ? "removeSong" : "addSong") + "(" + JSON.stringify(row) + ")")
                          .html(isAdded == true ? "REMOVE" : "ADD");
                        return btn[0].outerHTML;
                    }
                }
            ],
            language: {
                lengthMenu:   "Afficher _MENU_ données par page",
                zeroRecords:  "Aucune donnée trouvée - désolé",
                info:         "Page _PAGE_ / _PAGES_",
                infoEmpty:    "Aucune donnée disponible",
                infoFiltered: "(filtrée sur _MAX_ données totales)"
            }
        });
    
        $('#create_team').click(function() {
            $.ajax({
                dataType: 'json',
                url: '/api/teams/create',
                contentType: 'application/json',
                data : JSON.stringify({
                    name : $('#create_team_name').val(),
                    color :  $('#create_team_color').val()
                }),
                type: 'POST',
                success: function(response) {
                    if(!response.error) {
                        location.reload();
                    } else {
                        alert('error : ' + response.error);
                    }
                }
            });
        });

        window.playersTable = $('#playersTable').DataTable( {
            ajax: {
                url : '/api/players/all',
                dataSrc : 'data'
            },
            columns: [
                { data: 'username' },
                { 
                    data: 'connected',
                    render : function ( data, type, row, meta ) {
                        return '<input type="checkbox" checked="' + data + '" disabled>';
                    } 
                },
                { data: 'score' },
                {             
                    data: 'team',
                    render : function ( data, type, row, meta ) {
                        var sel = $('<select>').attr('value', data);
                        sel.attr('id', row._id);
                        sel.addClass('form-control');
                        sel.attr('onchange', 'updatePlayer("' + row._id + '")');
                        sel.append($("<option>").attr('value', '').text('- NONE -'));
                        $(allTeams).each((index, team) => {
                            var option = $("<option>").css('background- color', '#' + team.color).attr('value', team._id).text(team.name);
                            if(team._id == data) {
                                option.attr('selected', 'selected');
                            }
                            sel.append(option);
                        });
                        return sel[0].outerHTML;
                    }
                }
                
            ],
            language: {
                lengthMenu:   "Afficher _MENU_ données par page",
                zeroRecords:  "Aucune donnée trouvée - désolé",
                info:         "Page _PAGE_ / _PAGES_",
                infoEmpty:    "Aucune donnée disponible",
                infoFiltered: "(filtrée sur _MAX_ données totales)"
            }
        });
        
        window.teamsTable = $('#teamsTable').DataTable( {
            ajax: {
                url : '/api/teams/all',
                dataSrc : 'data'
            },
            columns: [
                { data: 'name' },
                { 
                    data: 'color',
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('color', '#' + cellData);
                        $(td).css('background-color', '#' + cellData);
                    }
                }
            ],
            language: {
                lengthMenu:   "Afficher _MENU_ données par page",
                zeroRecords:  "Aucune donnée trouvée - désolé",
                info:         "Page _PAGE_ / _PAGES_",
                infoEmpty:    "Aucune donnée disponible",
                infoFiltered: "(filtrée sur _MAX_ données totales)"
            }
        });
    }
 */
    socket.on('player/new', (player) => {
        console.log("new player connected : " + player.username);
        window.playersTable.ajax.reload();
    });
    socket.on('team/new', (player) => {
        window.teamsTable.ajax.reload();
    });
    socket.emit('admin/connected', {
        username : $('#username_hidden').val()
    });
    socket.on('player/click', (data) => {
        var player = data.player;
        var time = data.time;
        $('#Game').append($('<tr>')
            .append($('<td>').text(player.username))
            .append($('<td>').text(new Date(time).toISOString()))
        )
        alert(player.username + ' clicked on ' + time);
    });
/* 
}); */