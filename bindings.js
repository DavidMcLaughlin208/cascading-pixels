$(document).ready(function(){
	reset();

	$(".start").on("click", function(event){
		event.preventDefault();
		reset();
		clearInterval(gameLoop);
		clearInterval(fadeLoop);
		gravityOn = $(".gravity-switch").val();

		gravityModifier = $("#gravity").val();
		dragModifier = $("#drag").val();
		forceModifier = $("#force").val();
		fade = $("#fade").val();

		drag *= dragModifier/15;
		force *= forceModifier/25;
		if(gravity)
		gravity *= gravityModifier/25;
		start();
	});

})