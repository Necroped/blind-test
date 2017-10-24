//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////// UTILS //////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var Utils = function() {}

Utils.updatePlayer = null;

Utils.getRGBComponents = function(color) {       
    
    var r = color.substring( 1, 3 );
    var g = color.substring( 3, 5 );
    var b = color.substring( 5, 7 );

    return {
        R: parseInt( r, 16 ),
        G: parseInt( g, 16 ),
        B: parseInt( b, 16 )
    };
}

Utils.idealTextColor = function( bgColor ) {
    var nThreshold = 105;
    var components = Utils.getRGBComponents( bgColor );
    var bgDelta    = ( components.R * 0.299 ) + ( components.G * 0.587 ) + ( components.B * 0.114 );
    var finalColor = (( 255 - bgDelta ) < nThreshold ) ? "#000000" : "#ffffff";
    
    return finalColor;   
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////// DATATABLELIBRARY /////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

DatatableLibrary = function() {}

DatatableLibrary.tables = {};

DatatableLibrary.selectors = {
    players : '#playersTable',
    songs   : '#songsTable',
    teams   : '#teamsTable'
}

DatatableLibrary.init = function() {
    DatatableLibrary.initPlayers();
    DatatableLibrary.initSongs();
    DatatableLibrary.initTeams();
}

DatatableLibrary.initPlayers = function() {
    
    var updatePlayer = function( id ) {
        var select = $('#' + id);
        if(!select) {
            return false
        }
        AjaxCalls.playerUpdateTeam( id, select.val() );
    }
    
    DatatableLibrary.tables.players = $( DatatableLibrary.selectors.players ).DataTable({
        ajax: {
            url     : '/api/players/all',
            dataSrc : 'data'
        },
        columns: [
            { 
                data : 'username' 
            }, { 
                data   : 'connected',
                render : function( data, type, row, meta ) {
                    return '<input type="checkbox" checked="' + data + '" disabled>';
                } 
            }, { 
                data : 'score' 
            }, {             
                data   : 'team',
                render : function( data, type, row, meta ) {
                    var sel = $('<select>')
                        .attr('value', data)
                        .attr('id', row._id)
                        .addClass('form-control')
                        .attr('onchange', 'updatePlayer("' + row._id + '")')
                        .append( $("<option>")
                            .attr('value', '')
                            .text('- NONE -')
                        );

                    $( Utils.updatePlayer ).each( function( index, team ) {
                        var option = $("<option>")
                            .css('background- color', '#' + team.color)
                            .attr('value', team._id)
                            .text(team.name);
                        
                        if( team._id == data ) {
                            option.attr('selected', 'selected');
                        }

                        sel.append(option);
                    });
                    return sel[0].outerHTML;
                }
            }
            
        ],
        language : {
            lengthMenu   : "Afficher _MENU_ données par page",
            zeroRecords  : "Aucune donnée trouvée - désolé",
            info         : "Page _PAGE_ / _PAGES_",
            infoEmpty    : "Aucune donnée disponible",
            infoFiltered : "(filtrée sur _MAX_ données totales)"
        }
    });
}

DatatableLibrary.initSongs = function() {
    
    DatatableLibrary.tables.songs = $( DatatableLibrary.selectors.songs ).DataTable({
        rowReorder : false,
        ajax : {
            url     : '/api/song/getTrack',
            dataSrc : 'data',
            type    : 'POST',
            data    : function ( d ) {
                d.track = '*' + $('#search_song_input').val() + '*';
            }
        },
        columns : [
            { 
                data : 'jacket',
                createdCell : function (td, cellData, rowData, row, col) {
                    $(td)
                        .css('background-image', 'url(' + cellData + ')')
                        .css('background-repeat', 'no-repeat')
                        .css('background-size', '80px 80px')
                        .width('80px')
                        .html('')
                        .parent().height('80px')
                }
            }, { 
                data: 'title' 
            }, { 
                data: 'artist' 
            }
        ],
        language : {
            lengthMenu   : "Afficher _MENU_ données par page",
            zeroRecords  : "Aucune donnée trouvée - désolé",
            info         : "Page _PAGE_ / _PAGES_",
            infoEmpty    : "Aucune donnée disponible",
            infoFiltered : "(filtrée sur _MAX_ données totales)"
        }
    });
}

DatatableLibrary.initTeams = function() {
    DatatableLibrary.tables.teams = $( DatatableLibrary.selectors.teams ).DataTable( {
        ajax : {
            url     : '/api/teams/all',
            dataSrc : 'data'
        },
        columns: [
            { 
                data: 'name' 
            }, { 
                data : 'color',
                createdCell : function(td, cellData, rowData, row, col) {
                    $(td)
                        .css('color', '#' + cellData)
                        .css('background-color', '#' + cellData);
                }
            }
        ],
        language : {
            lengthMenu   : "Afficher _MENU_ données par page",
            zeroRecords  : "Aucune donnée trouvée - désolé",
            info         : "Page _PAGE_ / _PAGES_",
            infoEmpty    : "Aucune donnée disponible",
            infoFiltered : "(filtrée sur _MAX_ données totales)"
        }
    });
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////// AJAXCALLS ////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

AjaxCalls = function() {}

AjaxCalls.playerUpdateTeam = function( player_id, team_id ) {
    if(!player_id || !team_id) {
        return false;
    }
    $.ajax({
        dataType    : 'json',
        url         : '/api/player/update/team',
        contentType : 'application/json',
        data        : JSON.stringify({
            player_id : player_id,
            team_id   : team_id
        }),
        type        : 'POST',
        success     : function(response) {
            console.log(response + " updating team");
        }
    });
}

AjaxCalls.createTeam = function( name, color ) {
    if(!name || !color) {
        return false;
    }
    $.ajax({
        dataType    : 'json',
        url         : '/api/teams/create',
        contentType : 'application/json',
        data        : JSON.stringify({
            name  : name,
            color : color
        }),
        type        : 'POST',
        success     : function(response) {
            if(!response.error) {
                DatatableLibrary.tables.teams.ajax.reload();
                DatatableLibrary.tables.players.ajax.reload();
            } else {
                alert('error : ' + response.error);
            }
        }
    });
}

AjaxCalls.updatePlayer = function() {
    $.ajax({
        dataType : 'json',
        url      : '/api/teams/all',
        type     : 'GET',
        success  : function(response) {
            Utils.allTeams = response.data;
        }
    });
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////// SOCKETS /////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

Socket = function() {}

Socket.init = function() {
    
    if(!socket) {
        var socket = io('http://localhost:3000');
    }
    

    /****************************************************************************************************************************/
    /*********************************************************** EMIT ***********************************************************/
    /****************************************************************************************************************************/
    socket.emit('admin/connected', {
        username : $('#username_hidden').val()
    });

    
    /****************************************************************************************************************************/
    /************************************************************ ON ************************************************************/
    /****************************************************************************************************************************/
    socket.on('player/new', (player) => {
        DatatableLibrary.tables.players.ajax.reload();
    });
    socket.on('team/new', (player) => {
        DatatableLibrary.tables.teams.ajax.reload();
    });
    socket.on('player/click', (data) => {
        var player = data.player;
        var time   = data.time;
        $('#Game')
            .append($('<tr>')
                .append($('<td>').text(player.username))
                .append($('<td>').text(new Date(time).toISOString()))
        )
        alert(player.username + ' clicked on ' + time);
    });
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////// DOM ///////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$( document ).ready(function() {
   
    window.reloadContent = function() {

        $('#search_song_input').on('keyup', function() {
            DatatableLibrary.tables.songs.ajax.reload();
        });

    
        $('#create_team').on('click', function() {
            AjaxCalls.createTeam( $('#create_team_name').val(), $('#create_team_color').val() );
        });

        
        AjaxCalls.updatePlayer();       
        
        jscolor.installByClassName("jscolor");

        DatatableLibrary.init();
    }

    Socket.init();

});