var gravity;
var gameLoop;
var fadeLoop;
var fade;
var spread;
var infinite;
var balls = [];
var infiniteLoop;
var noGravity = false;
var startX = 10;
var startY = 10;
var thickness = 1;
var dampX = .75;
var dampY = -.9;
var variation = 0.5;
var centersOfGravity = [];
var placingGravs = false;
var showGravs = true;
var placingClusters = false;
var placingSpawn = true;
var maxColor = "#000000";
var minColor = "#000000";
var backgroundColor = ["rgba(", "214,", "214,", "214,", "0.1",")"] //"rgba(255,255,255,0.1)"; 
var borderOn = true;
var lifetime;
var	uiElement;
var	drawUiElement = false;
var forceX = 2;
var forceY = 2;
var obstaclesCircles = [new ObstacleCircle(50, cv.height/4, 1), new ObstacleCircle(cv.width, cv.height, 2)];
var placingObstacles = false;
var noFade = false;

cv.ctx.lineWidth = 5;
cv.ctx.fillStyle = '#ffffff';
cv.ctx.fillRect(0,0,cv.width,cv.height);
cv.ctx.fillStyle = 'black';

var draw = function(){
	if(!noFade){drawBackground()};
	// console.log(balls.length)
	// reset();
	// getSliderValues();

	// if(noGravity){
	// }else{
	// 	// gravity = .04;
	// 	// gravityModifier = $("#gravity").val();
	// 	// gravity *= gravityModifier/25;
	// }



	cv.ctx.lineWidth = thickness;
	for(var i in balls){
		balls[i].draw();
	}


	gc.ctx.clearRect(0, 0, gc.width, gc.height)

	if(showGravs){
		for(var i in centersOfGravity){
			centersOfGravity[i].draw();
		}
	}

	if(drawUiElement){
		ui.ctx.clearRect(0,0,ui.width, ui.height)
		uiElement.draw()
	}
	
	for(var i in obstaclesCircles){
		obstaclesCircles[i].draw()
	}
}

function drawBackground(){
	backgroundColor[4] = fade;
	cv.ctx.fillStyle = backgroundColor.join("");
  cv.ctx.fillRect(0, 0, cv.width, cv.height);
}

function fadeOut() {
	// backgroundColor[4] = fade;
  cv.ctx.fillStyle = backgroundColor//.join("");
  cv.ctx.fillRect(0, 0, cv.width, cv.height);
}

var start = function(){
	cv.ctx.clearRect(0, 0, cv.width, cv.height);
	cv.ctx.fillStyle = '#ffffff';
	cv.ctx.fillRect(0, 0, cv.width, cv.height);
	cv.ctx.fillStyle = 'black';

	cv.ctx.beginPath();
	cv.ctx.moveTo(10,10);
	cv.ctx.closePath();

	ui.mycanvas.width = ui.width;
	ui.mycanvas.height = ui.height;
	ui.ctx.fillStyle = "rgba(0,0,0,0)";
	ui.ctx.fillRect(0,0,ui.width,ui.height);

	resizeCanvas();

	fadeLoop = setInterval(fadeOut, fade);
	gameLoop = setInterval(draw, 1);
}
