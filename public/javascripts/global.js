// DOM Ready =============================================================
$(document).ready(function() {
	populateVolets();
});


function appelAppareil(codeAppareil, codeAction)
{
    event.preventDefault();
	var params = {
		'codeAppareil': codeAppareil,
		'codeAction': codeAction,
		'timestamp': "20160101225900"
	}
	
	// Use AJAX
	$.ajax({
		type: 'POST',
		data: codeAction,
		url: '192.168.0.200:8080',
		dataType: 'JSON'
        }).done(function( response ) {
		
		// Check for successful (blank) response
		if (response.msg === '') {
			
			console.log("Appel ok");
			
		}
		else {
			
			console.log(response.msg);
			
		}
	});
};

// Initialisation des curseurs
function populateVolets() {

    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON( '/volets/valeursInitiales', function( data ) {

	//TODO traiter les enregistrements renvoyés
        // For each item in our JSON, add a table row and cells to the content string
        /*$.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td><a href="#" class="linkshowuser" rel="' + this.username + '">' + this.username + '</a></td>';
            tableContent += '<td>' + this.email + '</td>';
            tableContent += '<td><a href="#" class="linkdeleteuser" rel="' + this._id + '">delete</a></td>';
            tableContent += '</tr>';
        });*/

        // Inject the whole content string into our existing HTML table
        //$('#userList table tbody').html(tableContent);
    });
};