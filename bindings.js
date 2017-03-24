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

	$("#uicanvas").on("click", function(e){
		var rect = this.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
		if(placingGravs === true){
			var strength = ($(".gravity-well-strength").val() * .05);
			centersOfGravity.push(new gravityCenter(x,y, strength))
		}else{
	    startX = x;
	    startY = y;
	    // applyImpulse(x, y);
	  }
	})

	$("#uicanvas").on("mouseenter", function(e){
		console.log("mouseenter")
		if(placingGravs){
			var rect = this.getBoundingClientRect();
	    var x = e.clientX - rect.left;
	    var y = e.clientY - rect.top;
	    var strength = ($(".gravity-well-strength").val() * .05);
			unplacedGrav = new UnplacedGrav(x,y, strength);
			unplacedGrav.draw()
			drawUnplacedGrav = true;
		}
	})
	$("#uicanvas").on("mousemove", function(e){
		console.log("mousemove")
		if(placingGravs){
			var rect = this.getBoundingClientRect();
	    var x = e.clientX - rect.left;
	    var y = e.clientY - rect.top;
	    var strength = ($(".gravity-well-strength").val() * .05);
			unplacedGrav.x = x;
			unplacedGrav.y = y;
			unplacedGrav.strength = strength;
		}		
	})

	$("#uicanvas").on("mouseleave", function(e){

		drawUnplacedGrav = false;
		unplacedGrav = null;
	})



	// Not Working Yet
	$(window).on("scroll", function(event){
		// event.preventDefault()
		console.log("SCROLLING")
		if(placingGravs){
			var currentVal = $(".gravity-well-strength").val();
			$(".gravity-well-strength").val(currentVal + 1)
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

	$(".border-toggle").change(function(){
		borderOn = !borderOn;
	})

	backgroundPicker.on("move.spectrum", function(e, color) {
		var backgroundChoice = color.toRgbString().split("");
		backgroundChoice.splice(3,0,"a")
		backgroundChoice.splice(-1,1,", 0.1)")
		backgroundColor = backgroundChoice.join("");
		// backgroundColor = ["rgba(", color._r.toFixed() + ", ", + color._g.toFixed() + ", ", + color._b.toFixed() + ", ", + "0.1", ")"]
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

	fade = $("#fade").val()  //(Math.abs($("#fade").val()) * .01).toString();
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
