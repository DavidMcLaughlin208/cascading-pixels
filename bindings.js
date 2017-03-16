$(document).ready(function(){
	reset();
	clearInterval(gameLoop);
	clearInterval(fadeLoop);

	getSliderValues();
	start();

	// $(".start").on("click", function(event){
	// 	event.preventDefault();
	// 	reset();
	// 	clearInterval(gameLoop);
	// 	clearInterval(fadeLoop);

	// 	getSliderValues();
	// 	start();
	// });

	$(".add-ball").on("click", function(event){
		event.preventDefault();
		updateSettings();
		addBall();
	})

	$(".update-settings").on("click", function(event){
		event.preventDefault();
		updateSettings();
	})

	$(".clear").on('click', function(event){
		event.preventDefault();
		reset();
		balls = [];
	})

	$(".quick-add").on("click", function(event){
		event.preventDefault();
		updateSettings();
		var times = parseInt($(this).attr("balls"));
		var spread = $("#spread").val();
		for(var i = 0; i < times;i++){
			setTimeout(function(){balls.push(new Ball(forceX, forceY))}, spread*i);
		}
	})

	$(".infinite").on("click", function(event){
		event.preventDefault();
		updateSettings();
		clearInterval(infiniteLoop);
		var spread = $("#spread").val();
		infiniteLoop = setInterval(addBall, spread);
	})

	$(".stop-infinite").on("click", function(event){
		event.preventDefault();
		clearInterval(infiniteLoop);
	})

	$("#mycanvas").on("click", function(e){
		var rect = this.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
		if(placingGravs === true){
			centersOfGravity.push(new gravityCenter(x,y))
		}else{
	    startX = x;
	    startY = y;
	    // applyImpulse(x, y);
	  }
	})

	$(".center-gravity").on("click", function(event){
		event.preventDefault();
		centerGravity = true;
		placingGravs = !placingGravs;
		// gravity = 0;
	})

	$(".center-gravity-off").on("click", function(event){
		event.preventDefault();
		centerGravity = false;
		centersOfGravity = [];
	})

})

var getSliderValues = function(){
	gravityModifier = $("#gravity").val();
	dragModifier = $("#drag").val();
	forceXModifier = $("#forceX").val();
	forceYModifier = $("#forceY").val();
	thicknessModifier = $("#thickness").val();

	fade = $("#fade").val();
	dampX = 1 - ($("#dampX").val() * .01);
	dampY = -1 - ($("#dampY").val() * -.01);
	variation = $("#variation").val() * .01;

	drag *= dragModifier/15;
	forceX *= forceXModifier/25;
	forceY *= forceYModifier/25;
	gravity *= gravityModifier/25;
	thickness *= thicknessModifier;

}

var updateSettings = function(){
	clearInterval(fadeLoop);
	reset();
	getSliderValues();
	fadeLoop = setInterval(fadeOut, fade);
}

var addBall = function(){
	updateSettings();
	balls.push(new Ball(forceX, forceY));
}

// var addGravityBall = function(){
// 	updateSettings();
// 	balls.push(new Ball(2, cv.width/2, cv.height/2-200))
// }
