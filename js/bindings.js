$(document).ready(function(){
	// reset();
	// clearInterval(cm.gameLoop);
	// clearInterval(cm.fadeLoop);

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

	// getSliderValues();
	// cm.start();
	// cm.infinite = true;
	// cm.spread = $("#spread").val();
	// cm.infiniteLoop = setInterval(addBall, spread);

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
		cm.balls = [];
	})

	$(".quick-add").on("click", function(event){
		event.preventDefault();
		updateSettings();
		var times = parseInt($(this).attr("balls"));
		var spread = $("#spread").val();
		for(var i = 0; i < times;i++){
			setTimeout(function(){cm.balls.push(new Ball(cm.forceX, cm.forceY))}, spread*i);
		}
	})

	$(".infinite").on("click", function(event){
		event.preventDefault();
		cm.infinite = !cm.infinite;
		updateSettings();
		clearInterval(cm.infiniteLoop);
		if(cm.infinite){
			var spread = $("#spread").val();
			cm.infiniteLoop = setInterval(addBall, cm.spread);
			$(".infinite").html("Infinite Flow (on)")
		} else {
			$(".infinite").html("Infinite Flow (off)")
		}
	})

	$("#uicanvas").on("click", function(e){
		var rect = this.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
		if(cm.placingGravs === true){
			var strength = ($(".gravity-well-strength").val() * .05);
			if($(".gravity-well-static").is(":checked")){
				// var absorb = $(".gravity-well-absorb").is(":checked");
				cm.centersOfGravity.push(new gravityCenter(x,y, strength))
			}else{
				cm.centersOfGravity.push(new MoveableGravityCenter(x,y,strength))	
			}
		} else if(cm.placingClusters){
			var density = 10 - parseInt($(".cluster-density").val());
			cm.uiElement.execute(density, 5, 5);
		}else if(placingSpawn){
	    cm.startX = x;
	    cm.startY = y;
	    // applyImpulse(x, y);
	  }else if(cm.placingObstacles){
	  	var size = parseInt($(".obstacle-size").val());
	  	cm.obstaclesCircles.push(new ObstacleCircle(x,y,size))
	  }
	})

	$("#uicanvas").on("mouseenter", function(e){
		var rect = this.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
		if(cm.placingGravs){
	    var strength = ($(".gravity-well-strength").val() * .05);
			cm.uiElement = new UnplacedGrav(x,y, strength);
			cm.uiElement.draw()
			cm.drawUiElement = true;
		} else if(cm.placingClusters) {
			var size = parseInt($(".cluster-size").val());
			cm.uiElement = new UnplacedCluster(x,y,size);
			cm.uiElement.draw();
			cm.drawUiElement = true;
		} else if(cm.placingObstacles) {
			var size = parseInt($(".obstacle-size").val());
			cm.uiElement = new UnplacedObstacleCircle(x,y,size)
			cm.uiElement.draw()
			cm.drawUiElement = true;
		}
	})
	$("#uicanvas").on("mousemove", function(e){
		var rect = this.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
		if(cm.placingGravs){
	    var strength = ($(".gravity-well-strength").val() * .05);
			cm.uiElement.x = x;
			cm.uiElement.y = y;
			cm.uiElement.strength = strength;
		} else if(cm.placingClusters) {
			var size = (parseInt($(".cluster-size").val()));
			cm.uiElement.x = x;
			cm.uiElement.y = y;
			cm.uiElement.size = size;
		} else if(cm.placingObstacles) {
			var size = parseInt($(".obstacle-size").val());
			cm.uiElement.x = x;
			cm.uiElement.y = y;
			cm.uiElement.size = size;
		}
	})

	$("#uicanvas").on("mouseleave", function(e){
		cm.ui.ctx.clearRect(0,0,cm.canvasWidth, cm.canvasHeight)
		cm.drawUiElement = false;
		cm.uiElement = null;
	})



	// Not Working Yet
	$(window).on("scroll", function(event){
		// event.preventDefault()
		console.log("SCROLLING")
		if(cm.placingGravs){
			var currentVal = $(".gravity-well-strength").val();
			$(".gravity-well-strength").val(currentVal + 1)
		}
	})

	$("#gravity-settings").on("click", function(event){
		event.preventDefault();
		clearTools();
		hideAllSettings();
		$(".gravity-settings").addClass("visible")
		cm.placingGravs = true;

	})

	$(".clear-gravity-wells").on("click", function(event){
		event.preventDefault();
		cm.centersOfGravity = [];
	})

	$(".hide-gravs").on("click", function(event){
		event.preventDefault();
		cm.showGravs = !cm.showGravs
		if($(this).html() === "Hide Gravity Wells"){
			$(this).html("Show Gravity Wells")
		}else{
			$(this).html("Hide Gravity Wells")
		}
	})

	$(".disable-gravity").on("change", function(event){
		event.preventDefault();
		cm.gravity = 0;
		cm.noGravity = !cm.noGravity;
	})

	$(".border-toggle").change(function(){
		cm.borderOn = !cm.borderOn;
	})

	backgroundPicker.on("move.spectrum", function(e, color) {
		cm.backgroundColor = parseBackgroundColor(color)
		// var backgroundChoice = color.toRgbString().split("");
		// backgroundChoice.splice(3,0,"a")
		// backgroundChoice.splice(-1,1,", 0.1)")
		// backgroundColor = backgroundChoice.join("");
		// backgroundColor = ["rgba(", color._r.toFixed() + ", ", + color._g.toFixed() + ", ", + color._b.toFixed() + ", ", + "0.1", ")"]
	})

	ballMinPicker.on("move.spectrum", function(e, color) {
		cm.minColor = "#" + color.toHex()
	})

	ballMaxPicker.on("move.spectrum", function(e, color) {
		cm.maxColor = "#" + color.toHex()
	})


	$(window).on("resize", function(){
		cm.resizeCanvas();
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
		cm.placingClusters = true;
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
		cm.placingSpawn = true;
	})

	$("#color-schema").on("click", function(event){
		event.preventDefault();
		clearTools();
		hideAllSettings();
		$(".color-schema").addClass("visible")
	})

	$(".preset-launch").on("click", function(){
		clearCanvas();
		var presetNum = $(".preset-select").val();
		window['preset' + presetNum]()
	})

	$("input[type=range], input[type=checkbox]").on("change", function(){
		updateSettings();
	})
	
	$("input[type=checkbox]").on("change", function(){
		updateSettings()
	})

	$("#spread").on("change", function(){
		updateSettings();
		if(cm.infinite){
			clearInterval(cm.infiniteLoop);
			cm.infiniteLoop = setInterval(addBall, spread);
		}
	})

	$("#obstacles-holder").on("click", function(){
		clearTools();
		hideAllSettings();
		$(".obstacles-holder").addClass("visible");
		cm.placingObstacles = true;
	})

	$(".clear-obstacle-circles").on("click", function(){
		cm.obstaclesCircles = []
	})
	
	$(".disable-fade").on("change", function(event){
		event.preventDefault();
		cm.noFade = !cm.noFade;
		if(cm.noFade){clearInterval(cm.fadeLoop)}
		updateSettings()
	})

	$(".reset").on("click", function(event){
		event.preventDefault();
		clearCanvas();
	})


})

