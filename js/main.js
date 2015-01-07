$(document).ready(function () {
	// initialisation des tooltips
	$(function () {
	  $('[data-toggle="tooltip"]').tooltip()
	})		

	var augmentation = 2;
	var tailleMax = 24;
	var tailleMin= 10;

	$('#agrandir').click(function () {
		$('.texte_SC').each(function(){
			// récupération de la taille actuelle
			var taille = parseInt($( this ).css( "font-size" ));
			taille += augmentation;
			if (taille >= tailleMax){
				taille = tailleMax;
			}
			$( this ).stop().animate({
				fontSize: taille+"px"
			},1);
		});
	});
	
	$('#diminuer').click(function () {
		$('.texte_SC').each(function(){
			// récupération de la taille actuelle
			var taille = parseInt($( this ).css( "font-size" ));
			taille -= augmentation;
			if (taille <= tailleMin){
				taille = tailleMin;
			}
			$( this ).stop().animate({
				fontSize: taille+"px"
			},1);
		});
	});
	
	$('#login2').keyup(function (){
		var value = $('#login2').val();
		$('#newForm input[name="login"]').each( function () {
			$( this ).val(value);
		});
	});
	
});