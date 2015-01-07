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
		//selectedRobot.text(color);
		/*selectedRobot.css({
			'color' : color,
			'font-size' : '150%'
		});*/
		
	refreshBoardColor();
	// Update board movement possibilities
	updatePossibilities(color,line,column);
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
        } else if(isValidMove(lineDestination,columnDestination)){
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
            
            // Check if the robot is in the target
            if(isRobotOnTarget(lineDestination,columnDestination)){
            	// End the game
            	document.getElementById('moveState').innerHTML = "Vous pouvez proposer cette solution !";
            }
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
	var lineT = $("lineTarget").val();
	var columnT = $("columnTarget").val();
	
	$("td div").show();
	// If the robot is on the target
	if(tdDestinationTarget.length > 0){
		tdDestinationTarget.hide();
	} else{
		
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
	
	refreshBoardColor();

	updatePossibilities(selectedRobotColor,lineDestination,columnDestination);

}

/**
 * Check if the good robot is on the target.
 * @param lineDestination the destination line.
 * @param columnDestination the destination column.
 * @returns {Boolean}
 */
function isRobotOnTarget(lineDestination,columnDestination){
	var targetColor = $("#targetColor").val();
	var lineTarget = $("#lineTarget").val();
	var columnTarget = $("#columnTarget").val();
	var robotPosition = $(".ligne"+lineDestination).find(".ligne" + lineDestination + " .colonne" + columnDestination);
	var selectedRobotColor = $("#selectedRobot").text();
	
	if(robotPosition != null && lineTarget==lineDestination && columnTarget==columnDestination && targetColor == selectedRobotColor){
		return true;
	}
	return false;
	
}

/**
 * Check if the destination of the robot is valid.
 * @param lineTo the destination line.
 * @param columnTo the destination column.
 * @returns {Boolean}
 */
function isValidMove(lineTo, columnTo){
	var currentTd = $(".ligne"+lineTo).find(".ligne" + lineTo + " .colonne" + columnTo);
	if(currentTd.hasClass("clickable")){
		return true;
	} 
	return false;
}

/**
 * Update the board color.
 * @param color the selected robot color.
 * @param line the current line of the robot.
 * @param column the current column of the robot.
 */
function updatePossibilities(color,line,column){
	var lineOrigin = $("#selectedRobotLine").val();
	var columnOrigin = $("#selectedRobotColumn").val();
	var robotPosition = $(".ligne"+line).find(".ligne" + line + " .colonne" + column);
	var currentLine = $("tr.ligne"+lineOrigin).find("td");
	var currentColumn = $("td.colonne"+columnOrigin);
	var targetColor = $("#targetColor").val();
	line = parseInt(line);
	column = parseInt(column);
	if(currentLine != null){
		// check left to right
		for (var i = column; i < currentLine.length; i++) {
			var currentTd = $(".ligne"+line).find(".ligne" + line + " .colonne" + i);
			var nextTd = $(".ligne"+line).find(".ligne" + line + " .colonne" + (i+1));
			if(column != i && currentTd != null && currentTd.find("div").length > 0 && !currentTd.find("div").hasClass("target_"+targetColor)){
				break;
			}
			if(currentTd != null && (currentTd.hasClass("bord_droit") || currentTd.hasClass("angle_bas_droit") || currentTd.hasClass("angle_haut_droit"))){
				if(column != i) {
					setClassColor(color, currentTd,true);
				}
				break;
			} else if (nextTd != null && nextTd.hasClass("bord_gauche") || nextTd.hasClass("angle_bas_gauche") || (nextTd.find("div").length > 0 && !nextTd.find("div").hasClass("target_"+targetColor))){
				if(column != i) {
					setClassColor(color, currentTd,true);
				}
				break;
			} else{
					setClassColor(color, currentTd,false);
			}
		}
		
		// check right to left
		for (var i = column; i >= 0; i--) {
			var currentTd = $(".ligne"+line).find(".ligne" + line + " .colonne" + i);
			var nextTd = $(".ligne"+line).find(".ligne" + line + " .colonne" + (i-1));
			if(column != i && currentTd != null && currentTd.find("div").length > 0 && !currentTd.find("div").hasClass("target_"+targetColor)){
				break;
			}
			if(currentTd != null && (currentTd.hasClass("bord_gauche") || currentTd.hasClass("angle_haut_gauche") || currentTd.hasClass("angle_bas_gauche"))){
				if(column != i) {
					setClassColor(color, currentTd,true);
				}
				break;
			} else if(nextTd != null &&  nextTd.hasClass("bord_droit") || nextTd.hasClass("angle_bas_droit") ||  nextTd.hasClass("angle_haut_droit") || (nextTd.find("div").length > 0 && !nextTd.find("div").hasClass("target_"+targetColor))){
				if(column != i) {
					setClassColor(color, currentTd,true);
				}
				break;
			} else{
					setClassColor(color, currentTd,false);
			}
		}
		// check bottom to top
		for (var i = line; i >= 0; i--) {
			var currentTd = $(".ligne"+i).find(".ligne" + i + " .colonne"+column);
			var nextTd = $(".ligne"+(i-1)).find(".ligne" + (i-1) + " .colonne"+column);
			if(line != i && currentTd != null && currentTd.find("div").length > 0 && !currentTd.find("div").hasClass("target_"+targetColor)){
				break;
			}
			if(currentTd != null && (currentTd.hasClass("bord_haut") || currentTd.hasClass("angle_haut_gauche") || currentTd.hasClass("angle_haut_droit") || (currentTd.find("div") != null && currentTd.find("div").hasClass("target_"+targetColor)))){
				if(line != i){	
					setClassColor(color, currentTd,true);
				}
				break;
			} else if(nextTd != null && nextTd.hasClass("angle_bas_droit") || nextTd.hasClass("bord_bas")  || nextTd.hasClass("angle_bas_gauche") || (nextTd.find("div").length > 0 && !nextTd.find("div").hasClass("target_"+targetColor))){
				if(line != i){
					setClassColor(color, currentTd,true);
				}
				break;
			} else{
					setClassColor(color, currentTd,false);
			}
		}
		
		// check top to bottom
		for (var i = line; i < currentColumn.length; i++) {
			var currentTd = $(".ligne"+i).find(".ligne" + i + " .colonne"+column);
			var test = i+1;
			var nextTd = $(".ligne"+(i+1)).find(".ligne" + (i+1) + " .colonne"+column);

			if(line != i && currentTd != null && currentTd.find("div").length > 0 && !currentTd.find("div").hasClass("target_"+targetColor)){
				break;
			}
			if(currentTd != null && (currentTd.hasClass("bord_bas") || currentTd.hasClass("angle_bas_gauche") || currentTd.hasClass("angle_bas_droit"))){
				if(line != i){
					setClassColor(color, currentTd,true);
				}
				break;
			} else if(nextTd != null && nextTd.hasClass("bord_haut") || nextTd.hasClass("angle_haut_droit") || nextTd.hasClass("angle_haut_gauche")  || (nextTd.find("div").length > 0 && !nextTd.find("div").hasClass("target_"+targetColor))){
				if(line != i){
					setClassColor(color, currentTd,true);
				}
				break;
			} else{
					setClassColor(color, currentTd,false);
			}
		}
	}
}

/**
 * Clean the board background color.
 */
function refreshBoardColor(){
	$("#board td").removeClass("td_light_path_blue");
	$("#board td").removeClass("td_dark_path_blue");
	$("#board td").removeClass("td_light_path_red");
	$("#board td").removeClass("td_dark_path_red");
	$("#board td").removeClass("td_light_path_green");
	$("#board td").removeClass("td_dark_path_green");
	$("#board td").removeClass("td_light_path_yellow");
	$("#board td").removeClass("td_dark_path_yellow");
	$("#board td").removeClass("clickable");
}

/**
 * Add a color class to the html element.
 * @param color the class color.
 * @param td the html element.
 * @param isDarkColor true if the color is dark or not. 
 */
function setClassColor(color, td,isDarkColor){
	if(isDarkColor){
		td.addClass("td_dark_path_"+color);
		td.addClass("clickable");
	} else{
		td.addClass("td_light_path_"+color);
	}
}