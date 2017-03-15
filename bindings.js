$(document).ready(function(){
	reset();

	$(".start").on("click", function(event){
		event.preventDefault();
		reset();
		clearInterval(gameLoop);
		clearInterval(fadeLoop);

		getSliderValues();
		start();
	});

	$(".add-ball").on("click", function(event){
		event.preventDefault();
		clearInterval(fadeLoop);
		getSliderValues();
		fadeLoop = setInterval(fadeOut, fade);

		balls.push(new Ball);
	})


})

var getSliderValues = function(){
	gravityModifier = $("#gravity").val();
	dragModifier = $("#drag").val();
	forceModifier = $("#force").val();
	fade = $("#fade").val();

	drag *= dragModifier/15;
	force *= forceModifier/25;
	gravity *= gravityModifier/25;


}
