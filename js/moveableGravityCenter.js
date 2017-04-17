var MoveableGravityCenter = function(x,y,strength){
  this.x = x || cm.startX;
  this.y = y || cm.startY;
  this.gravity = cm.gravity * Math.random();
  this.speedX = 0;
  this.speedY = 0;
  this.forceX = cm.forceX + Math.random() * .05;
  this.forceY = cm.forceY + Math.random() * .05;
  this.lastX = this.x;
  this.lastY = this.y;
  this.strength = strength;
}

MoveableGravityCenter.prototype.draw = function(){
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
  // if(this.speedX > 0){
  //   this.speedX -= drag;
  // } else {
  //   this.speedX += drag;
  // }

  //Apply Gravity
  for(var i in cm.centersOfGravity){
    if(cm.centersOfGravity[i] !== this){
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
  }
  this.speedY += this.gravity;


  //Apply speeds to coordinates
  this.x += this.speedX;
  this.y += this.speedY;

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
    if(this.x > cm.canvasWidth*2 || this.x < -(cm.canvasWidth*2) || this.y >= cm.canvasHeight*2 || this.y < (-cm.canvasHeight*2)){
      this.die()
    }
  }

  cm.gc.ctx.beginPath();
  cm.gc.ctx.arc(this.x, this.y, 1000*Math.abs(this.strength), 0, 2 * Math.PI, false);
  cm.gc.ctx.lineWidth = "1"
  cm.gc.ctx.strokeStyle = 'black';
  cm.gc.ctx.stroke();
  cm.gc.ctx.closePath();
  
  cm.gc.ctx.beginPath();
  cm.gc.ctx.arc(this.x, this.y, 50*Math.abs(this.strength), 0, 2 * Math.PI, false);
  cm.gc.ctx.fillStyle = 'black';
  cm.gc.ctx.fill();
  cm.gc.ctx.closePath();


  this.lastX = this.x;
  this.lastY = this.y;
}

MoveableGravityCenter.prototype.die = function(){
  cm.centersOfGravity.splice(cm.centersOfGravity.indexOf(this), 1);
}
