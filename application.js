var mycanvas = document.getElementById('mycanvas');
var ctx = mycanvas.getContext('2d');
var ball = {x:10,y:10}

var gravity;
var force;
var drag;
var speedX;
var speedY;
var gameLoop;

var reset = function(){
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

	ctx.lineTo(ball.x, ball.y);
	ctx.stroke()
	
	ctx.fillRect(ball.x, ball.y, 10, 10);
}

var start = function(){
	ctx.clearRect(0, 0, width, height);
	ball = {x:10,y:10}
	ctx.fillStyle = 'lightgrey';
	ctx.fillRect(0,0,width,height);
	ctx.fillStyle = 'black';
	ctx.beginPath();
	ctx.lineTo(ball.x, ball.y);
	ctx.stroke()
	gameLoop = setInterval(draw, 5);
}