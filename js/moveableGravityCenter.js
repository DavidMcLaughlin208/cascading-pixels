var MoveableGravityCenter = function(x,y,strength){
  this.x = x || startX;
  this.y = y || startY;
  this.gravity = gravity * Math.random();
  this.speedX = 0;
  this.speedY = 0;
  this.forceX = forceX + Math.random() * .05;
  this.forceY = forceY + Math.random() * .05;
  this.lastX = this.x;
  this.lastY = this.y;
  this.strength = strength;
}

MoveableGravityCenter.prototype.draw = function(){
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
  // if(this.speedX > 0){
  //   this.speedX -= drag;
  // } else {
  //   this.speedX += drag;
  // }

  //Apply Gravity
  for(var i in centersOfGravity){
    if(centersOfGravity[i] !== this){
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
  }
  this.speedY += this.gravity;


  //Apply speeds to coordinates
  this.x += this.speedX;
  this.y += this.speedY;

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

  // Color based on speed
  var colorFactor = Math.min(speed, 8) / 8;
  var color = mixColor(minColor, maxColor, colorFactor);
  cv.ctx.strokeStyle = color;

  gc.ctx.beginPath();
  gc.ctx.arc(this.x, this.y, 1000*Math.abs(this.strength), 0, 2 * Math.PI, false);
  gc.ctx.lineWidth = "1"
  gc.ctx.strokeStyle = this.color;
  gc.ctx.stroke();
  gc.ctx.closePath();
  
  gc.ctx.beginPath();
  gc.ctx.arc(this.x, this.y, 50*Math.abs(this.strength), 0, 2 * Math.PI, false);
  gc.ctx.fillStyle = this.color;
  gc.ctx.fill();
  gc.ctx.closePath();


  this.lastX = this.x;
  this.lastY = this.y;
}

MoveableGravityCenter.prototype.die = function(){
  centersOfGravity.splice(centersOfGravity.indexOf(this), 1);
}
