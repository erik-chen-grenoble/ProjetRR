function init() {
	// Connect to the SocketIO server to retrieve ongoing games.
	socket = io.connect();
	$('#login2').prop('disabled', true);
	
	socket.on('gamesList', function(data) {
		var ul = document.getElementById('lesParties');
		ul.innerHTML = '';

		if(data.gamesList.length != 0){
			$('#login2').removeAttr('disabled');
			for (p in data.gamesList) {
				document.getElementById('newForm').innerHTML = document.getElementById('newForm').innerHTML +"<form method=\"post\" action=\"\" id=\"partie"+data.gamesList[p]+"\" role=\"form\"><input type=\"hidden\" class=\"form-control\" id=\"login\" name=\"login\" placeholder=\"Entrez un pseudo\" value=\"unknow\"/><input type=\"hidden\" class=\"form-control\" id=\"idGame\" name=\"idGame\" placeholder=\"Nom de la partie\" value =\""+data.gamesList[p]+"\"/><button type=\"submit\" class=\"texte_SC\" style=\"background-color: #2C3E50; border:none\">"+data.gamesList[p]+"</button></form>";
			}
		}
	});
	socket.emit('loginPage');
}

