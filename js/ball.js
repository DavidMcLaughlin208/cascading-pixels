var Ball = function(forceX, forceY, x, y){
  this.x = x || startX;
  this.y = y || startY;
  this.gravity = gravity * Math.random();
  this.speedX = 0;
  this.speedY = 0;
  this.forceX = forceX + Math.random() * .05;
  this.forceY = forceY + Math.random() * .05;
  this.lastX = this.x;
  this.lastY = this.y;
  // this.lifetime = lifetime;
}

Ball.prototype.draw = function(){
  if(Math.abs(this.speedX) < .1 && Math.abs(this.y - cv.height) < 1 && Math.abs(this.speedY) < 1){
    this.die();
  }

  var speed = Math.sqrt(this.speedX**2 + this.speedY**2);

  this.gravity = gravity * Math.random();
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
    this.speedX -= drag;
  } else {
    this.speedX += drag;
  }

  for(var i in obstaclesCircles){
    var obs = obstaclesCircles[i]
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

      var xFactor = this.x - obs.x
      var yFactor = this.y - obs.y

      this.speedX += (xFactor/15)
      this.speedY += (yFactor/15)
    }
  }

  //Apply Gravity
  for(var i in centersOfGravity){
    var x = Math.floor(centersOfGravity[i].x) - this.x
    var y = Math.floor(centersOfGravity[i].y) - this.y
    var distance = Math.max(Math.floor(Math.sqrt( x*x + y*y )), 1);
    if(distance < 1000 * centersOfGravity[i].strength){
      if(distance < 50 * centersOfGravity[i].strength && centersOfGravity[i].absorb){
        centersOfGravity[i].strength += .001;
        this.die();
      }else{
        this.speedX += x/(distance*10) * centersOfGravity[i].strength
        this.speedY += y/(distance*10) * centersOfGravity[i].strength
      }
    }
  }
  this.speedY += this.gravity;




  //Bounce Off Walls
  if(borderOn){
    if(this.x > cv.width){
      this.x = cv.width;
      this.speedX *= -1;
    }
    if(this.x < 0){
      this.x = 0
      this.speedX *= -1;
    }
    if(this.y >= cv.height){
      this.y = cv.height;
      this.speedY *= dampY;
      this.speedX *= dampX;
    }
    if(this.y <= 0){
      this.y = 0;
      this.speedY *= dampY;
      this.speedX *= dampX;
    }
  } else {
    if(this.x > cv.width*2 || this.x < -(cv.width*2) || this.y >= cv.height*2 || this.y < (-cv.height*2)){
      this.die()
    }
  }

  //Apply speeds to coordinates
  this.x += this.speedX;
  this.y += this.speedY;

  // Color based on speed
  var colorFactor = Math.min(speed, 8) / 8;
  var color = mixColor(minColor, maxColor, colorFactor);
  cv.ctx.strokeStyle = color;

  // Circular front - Looks good but is resource intensive
  // cv.ctx.beginPath();
  // cv.ctx.arc(this.x, this.y, thickness/2, 0, 2 * Math.PI, false);
  // cv.ctx.fillStyle = color;
  // cv.ctx.fill();



  // Draw path
  cv.ctx.beginPath();
  cv.ctx.moveTo(this.lastX, this.lastY);
  cv.ctx.lineTo(this.x, this.y);
  cv.ctx.stroke();
  cv.ctx.closePath();


  this.lastX = this.x;
  this.lastY = this.y;
};

Ball.prototype.die = function(){
  balls.splice(balls.indexOf(this), 1);
}

