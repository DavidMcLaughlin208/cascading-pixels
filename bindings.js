$(document).ready(function(){
	reset();

	$(".start").on("click", function(event){
		event.preventDefault();
		reset();
		clearInterval(gameLoop);
		gravityModifier = $("#gravity").val();
		dragModifier = $("#drag").val();
		forceModifier = $("#force").val();

		drag *= dragModifier/15;
		gravity *= gravityModifier/25;
		force *= forceModifier/25;

		start();
	})
})