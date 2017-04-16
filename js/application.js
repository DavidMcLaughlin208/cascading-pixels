var canvasManager = function(){
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
	this.obstaclesCircles = [new ObstacleCircle(50, cv.height/4, 1), new ObstacleCircle(cv.width, cv.height, 2)];
	this.placingObstacles = false;
	this.noFade = false;

	this.deltaTime = 1
	this.lastFrame = new Date()

	this.canvasWidth = $(window).width() * .77
	this.canvasWidth = $(window).height() * 1

	this.cv = new Canvas('mycanvas', this.canvasWidth, this.canvasHeight);
	this.ui = new Canvas('uicanvas', this.canvasWidth, this.canvasHeight);
	this.gc = new Canvas('gravitycanvas', this.canvasWidth, this.canvasHeight);

	this.resizeCanvas = function(){
  this.canvasWidth = $(window).width() * .77
  this.canvasHeight = $(window).height() * 1

  this.ui.mycanvas.width = this.canvasWidth;
  this.ui.mycanvas.height = this.canvasHeight;

  this.cv.mycanvas.width = this.canvasWidth;
  this.cv.mycanvas.height = this.canvasHeight;

  this.gc.mycanvas.width = this.canvasWidth;
  this.gc.mycanvas.height = this.canvasHeight;


	this.draw = function(){
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
		
		// deltaTime = new Date() - lastFrame
		// lastFrame = new Date()
		// console.log(deltaTime)



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

	this.drawBackground = function(){
		backgroundColor[4] = fade;
		cv.ctx.fillStyle = backgroundColor.join("");
	  cv.ctx.fillRect(0, 0, cv.width, cv.height);
	}

	// function fadeOut() {
		// backgroundColor[4] = fade;
	  // cv.ctx.fillStyle = backgroundColor//.join("");
	  // cv.ctx.fillRect(0, 0, cv.width, cv.height);
	// }

	this.start = function(){
		cv.ctx.lineWidth = 5;
		cv.ctx.fillStyle = '#ffffff';
		cv.ctx.fillRect(0,0,cv.width,cv.height);
		cv.ctx.fillStyle = 'black';

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

		//fadeLoop = setInterval(fadeOut, fade);
		gameLoop = setInterval(draw, 5);
	}
}
