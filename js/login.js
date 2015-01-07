function init() {
    $('#submitBouton').click(
        function(){
            if(checkSubmit()){
                $("#nouvellePartie").submit();
            }
    });
	// Connect to the SocketIO server to retrieve ongoing games.
	socket = io.connect();
	$('#login2').prop('disabled', true);
	
	socket.on('gamesList', function(data) {
		var ul = document.getElementById('lesParties');
        $("#newForm").html("");
		ul.innerHTML = '';

		if(data.gamesList.length != 0){
			$('#login2').removeAttr('disabled');
			for (p in data.gamesList) {
				document.getElementById('newForm').innerHTML = document.getElementById('newForm').innerHTML +"<form method=\"post\" action=\"\" id=\"partie"+data.gamesList[p]+"\" role=\"form\"><input type=\"hidden\" class=\"form-control\" id=\"login\" name=\"login\" placeholder=\"Entrez un pseudo\" value=\""+createNewName()+"\"/><input type=\"hidden\" class=\"form-control\" id=\"idGame\" name=\"idGame\" placeholder=\"Nom de la partie\" value =\""+data.gamesList[p]+"\"/><button type=\"submit\" style=\"background-color: #2C3E50; border:none\">"+data.gamesList[p]+"</button></form>";
			}
		}
    }
	);
	socket.emit('loginPage');
}

function checkSubmit(){
    var data = $("#idGame").val();
    var login = $("#login").val();
    
    if(data==""){
        alert("Nom de partie vide");
    }
    else if(!(data.match(/^[-_ a-zA-Z0-9]+$/))) {
       alert("Merci de renseigner seulement des lettres ou chiffres");       
    }else{
        if(login==""){
            $("#login").val(createNewName);
        }
        return true;   
    }
    return false;
}

function createNewName(){
    var firstNameSyllables=new Array();
    firstNameSyllables[0] = "mon";
    firstNameSyllables[1] = "fay";
    firstNameSyllables[2] ="shi";
    firstNameSyllables[3] ="zag";
    firstNameSyllables[4] ="blarg";
    firstNameSyllables[5] ="rash";
    firstNameSyllables[6] ="izen";
    firstNameSyllables[7] ="malo";
    firstNameSyllables[8] ="zak";
    firstNameSyllables[9] ="abo";
    firstNameSyllables[10] ="wonk";
    firstNameSyllables[11] ="son";
    firstNameSyllables[12] ="li";
    firstNameSyllables[13] ="kor";
    
    var name = "";
    
    for(var i = 0; i<Math.floor((Math.random() * 3) + 2); i++){
        name+=firstNameSyllables[Math.floor((Math.random() * 13))];
    }
    return capitaliseFirstLetter(name);
}

function capitaliseFirstLetter(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}
