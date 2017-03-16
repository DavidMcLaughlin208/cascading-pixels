var Ball = function(forceX, forceY){
  this.x = startX,
  this.y = startY,
  this.gravity = gravity * Math.random();
  this.speedX = 0;
  this.speedY = 0;
  this.impulseX = 0;
  this.impulseY = 0;
  this.drag = 0;
  this.forceX = forceX + Math.random() * .05;
  this.forceY = forceY + Math.random() * .05;
  this.lastX = this.x;
  this.lastY = this.y;


  this.draw = function(){
    if(Math.abs(this.speedX) < .2 && Math.abs(this.y - cv.height) < 1 && Math.abs(this.speedY) < 1){
      this.die();
    }

    var speed = Math.sqrt(this.speedX**2 + this.speedY**2);
    if(speed > 20){
      this.die();
    }

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
      for(var i in centersOfGravity){
        var x = Math.floor(centersOfGravity[i].x) - this.x
        var y = Math.floor(centersOfGravity[i].y) - this.y
        var distance = Math.floor(Math.sqrt( x*x + y*y ));
        this.speedX += x/(distance*10)
        this.speedY += y/(distance*10)
      }
    } else {
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
      this.speedY *= dampY;
      this.speedX *= dampX;
    }
    if(this.y <= 0){
      this.y = 0;
      this.speedY *= dampY;
      this.speedX *= dampX;
    }

    var speed = Math.sqrt(this.speedX**2 + this.speedY**2);
    var colorFactor = Math.min(speed, 10) / 10;
    var r = parseInt(Math.max(255*colorFactor, 1));
    var b  = 255 - r;
    var style = "rgb(" + r + ", 0," + b + ")";
    cv.ctx.strokeStyle = rgb2hex(style)


    cv.ctx.beginPath();
    // console.log(cv.ctx.strokeStyle)
    cv.ctx.moveTo(this.lastX, this.lastY);
    cv.ctx.lineTo(this.x, this.y);
    cv.ctx.lineWidth = thickness;
    cv.ctx.stroke();
    this.lastX = this.x;
    this.lastY = this.y;
  };

  this.die = function(){
    balls.splice(balls.indexOf(this), 1);
  }
}
