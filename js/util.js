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