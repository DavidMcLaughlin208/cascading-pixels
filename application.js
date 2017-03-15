var gravity;
var gameLoop;
var fadeLoop;
var fade;
var balls = [];

var reset = function(){
	cv.ctx.beginPath();
	cv.ctx.moveTo(10,10);
	gravity = .04;
	force = 2;
	drag = .001;
}



cv.ctx.fillStyle = 'lightgrey';
cv.ctx.fillRect(0,0,cv.width,cv.height);
cv.ctx.fillStyle = 'black';

var draw = function(){
	gravity = .04;
	gravityModifier = $("#gravity").val();
	gravity *= gravityModifier/25;
	for(var i in balls){
		balls[i].draw();
	}
}

function fadeOut() {
  cv.ctx.fillStyle = "rgba(214,214,214,0.1)";
  cv.ctx.fillRect(0, 0, cv.width, cv.height);
}

var start = function(){
	cv.ctx.clearRect(0, 0, cv.width, cv.height);
	cv.ctx.fillStyle = 'lightgrey';
	cv.ctx.fillRect(0,0,cv.width,cv.height);
	cv.ctx.fillStyle = 'black';

	cv.ctx.beginPath();
	cv.ctx.moveTo(10,10);

	fadeLoop = setInterval(fadeOut, fade);
	gameLoop = setInterval(draw, 5);
}
