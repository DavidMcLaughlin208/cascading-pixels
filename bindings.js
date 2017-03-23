$(document).ready(function(){
	reset();
	clearInterval(gameLoop);
	clearInterval(fadeLoop);
	var infinite = false;
	var backgroundPicker = $("#background-color-picker").spectrum({
														preferredFormat: "rgb",
														showInput: true,
														showButtons: false,
														color: "#000000"
													})

	var ballMaxPicker = $("#ball-max-color").spectrum({
														preferredFormat: "hex",
														showInput: true,
														showButtons: false,
														color: "#000000"
													})

	var ballMinPicker = $("#ball-min-color").spectrum({
														preferredFormat: "hex",
														showInput: true,
														showButtons: false,
														color: "#000000"
													})

	getSliderValues();
	start();

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
		infinite = !infinite;
		updateSettings();
		clearInterval(infiniteLoop);
		if(infinite){
			var spread = $("#spread").val();
			infiniteLoop = setInterval(addBall, spread);
			$(".infinite").html("Infinite Flow (on)")
		} else {
			$(".infinite").html("Infinite Flow (off)")
		}
	})

	// $(".stop-infinite").on("click", function(event){
	// 	event.preventDefault();
	// 	clearInterval(infiniteLoop);
	// })

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

	$(".place-gravity-wells").on("click", function(event){
		event.preventDefault();
		placingGravs = !placingGravs;
		if($(this).html() === "Place Gravity Wells"){
			$(this).html("Stop Placing Gravity Wells")
		} else {
			$(this).html("Place Gravity Wells")
		}
	})

	$(".clear-gravity-wells").on("click", function(event){
		event.preventDefault();
		// centerGravity = false;
		centersOfGravity = [];
	})

	$(".hide-gravs").on("click", function(event){
		event.preventDefault();
		showGravs = !showGravs
		if($(this).html() === "Hide Gravity Wells"){
			$(this).html("Show Gravity Wells")
		}else{
			$(this).html("Hide Gravity Wells")
		}
	})

	$(".disable-gravity").on("click", function(event){
		event.preventDefault();
		if(gravity > 0){
			noGravity = true;
			gravity = 0;
			$(this).html("Enable Gravity");
		}else{
			noGravity = false;
			updateSettings();
			$(this).html("Disable Gravity");
		}
	})

	backgroundPicker.on("move.spectrum", function(e, color) {
		backgroundColor = ["rgba(", color._r.toFixed() + ", ", + color._g.toFixed() + ", ", + color._b.toFixed() + ", ", + "0.1", ")"]
	})

	ballMinPicker.on("move.spectrum", function(e, color) {
		minColor = "#" + color.toHex()
	})

	ballMaxPicker.on("move.spectrum", function(e, color) {
		maxColor = "#" + color.toHex()
	})


})

var getSliderValues = function(){
	gravityModifier = $("#gravity").val();
	dragModifier = $("#drag").val();
	forceXModifier = $("#forceX").val();
	forceYModifier = $("#forceY").val();
	thicknessModifier = $("#thickness").val();

	fade = (Math.abs($("#fade").val()) * .01).toString();
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
