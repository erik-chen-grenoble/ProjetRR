var XHR = function(method, ad, params) {
	var xhr = new XMLHttpRequest();
	xhr.onload = params.onload || null;
	xhr.open(method, ad);
	if (method == 'POST') {
		xhr.setRequestHeader('Content-Type',
				'application/x-www-form-urlencoded');
	}
	var variables = params.variables || null, str = '';
	for ( var i in variables) {
		str += i + '=' + encodeURIComponent(variables[i]) + '&';
	}
	xhr.send(str);
}

function authorizeMove(sens, configPlateau, ligne, colonne){
                     if(sens == "d"){
                        if(configPlateau.board[line][l].g == 1){
                             $(".ligne"+line+" "+".colonne"+(l-1)).addClass("case_deplacement");
                            return 
                        }else if(configPlateau.board[line][l].d == 1){
                             $(".ligne"+line+" "+".colonne"+(l)).addClass("case_deplacement");
                            return
                        }
                     }
                }

function generatePlateau(idGame){
 			    XHR('GET', idGame, {onload: function() {

 						var configPlateau = JSON.parse(this.responseText);
 						
                        printTable(configPlateau); 						

 					} } );
}
                            
                
function printTable(configPlateau){
                    var table = new Array();

 						for (var i = 0; i < configPlateau.board.length; i++) {
 							// $("#board").append("<tr>");
                            var value = "";
 							for (var j = 0; j < configPlateau.board[i].length; j++) {
 								var border = flatArray(Object.keys(configPlateau.board[i][j]));
                                var classBorder = "";
                                if(border=="g"){
                                    classBorder = "bord_gauche";
                                }else if(border=="d"){
                                    classBorder = "bord_droit";
                                }else if(border=="b"){
                                    classBorder = "bord_bas";
                                }else if(border=="h"){
                                    classBorder = "bord_haut";
                                }else if(border=="gh" || border=="hg"){
                                    classBorder = "angle_haut_gauche";
                                }else if(border=="dh" || border=="hd"){
                                    classBorder = "angle_haut_droit";
                                }else if(border=="gb" || border=="bg"){
                                    classBorder = "angle_bas_gauche";
                                }else if(border=="db" || border=="bd"){
                                    classBorder = "angle_bas_droit";
                                }
 								value +="<td class=\"case "+classBorder+" ligne"+i+" colonne"+j+" "+"\">"+border+"</td>";
 							};
 							$("#board").append("<tr class=\"ligne"+i+"\"></tr>");
 						};
                        
                        var posRobot = new Array();
                        posRobot = configPlateau.robots;
                    
                        for(var k = 0; k<posRobot.length; k++){
                            $(".ligne"+posRobot[k].line+" "+".colonne"+posRobot[k].column).html("<div class=\"robot_"+posRobot[k].color+"\">r</div>");
                        }
                    
                        var posTarget = configPlateau.target;   
                    
                        $(".ligne"+posTarget.l+" "+".colonne"+posTarget.c).html("<div class=\"target_"+posTarget.t+"\"></div>");
                    
                        // console.log(posRobot[0].column);
                        // console.log(posRobot[0]);
                    
                        var line = posRobot[0].line;
                    
                        for(var l = posRobot[0].column+1; l<configPlateau.board[0].length ; l++){
                            var border = flatArray(Object.keys(configPlateau.board[line][l]));

                            
                            $(".ligne"+line+" "+".colonne"+(l)).addClass("case_deplacement");
                        }
                }                        
                
				

function init(idGame) {
	// Connect to the SocketIO server to retrieve ongoing games.
    generatePlateau(idGame); 
                        
	socket = io.connect();
	socket.on('participants', function(data) {
		var ul = document.getElementById('lesParticipants');
		ul.innerHTML = '';
		for (p in data.participants) {
			var li = document.createElement('li');
			ul.appendChild(li);
			li.appendChild(document.createTextNode(data.participants[p]));
		}
	});
	socket.on('FinalCountDown', function(data) {
		var ms = data.FinalCountDown;
		console.log("FinalCountDown : " + ms);
	});
	socket.on('TerminateGame', function(data) {
		h1 = document.querySelector('body > header > h1');
		h1.innerHTML += ' est terminée !';
	});
	socket.on('solutions', function(data) {
		var ul = document.getElementById('lesSolutions');
		ul.innerHTML = '';
		for (s in data.solutions) {
			var li = document.createElement('li');
			ul.appendChild(li);
			li.appendChild(document.createTextNode(data.solutions[s]));
		}
		console.log("Solutions are :\n" + JSON.stringify(data.solutions));
	});
	socket.emit('identification', {
		login : document.getElementById('login').value,
		idGame : document.getElementById('idGame').value
	});
}

/**
 * Show the list of "participants"
 */
function showParticipants() {
	socket = io.connect();
	socket.on('participants', function(data) {
		var ul = document.getElementById('lesParticipants');
		ul.innerHTML = '';
		for (p in data.participants) {
			var li = document.createElement('li');
			ul.appendChild(li);
			li.appendChild(document.createTextNode(data.participants[p]));
		}
	});
	socket.emit('identification', {
		login : document.getElementById('login').value,
		idGame : document.getElementById('idGame').value
	});
	
}

/**
 * Propose a move for a robot
 */
function proposition(){
	var colorValue = document.getElementById('color').value;
	var lineValue = document.getElementById('line').value;
	var columnValue = document.getElementById('column').value;
	var loginValue = document.getElementById('login').value;
	var idGameValue = document.getElementById('idGame').value;
	XHR( "POST"
	         , "/proposition"
	         ,   { 
	         onload : function() {
	        	 var reponseServer = JSON.parse(this.responseText);
	        	 alert(reponseServer.state);
	        
	         }
	         , variables : { 
	        	 login : loginValue
	        	 , idGame : idGameValue
	        	 , proposition : JSON.stringify( [ { command: 'select' , robot: colorValue} , { command : 'move', line : lineValue , column: columnValue}])
	         }
	         }
     );
}
