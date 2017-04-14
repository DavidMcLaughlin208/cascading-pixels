var gravityCenter = function(x,y, strength, absorb){
  this.x = x || cv.width/2;
  this.y = y || cv.height/2;
  this.strength = Math.min(strength, 0.5)
  this.color = '#000000';
  this.absorb = absorb || false;
}

gravityCenter.prototype.draw = function(){
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
}

var UnplacedGrav = function(x,y,strength){
  this.x = x,
  this.y = y;
  this.strength = Math.min(strength, 0.5);
}

UnplacedGrav.prototype.draw = function(){
  ui.ctx.beginPath();
  ui.ctx.arc(this.x, this.y, 1000*Math.abs(this.strength), 0, 2 * Math.PI, false);
  ui.ctx.lineWidth = "1"
  ui.ctx.strokeStyle = 'black';
  ui.ctx.stroke();
  ui.ctx.closePath();

  ui.ctx.beginPath();
  ui.ctx.arc(this.x, this.y, 50*Math.abs(this.strength), 0, 2 * Math.PI, false);
  ui.ctx.fillStyle = 'black';
  ui.ctx.fill();
  ui.ctx.closePath();
}

var logGravLocations = function(){
  for(var i in centersOfGravity){
    console.log("x: " + centersOfGravity[i].x + "   y: " + centersOfGravity[i].y)
  }
}