var getSliderValues = function(){
	var gravityModifier = $("#gravity").val();
	var dragModifier = $("#drag").val();
	var forceXModifier = $("#forceX").val();
	var forceYModifier = $("#forceY").val();
	var thicknessModifier = $("#thickness").val();
	cm.spread = $("#spread").val();


	cm.fade = (Math.abs($("#fade").val()) * .01).toString();
	cm.dampX = 1 - ($("#dampX").val() * .01);
	cm.dampY = -1 - ($("#dampY").val() * -.01);
	cm.variation = $("#variation").val() * .01;
	cm.lifetime = parseInt($("#lifetime").val());
	cm.forceX = forceXModifier/12.5;
	cm.forceY = forceYModifier/12.5;
	cm.drag = dragModifier/15 * .001;
	cm.thickness = thicknessModifier;

	if(!cm.noGravity){cm.gravity = gravityModifier/25 * 0.04;}
}

var updateSettings = function(){
	clearInterval(cm.fadeLoop);
	// reset();
	getSliderValues();
	// if(!noFade){fadeLoop = setInterval(fadeOut, fade)};
}

var addBall = function(){
	// updateSettings();
	var ball = new Ball(cm.forceX, cm.forceY)
	cm.balls.push(ball);
}



var clearTools = function(){
	cm.placingSpawn = false;
	cm.placingClusters = false;
	cm.placingGravs = false;
	cm.placingObstacles = false;
}

var hideAllSettings = function(){
	$(".settings").removeClass("visible")
}
