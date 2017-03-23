var gravity;
var gameLoop;
var fadeLoop;
var fade;
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
var maxColor = "#ff0000";
var minColor = "#0000ff";
var backgroundColor = "rgba(214,214,214,0.1)";

cv.ctx.canvas.width = cv.width;
cv.ctx.canvas.height = cv.height;
cv.ctx.lineWidth = 5;
cv.ctx.fillStyle = 'lightgrey';
cv.ctx.fillRect(0,0,cv.width,cv.height);
cv.ctx.fillStyle = 'black';

var reset = function(){
	cv.ctx.beginPath();
	cv.ctx.moveTo(10,10);
	if(!noGravity){gravity = .04};
	forceX = 2;
	forceY = 2;
	drag = .001;
	thickness = 1;
}

var draw = function(){
	if(noGravity){
	}else{
		gravity = .04;
		gravityModifier = $("#gravity").val();
		gravity *= gravityModifier/25;
	}
	for(var i in balls){
		balls[i].draw();
	}
	if(showGravs){
		for(var i in centersOfGravity){
			centersOfGravity[i].draw();
		}
	}
}

function fadeOut() {
  cv.ctx.fillStyle = backgroundColor;
  cv.ctx.fillRect(0, 0, cv.width, cv.height);
}

var start = function(){
	cv.ctx.clearRect(0, 0, cv.width, cv.height);
	cv.ctx.fillStyle = 'lightgrey';
	cv.ctx.fillRect(0, 0, cv.width, cv.height);
	cv.ctx.fillStyle = 'black';

	cv.ctx.beginPath();
	cv.ctx.moveTo(10,10);

	fadeLoop = setInterval(fadeOut, fade);
	gameLoop = setInterval(draw, 1);
}
