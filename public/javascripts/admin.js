var socket = io('http://localhost:3000');
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
                $(td).css('color', idealTextColor(cellData));
                $(td).css('background-color', cellData);
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

socket.on('player/new', (player) => {
    playersTable.ajax.reload();
});
socket.on('team/new', (player) => {
    teamsTable.ajax.reload();
});
socket.emit('admin/connected', {
    username : $('#username_hidden').val()
});