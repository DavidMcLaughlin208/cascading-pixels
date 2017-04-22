var Ball = function(forceX, forceY, x, y){
  this.x = x || cm.startX;
  this.y = y || cm.startY;
  this.gravity = cm.gravity * Math.random();
  this.speedX = 0;
  this.speedY = 0;
  this.forceX = forceX + Math.random() * .05;
  this.forceY = forceY + Math.random() * .05;
  this.lastX = this.x;
  this.lastY = this.y;
  // this.lifetime = lifetime;
}

Ball.prototype.draw = function(){
  if(Math.abs(this.speedX) < .1 && Math.abs(this.y - cm.canvasHeight) < 1 && Math.abs(this.speedY) < 1){
    this.die();
  }

  var speed = Math.sqrt(Math.pow(this.speedX,2) + Math.pow(this.speedY,2));

  this.gravity = cm.gravity * Math.random();
  //Initial Force
  if(this.forceX != 0){
    this.speedX += this.forceX;
    this.forceX = 0;
  }

  if(this.forceY != 0){
    this.speedY += this.forceY;
    this.forceY = 0;
  }

  //Reduce horizontal speed
  if(this.speedX > 0){
    this.speedX -= cm.drag;
  } else {
    this.speedX += cm.drag;
  }

  for(var i in cm.obstaclesCircles){
    var obs = cm.obstaclesCircles[i]
    var x = obs.x - this.x
    var y = obs.y - this.y
    var distance = Math.floor(Math.sqrt( x*x + y*y ))

    if(distance < 50 * obs.size){
      var normalizeFactor = Math.max(Math.abs(this.speedX), Math.abs(this.speedY))
      var noramlizedX = (this.speedX / normalizeFactor)
      var noramlizedY = (this.speedY / normalizeFactor)
      while(distance < 50 * obs.size){
        this.x -= noramlizedX
        this.y -= noramlizedY
        x = obs.x - this.x
        y = obs.y - this.y
        distance = Math.floor(Math.sqrt( x*x + y*y ))
      }

      var xFactor = (this.x - obs.x)/obs.size
      var yFactor = (this.y - obs.y)/obs.size

      var dot = -math.dot([this.speedX, this.speedY], [xFactor, yFactor])/42
      this.speedX += (xFactor*(dot / 35 ) )
      this.speedY += (yFactor*(dot / 35 ) )
    }
  }

  //Apply Gravity
  for(var i in cm.centersOfGravity){
    var x = Math.floor(cm.centersOfGravity[i].x) - this.x
    var y = Math.floor(cm.centersOfGravity[i].y) - this.y
    var distance = Math.max(Math.floor(Math.sqrt( x*x + y*y )), 1);
    if(distance < 1000 * cm.centersOfGravity[i].strength){
      if(distance < 50 * cm.centersOfGravity[i].strength && cm.centersOfGravity[i].absorb){
        cm.centersOfGravity[i].strength += .001;
        this.die();
      }else{
        this.speedX += x/(distance*10) * cm.centersOfGravity[i].strength
        this.speedY += y/(distance*10) * cm.centersOfGravity[i].strength
      }
    }
  }
  this.speedY += this.gravity;




  //Bounce Off Walls
  if(cm.borderOn){
    if(this.x > cm.canvasWidth){
      this.x = cm.canvasWidth;
      this.speedX *= -1;
    }
    if(this.x < 0){
      this.x = 0
      this.speedX *= -1;
    }
    if(this.y >= cm.canvasHeight){
      this.y = cm.canvasHeight;
      this.speedY *= cm.dampY;
      this.speedX *= cm.dampX;
    }
    if(this.y <= 0){
      this.y = 0;
      this.speedY *= cm.dampY;
      this.speedX *= cm.dampX;
    }
  } else {
    if(this.x > cm.canvasWidth*2 || this.x < -(cm.canvasWidth*2) || this.y >= cm.canvasHeight*2 || this.y < -(cm.canvasHeight*2)){
      this.die()
    }
  }

  //Apply speeds to coordinates
  this.x += this.speedX;
  this.y += this.speedY;

  // Color based on speed
  var colorFactor = Math.min(speed, 8) / 8;
  var color = mixColor(cm.minColor, cm.maxColor, colorFactor);
  cm.cv.ctx.strokeStyle = color;

  // Circular front - Looks good but is resource intensive
  // cv.ctx.beginPath();
  // cv.ctx.arc(this.x, this.y, thickness/2, 0, 2 * Math.PI, false);
  // cv.ctx.fillStyle = color;
  // cv.ctx.fill();



  // Draw path
  cm.cv.ctx.beginPath();
  cm.cv.ctx.moveTo(this.lastX, this.lastY);
  cm.cv.ctx.lineTo(this.x, this.y);
  cm.cv.ctx.stroke();
  cm.cv.ctx.closePath();


  this.lastX = this.x;
  this.lastY = this.y;
};

Ball.prototype.die = function(){
  cm.balls.splice(cm.balls.indexOf(this), 1);
}

