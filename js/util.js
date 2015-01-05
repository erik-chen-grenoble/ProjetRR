/*
 * Transform an Array to a String without blank or space
 */
function flatArray(col) {
	var text = "";
	for (var index = 0; index < col.length; index++) {
		text += col[index];
	}
	return text;
}

/**
 * Add the selection to the JSON propositin
 */
function selectRobot(color, line, column) {
	var jsonProposition = $("#jsonProposition");
	var selectedRobot = $("#selectedRobot");

	// add the select to the json string
	if (jsonProposition.val().length > 0) {
		jsonProposition.val(jsonProposition.val() + ',');
	}
	jsonProposition.val(jsonProposition.val()
			+ '{"command": "select" , "robot": \"' + color + '\"}');

	// Update the display of the selected robot
	$('#moveState').text("");
	$('#selectedRobotLine').val(line);
	$('#selectedRobotColumn').val(column);
	switch (color) {
	case 'red':
		selectedRobot.text("red");
		selectedRobot.css({
			'color' : 'red',
			'font-size' : '150%'
		});
		break;
	case 'blue':
		selectedRobot.text("blue");
		selectedRobot.css({
			'color' : 'blue',
			'font-size' : '150%'
		});
		break;
	case 'green':
		selectedRobot.text("green");
		selectedRobot.css({
			'color' : 'green',
			'font-size' : '150%'
		});
		break;
	case 'yellow':
		selectedRobot.text("yellow");
		selectedRobot.css({
			'color' : 'yellow',
			'font-size' : '150%'
		});
		break;
	}
}

/**
 * Add the movement to the proposition json string.
 *  
 * @param lineDestination
 *            the destination line.
 * @param columnDestination
 *            the destination column.
 */
function addMovement(lineDestination, columnDestination) {
    if(!endGameOrNot()){
        var jsonProposition = $("#jsonProposition");
        if ($("#selectedRobot").text().length === 0) {
            document.getElementById('moveState').innerHTML = "Vous devez d'abord sélectionner un robot.";
        } else {
            // Update the robot position
            updateRobotPosition(lineDestination, columnDestination);
            // Update the number of move
            $("#nombreCoups").val(parseInt($("#nombreCoups").val())+1);
            var nbCoups = $("#nombreCoups").val();
            $(".zone-nb-coups").text(nbCoups);

            // Add the movement to the json string
            jsonProposition.val(jsonProposition.val()
                    + ' , {"command": "move" , "line": ' + lineDestination
                    + ', "column": ' + columnDestination + '}');
        }
    }
}

/**
 * Update the robot position on the screen.
 * 
 * @param lineDestination
 *            the destination line.
 * @param columnDestination
 *            the destination column.
 */
function updateRobotPosition(lineDestination, columnDestination) {
	// Get the selected robot information
	var line = $("#selectedRobotLine").val();
	var column = $("#selectedRobotColumn").val();
	var selectedRobotColor = $("#selectedRobot").text();
	var tdOrigin = $(".ligne"+line).find(".ligne" + line + " .colonne" + column);
	var tdDestination = $(".ligne"+lineDestination).find(".ligne" + lineDestination + " .colonne" + columnDestination);
	var targetColor = $("#targetColor").val();
	var tdDestinationTarget = tdDestination.find(".target_"+targetColor);
	
	// If the robot is on the target
	if(tdDestinationTarget.length > 0){
		// TODO robot on target. Disable click ?
		tdDestinationTarget.remove();
	}
	
	// Create the destination div
	var $newdiv1 = $("<div class=\"robot_" + selectedRobotColor
			+ "\" onclick=\"selectRobot('" + selectedRobotColor + "',"
			+ lineDestination + "," + columnDestination + ")\"></div>");
	// Remove the robot his current place
	tdOrigin.attr("onclick","addMovement('"+line+"','"+column+"')");
	$(".robot_"+selectedRobotColor+"").remove();
	// Add the robot to the new place
	tdDestination.append($newdiv1);
	tdDestination.attr('onclick','').unbind('click');
	
	// Update the position of the robot
	$("#selectedRobotLine").val(lineDestination);
	$("#selectedRobotColumn").val(columnDestination);
}
