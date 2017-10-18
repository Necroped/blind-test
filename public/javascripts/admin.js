var socket = io('http://localhost:3000');

var allTeams;



function updatePlayer(id) {
    var select = $('#' + id);
    $.ajax({
        dataType: 'json',
        url: '/api/player/update/team',
        contentType: 'application/json',
        data : JSON.stringify({
            player_id : id,
            team_id : select.val()
        }),
        type: 'POST',
        success: function(response) {
            console.log(response + " updating team");
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
        
        $.ajax({
            dataType: 'json',
            url: '/api/teams/all',
            type: 'GET',
            success: function(response) {
                allTeams = response.data;
                console.log(allTeams);
            }
        });
        
        var playersTable = $('#playersTable').DataTable( {
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
        
        var teamsTable = $('#teamsTable').DataTable( {
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
    console.log(socket.id);

    socket.on('player/new', (player) => {
        console.log("new player connected : " + player.username);
        playersTable.ajax.reload();
    });
    socket.on('team/new', (player) => {
        teamsTable.ajax.reload();
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

});