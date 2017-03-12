var mycanvas = document.getElementById('mycanvas');
var ctx = mycanvas.getContext('2d');
var ball = {x:10,y:10}
var gravity = .04;
var force = 2;

var speedX = 0;
var speedY = 0;

var width = 900;
var height = 500;

var gravityModifier = 15;
var gravityMin = .05;
var gravityMax = 20;
var forceModifier = 40;
var reverseGravity;


ctx.fillStyle = 'lightgrey';
ctx.fillRect(0,0,width,height);
ctx.fillStyle = 'black';

var draw = function(){
	

	if(force != 0){
		speedX += force;
		force = 0;
	}



	if(speedX > 0){
		speedX -= .001;
	} else {
		speedX += .001;
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
	
	// ctx.fillRect(ball.x*ballSize, ball.y*ballSize, ballSize, ballSize);
}

ctx.beginPath();
ctx.lineTo(ball.x, ball.y);
ctx.stroke()
gameloop = setInterval(draw, 5);

