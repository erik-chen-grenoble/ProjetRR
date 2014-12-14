/*
* Transform an Array to a String without blank or space
*/
function flatArray(col){
	var text = "";
	for	(var index = 0; index < col.length; index++) {
	   text += col[index];
	} 
	return text;
}

/**
 * Add the selection to the JSON propositin
 */
function selectRobot(color){
	var jsonProposition = $("#jsonProposition");
	var selectedRobot = $("#selectedRobot");
	
	// add the select to the json string 
	if(jsonProposition.val().length > 0){
		jsonProposition.val(jsonProposition.val()+',');
	}
	jsonProposition.val(jsonProposition.val()+"{command: 'select' , robot: "+color+"}");
	
	// Update the display of the selected robot
	switch (color) {
	   case 'red':
		   selectedRobot.text("Rouge");
		   selectedRobot.css({ 'color': 'red', 'font-size': '150%' });
	      break;
	   case 'blue':
		   selectedRobot.text("Bleu");
		   selectedRobot.css({ 'color': 'blue', 'font-size': '150%' });
		   break;
	   case 'green':
		   selectedRobot.text("Vert");
		   selectedRobot.css({ 'color': 'green', 'font-size': '150%' });
		   break;
	   case 'yellow':
		   selectedRobot.text("Jaune");
		   selectedRobot.css({ 'color': 'yellow', 'font-size': '150%' });
		   break;
	}
}

function addMovement(lineDestination, columnDestination){
	var jsonProposition = $("#jsonProposition");
	if($("#selectedRobot").text().length === 0){
		alert("SELECTIONNE UN ROBOT WESH !!!.");
	} else{
		jsonProposition.val(jsonProposition.val()+" , {command: 'move' , line: "+lineDestination+", column: "+columnDestination+"}");
	}
}