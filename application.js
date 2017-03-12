var mycanvas = document.getElementById('mycanvas');
var ctx = mycanvas.getContext('2d');
var ball = {x:10,y:10}
var gravity = 5;
var force = 30;
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
	ctx.lineTo(ball.x, ball.y);
	ctx.stroke()

	if(ball.x > width){
		ball.x = width;
		force *= -1;
	}
	if(ball.x < 0){
		ball.x = 0
		force *= -1;
	}
	if(ball.y > height - gravity/2){
		ball.y = height;
		gravity *= -.6;
	}
	if(ball.y < 0 + gravity/2){
		ball.y = 0;
		gravity *= -.6;
	}

	force -= force/forceModifier;
	// console.log(force);

	if(force > 0){
		force -= .5;
	} else {
		force += .5;
	}
	ball.x += force;

	console.log(gravity)

	// gravity += 1
	gravity += Math.abs(gravity/gravityModifier) + .1;
	

	ball.y += gravity;
	
	// ctx.fillRect(ball.x*ballSize, ball.y*ballSize, ballSize, ballSize);
}

ctx.beginPath();
gameloop = setInterval(draw, 40);

