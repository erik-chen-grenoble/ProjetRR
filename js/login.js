function init() {
    $('#submitBouton').click(
        function(){
            if(checkSubmit()){
                $("#nouvellePartie").submit();
            }
    });
	// Connect to the SocketIO server to retrieve ongoing games.
	socket = io.connect();
	socket.on('gamesList', function(data) {
		var ul = document.getElementById('lesParties');
		ul.innerHTML = '';
		for (p in data.gamesList) {
			document.getElementById('newForm').innerHTML = document.getElementById('newForm').innerHTML +"<form method=\"post\" action=\"\" id=\"partie"+data.gamesList[p]+"\" role=\"form\"><input type=\"hidden\" class=\"form-control\" id=\"login\" name=\"login\" placeholder=\"Entrez un pseudo\" value=\"unknow\"/><input type=\"hidden\" class=\"form-control\" id=\"idGame\" name=\"idGame\" placeholder=\"Nom de la partie\" value =\""+data.gamesList[p]+"\"/><button type=\"submit\" style=\"background-color: #2C3E50; border:none\">"+data.gamesList[p]+"</button></form>";

			//var li = document.createElement('li');
			//ul.appendChild(li);
			//li.appendChild(document.createTextNode('<a href="#" onclick="document.getElementById(\'nouvellePartie2\').submit; return false;">'+document.createTextNode(data.gamesList[p])+'</a>'));
			//li.appendChild(document.createTextNode(data.gamesList[p]));
		}
	});
	socket.emit('loginPage');
}

function checkSubmit(){
    var data = $("#idGame").val();
    
    if(data==""){
        alert("Nom de partie vide");
    }
    else if(!(data.match(/^[-_ a-zA-Z0-9]+$/))) {
       alert("Merci de renseigner seulement des lettres ou chiffres");       
    }else{
        return true;   
    }
    return false;
}
// function changeLogin(){
	// if (document.getElementById('login') != null) {
		// console.log(document.getElementById('login').value);
		// $('#newForm input[name="login"]').val('test');
	// } else {
		// console.log(document.getElementById('login').value);
		// $('#newForm input[name="login"]').val('prout');
	// }
// }

