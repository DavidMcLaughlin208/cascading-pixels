var Ball = function(force,x,y){
  this.x = x || 10,
  this.y = y || 10,
  this.gravity = gravity * Math.random();
  this.speedX = 0;
  this.speedY = 0;
  this.impulseX = 0;
  this.impulseY = 0;
  this.drag = 0;
  this.force = force + Math.random() * .05;
  this.lastX = this.x;
  this.lastY = this.y;


  this.draw = function(){
    if(Math.abs(this.speedX) < .2 && Math.abs(this.y - cv.height) < 1 && Math.abs(this.speedY) < 1){
      this.die();
    }

    this.gravity = gravity * Math.random();
    //Initial Force
    if(this.force != 0){
      this.speedX += this.force;
      this.force = 0;
    }

    //Mouse Click Impulse
    if(this.impulseX != 0){
      this.speedX += this.impulseX;
      this.impulseX = 0
    }

    if(this.impulseY != 0){
      this.speedY += this.impulseY;
      this.impulseY = 0
    }

    //Reduce horizontal speed
    if(this.speedX > 0){
      this.speedX -= this.drag;
    } else {
      this.speedX += this.drag;
    }

    //Apply Gravity
    if(centerGravity){
      var x = Math.floor(cv.width/2) - this.x
      var y = Math.floor(cv.height/2) - this.y
      var distance = Math.floor(Math.sqrt( x*x + y*y ));
      this.speedX += x/(distance*10)
      this.speedY += y/(distance*10)
    }else{
      this.speedY += this.gravity;
    }

    //Apply speeds to coordinates
    this.x += this.speedX;
    this.y += this.speedY;

    //Bounce Off Walls
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
      this.speedY *= -.75;
      this.speedX *= 0.9;
    }
    if(this.y <= 0){
      this.y = 0;
      this.speedY *= -.75;
      this.speedX *= 0.9;
    }

    cv.ctx.beginPath();
    cv.ctx.fillStyle = "black";
    cv.ctx.moveTo(this.lastX, this.lastY);
    cv.ctx.lineTo(this.x, this.y);
    cv.ctx.stroke();
    this.lastX = this.x;
    this.lastY = this.y;
  };

  this.die = function(){
    balls.splice(balls.indexOf(this), 1);
  }
}
