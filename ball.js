var Ball = function(x,y){
  this.x = x || 10,
  this.y = y || 10,
  this.gravity = gravity * Math.random();
  this.speedX = 0;
  this.speedY = 0;
  this.drag = 0;
  this.force = force + Math.random() * .05;
  this.lastX = this.x;
  this.lastY = this.y;

  this.draw = function(){
    if(Math.abs(this.speedX) < .2 && Math.abs(this.y - cv.height) < 1 && Math.abs(this.speedY) < 1){
      this.die();
    }

    if(this.force != 0){
      this.speedX += this.force;
      this.force = 0;
    }

    if(this.speedX > 0){
      this.speedX -= this.drag;
    } else {
      this.speedX += this.drag;
    }

    this.speedX += this.force;
    this.speedY += this.gravity;

    this.x += this.speedX;
    this.y += this.speedY;

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
