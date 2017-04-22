var CanvasManager = function(){
	this.gravity;
	this.gameLoop;
	this.fadeLoop;
	this.fade;
	this.spread;
	this.infinite;
	this.balls = [];
	this.infiniteLoop;
	this.noGravity = false;
	this.startX = 10;
	this.startY = 10;
	this.thickness = 1;
	this.dampX = .75;
	this.dampY = -.9;
	this.variation = 0.5;
	this.centersOfGravity = [];
	this.placingGravs = false;
	this.showGravs = true;
	this.placingClusters = false;
	this.placingSpawn = true;
	this.maxColor = "#000000";
	this.minColor = "#000000";
	this.backgroundColor = ["rgba(", "255,", "255,", "255,", "0.1",")"] //"rgba(255,255,255,0.1)"; 
	this.borderOn = true;
	this.lifetime;
	this.uiElement;
	this.drawUiElement = false;
	this.forceX = 2;
	this.forceY = 2;
	this.obstaclesCircles = [new ObstacleCircle(50, 100, 1)];
	this.placingObstacles = false;
	this.noFade = false;
	this.timeoutArray = [];
	this.threshold = 0.5;
	this.balls2 = [];

	this.deltaTime = 1
	this.lastFrame = new Date()

	this.canvasWidth = $(window).width() * .77
	this.canvasWidth = $(window).height() * 1

	this.cv = new Canvas('mycanvas', this.canvasWidth, this.canvasHeight);
	this.ui = new Canvas('uicanvas', this.canvasWidth, this.canvasHeight);
	this.gc = new Canvas('gravitycanvas', this.canvasWidth, this.canvasHeight);
}

CanvasManager.prototype.resizeCanvas = function(){
  this.canvasWidth = $(window).width() * .77
  this.canvasHeight = $(window).height() * 1

  this.ui.mycanvas.width = this.canvasWidth;
  this.ui.mycanvas.height = this.canvasHeight;

  this.cv.mycanvas.width = this.canvasWidth;
  this.cv.mycanvas.height = this.canvasHeight;

  this.gc.mycanvas.width = this.canvasWidth;
  this.gc.mycanvas.height = this.canvasHeight;
}

CanvasManager.prototype.drawBackground = function(){
	this.backgroundColor[4] = this.fade;
	this.cv.ctx.fillStyle = this.backgroundColor.join("");
  this.cv.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight)
}

CanvasManager.prototype.draw = function(){
	if(!this.noFade){drawBackground()};
	this.balls2 = this.balls.slice(0, this.balls.length)
	// console.log(balls.length)
	// reset();
	// getSliderValues();

	// if(noGravity){
	// }else{
	// 	// gravity = .04;
	// 	// gravityModifier = $("#gravity").val();
	// 	// gravity *= gravityModifier/25;
	// }
	
	// deltaTime = new Date() - lastFrame
	// lastFrame = new Date()
	// console.log(deltaTime)



	this.cv.ctx.lineWidth = this.thickness;

	for(var i in this.balls){
		this.balls[i].draw();
	}

	this.gc.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)

	if(this.showGravs){
		for(var i in this.centersOfGravity){
			this.centersOfGravity[i].draw();
		}
	}

	if(this.drawUiElement){
		this.ui.ctx.clearRect(0,0,this.canvasWidth, this.canvasHeight)
		this.uiElement.draw()
	}
	
	for(var i in this.obstaclesCircles){
		this.obstaclesCircles[i].draw()
	}
}

	

	// function fadeOut() {
		// backgroundColor[4] = fade;
	  // cv.ctx.fillStyle = backgroundColor//.join("");
	  // cv.ctx.fillRect(0, 0, cv.width, cv.height);
	// }

CanvasManager.prototype.start = function(){
	getSliderValues();

	this.cv.ctx.lineWidth = 5;
	this.cv.ctx.fillStyle = '#ffffff';
	this.cv.ctx.fillRect(0,0,this.canvasWidth, this.canvasHeight)
	this.cv.ctx.fillStyle = 'black';

	this.cv.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
	this.cv.ctx.fillStyle = '#ffffff';
	this.cv.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight)
	this.cv.ctx.fillStyle = 'black';

	this.cv.ctx.beginPath();
	this.cv.ctx.moveTo(10,10);
	this.cv.ctx.closePath();

	// this.ui.mycanvas.width = ui.width;
	// this.ui.mycanvas.height = ui.height;
	this.ui.ctx.fillStyle = "rgba(0,0,0,0)";
	this.ui.ctx.fillRect(0,0,this.canvasWidth, this.canvasHeight)

	this.resizeCanvas();

	//fadeLoop = setInterval(fadeOut, fade);
	this.gameLoop = setInterval(this.draw.bind(this), 5);
}


var drawBackground = function(){
		cm.backgroundColor[4] = cm.fade;
		cm.cv.ctx.fillStyle = cm.backgroundColor.join("");
	  cm.cv.ctx.fillRect(0, 0, cm.canvasWidth, cm.canvasHeight)
}

cm = new CanvasManager();
cm.start();
cm.infinite = true;
cm.spread = $("#spread").val();
cm.infiniteLoop = setInterval(addBall, cm.spread);
