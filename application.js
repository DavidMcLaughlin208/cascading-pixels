var mycanvas = document.getElementById('mycanvas');
var ctx = mycanvas.getContext('2d');
var ball = {x:10,y:10}

var gravity;
var force;
var drag;
var speedX;
var speedY;
var gameLoop;
var lastX;
var lastY;

var reset = function(){
	lastX = 10;
	lastY = 10;
	ctx.beginPath();
	ctx.moveTo(10,10);
	gravity = .04;
	force = 2;
	drag = .001
	speedX = 0;
	speedY = 0;
}


var width = 900;
var height = 500;

ctx.fillStyle = 'lightgrey';
ctx.fillRect(0,0,width,height);
ctx.fillStyle = 'black';

var draw = function(){

	if(force != 0){
		speedX += force;
		force = 0;
	}

	if(speedX > 0){
		speedX -= drag;
	} else {
		speedX += drag;
	}
	
	speedX += force;
	speedY += gravity;

	ball.x += speedX;
	ball.y += speedY;


	if(ball.x > width){
		ball.x = width;
		speedX *= -1;
	}
	if(ball.x < 0){
		ball.x = 0
		speedX *= -1;
	}
	if(ball.y > height){
		ball.y = height;
		speedY *= -.75;
	}
	if(ball.y < 0){
		ball.y = 0;
		speedY *= -.75;
	}
	ctx.beginPath();
	ctx.fillStyle = "black";
	ctx.moveTo(lastX, lastY);
	ctx.lineTo(ball.x, ball.y);
	ctx.stroke();
	lastX = ball.x;
	lastY = ball.y;
	// ctx.arc(ball.x,ball.y,10,0*Math.PI,2*Math.PI)
	// ctx.stroke();
	// ctx.fillRect(ball.x, ball.y, 10, 10);

}

function fadeOut() {
  ctx.fillStyle = "rgba(214,214,214,0.1)";
  ctx.fillRect(0, 0, mycanvas.width, mycanvas.height);
}

var start = function(){
	ctx.clearRect(0, 0, width, height);
	ball = {x:10,y:10}
	ctx.fillStyle = 'lightgrey';
	ctx.fillRect(0,0,width,height);
	ctx.fillStyle = 'black';

	ctx.beginPath();
	ctx.moveTo(10,10);

	// ctx.lineTo(ball.x, ball.y);
	// ctx.stroke()
	fadeLoop = setInterval(fadeOut, 20);
	gameLoop = setInterval(draw, 5);
}