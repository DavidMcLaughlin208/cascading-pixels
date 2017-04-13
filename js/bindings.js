$(document).ready(function(){
	// reset();
	clearInterval(gameLoop);
	clearInterval(fadeLoop);

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
	infinite = true;
	spread = $("#spread").val();
	infiniteLoop = setInterval(addBall, spread);


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
			if($(".gravity-well-static").is(":checked")){
				// var absorb = $(".gravity-well-absorb").is(":checked");
				centersOfGravity.push(new gravityCenter(x,y, strength))
			}else{
				centersOfGravity.push(new MoveableGravityCenter(x,y,strength))	
			}
		} else if(placingClusters){
			var density = 10 - parseInt($(".cluster-density").val());
			uiElement.execute(density, 5, 5);
		}else if(placingSpawn){
	    startX = x;
	    startY = y;
	    // applyImpulse(x, y);
	  }else if(placingObstacles){
	  	var size = parseInt($(".obstacle-size").val());
	  	obstaclesCircles.push(new ObstacleCircle(x,y,size))
	  }
	})

	$("#uicanvas").on("mouseenter", function(e){
		var rect = this.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
		if(placingGravs){
	    var strength = ($(".gravity-well-strength").val() * .05);
			uiElement = new UnplacedGrav(x,y, strength);
			uiElement.draw()
			drawUiElement = true;
		} else if(placingClusters) {
			var size = parseInt($(".cluster-size").val());
			uiElement = new UnplacedCluster(x,y,size);
			uiElement.draw();
			drawUiElement = true;
		} else if(placingObstacles) {
			var size = parseInt($(".obstacle-size").val());
			uiElement = new UnplacedObstacleCircle(x,y,size)
			uiElement.draw()
			drawUiElement = true;
		}
	})
	$("#uicanvas").on("mousemove", function(e){
		var rect = this.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
		if(placingGravs){
	    var strength = ($(".gravity-well-strength").val() * .05);
			uiElement.x = x;
			uiElement.y = y;
			uiElement.strength = strength;
		} else if(placingClusters) {
			var size = (parseInt($(".cluster-size").val()));
			uiElement.x = x;
			uiElement.y = y;
			uiElement.size = size;
		} else if(placingObstacles) {
			var size = parseInt($(".obstacle-size").val());
			uiElement.x = x;
			uiElement.y = y;
			uiElement.size = size;
		}
	})

	$("#uicanvas").on("mouseleave", function(e){
		ui.ctx.clearRect(0,0,ui.width, ui.height)
		drawUiElement = false;
		uiElement = null;
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

	$("#gravity-settings").on("click", function(event){
		event.preventDefault();
		clearTools();
		hideAllSettings();
		$(".gravity-settings").addClass("visible")
		placingGravs = true;

	})

	$(".clear-gravity-wells").on("click", function(event){
		event.preventDefault();
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

	$(".disable-gravity").on("change", function(event){
		event.preventDefault();
		gravity = 0;
		noGravity = !noGravity;
	})

	$(".border-toggle").change(function(){
		borderOn = !borderOn;
	})

	backgroundPicker.on("move.spectrum", function(e, color) {
		backgroundColor = parseBackgroundColor(color)
		// var backgroundChoice = color.toRgbString().split("");
		// backgroundChoice.splice(3,0,"a")
		// backgroundChoice.splice(-1,1,", 0.1)")
		// backgroundColor = backgroundChoice.join("");
		// backgroundColor = ["rgba(", color._r.toFixed() + ", ", + color._g.toFixed() + ", ", + color._b.toFixed() + ", ", + "0.1", ")"]
	})

	ballMinPicker.on("move.spectrum", function(e, color) {
		minColor = "#" + color.toHex()
	})

	ballMaxPicker.on("move.spectrum", function(e, color) {
		maxColor = "#" + color.toHex()
	})


	$(window).on("resize", function(){
		resizeCanvas();
	})

	// $(".gravity-well-strength").on('input propertychange paste', function() {
 //  	if(parseInt($(this).val()) > 10){ $(this).val(10) }  
 //  	if(parseInt($(this).val()) < 1 ){ $(this).val(1) }  
	// });

	$("#cluster-holder").on("click", function(event){
		event.preventDefault();
		clearTools();
		hideAllSettings();
		$(".cluster-holder").addClass("visible")
		placingClusters = true;
	})

	$(".tool").on("click", function(){
		$(".tool").removeClass("active-tool")
		$(this).addClass("active-tool")
	})

	$("#spawn-settings").on("click", function(event){
		event.preventDefault();
		clearTools();
		hideAllSettings();
		$(".spawn-settings").addClass("visible")
		placingSpawn = true;
	})

	$("#color-schema").on("click", function(){
		event.preventDefault();
		clearTools();
		hideAllSettings();
		$(".color-schema").addClass("visible")
	})

	$(".preset-launch").on("click", function(){
		clearCanvas();
		preset1()
		var preset = $(".preset-select").val();
		console.log(preset)
	})

	$("input[type=range]").on("change", function(){
		updateSettings();
	})

	$("#spread").on("change", function(){
		updateSettings();
		if(infinite){
			clearInterval(infiniteLoop);
			infiniteLoop = setInterval(addBall, spread);
		}
	})

	$("#obstacles-holder").on("click", function(){
		clearTools();
		hideAllSettings();
		$(".obstacles-holder").addClass("visible");
		placingObstacles = true;
	})

	$(".clear-obstacle-circles").on("click", function(){
		obstaclesCircles = []
	})


})

var getSliderValues = function(){
	gravityModifier = $("#gravity").val();
	dragModifier = $("#drag").val();
	forceXModifier = $("#forceX").val();
	forceYModifier = $("#forceY").val();
	thicknessModifier = $("#thickness").val();
	spread = $("#spread").val();


	fade = $("#fade").val()  //(Math.abs($("#fade").val()) * .01).toString();
	dampX = 1 - ($("#dampX").val() * .01);
	dampY = -1 - ($("#dampY").val() * -.01);
	variation = $("#variation").val() * .01;
	lifetime = parseInt($("#lifetime").val());
	forceX = forceXModifier/12.5;
	forceY = forceYModifier/12.5;
	drag = dragModifier/15 * .001;
	thickness = thicknessModifier;

	if(!noGravity){gravity = gravityModifier/25 * 0.04};
}

var updateSettings = function(){
	clearInterval(fadeLoop);
	// reset();
	getSliderValues();
	fadeLoop = setInterval(fadeOut, fade);
}

var addBall = function(){
	// updateSettings();
	var ball = new Ball(forceX, forceY)
	balls.push(ball);
}



var clearTools = function(){
	placingSpawn = false;
	placingClusters = false;
	placingGravs = false;
	placingObstacles = false;
}

var hideAllSettings = function(){
	$(".settings").removeClass("visible")
}
