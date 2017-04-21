var gravityCenter = function(x,y, strength, absorb){
  this.x = x || cv.width/2;
  this.y = y || cv.height/2;
  this.strength = Math.min(strength, 0.5)
  this.color = '#000000';
  this.absorb = absorb || false;
}

gravityCenter.prototype.draw = function(){
  cm.gc.ctx.beginPath();
  cm.gc.ctx.arc(this.x, this.y, 1000*Math.abs(this.strength), 0, 2 * Math.PI, false);
  cm.gc.ctx.lineWidth = "1"
  cm.gc.ctx.strokeStyle = this.color;
  cm.gc.ctx.stroke();
  cm.gc.ctx.closePath();
  
  cm.gc.ctx.beginPath();
  cm.gc.ctx.arc(this.x, this.y, 50*Math.abs(this.strength), 0, 2 * Math.PI, false);
  cm.gc.ctx.fillStyle = this.color;
  cm.gc.ctx.fill();
  cm.gc.ctx.closePath();
}

var UnplacedGrav = function(x,y,strength){
  this.x = x,
  this.y = y;
  this.strength = Math.min(strength, 0.5);
}

UnplacedGrav.prototype.draw = function(){
  cm.ui.ctx.beginPath();
  cm.ui.ctx.arc(this.x, this.y, 1000*Math.abs(this.strength), 0, 2 * Math.PI, false);
  cm.ui.ctx.lineWidth = "1"
  cm.ui.ctx.strokeStyle = 'black';
  cm.ui.ctx.stroke();
  cm.ui.ctx.closePath();

  cm.ui.ctx.beginPath();
  cm.ui.ctx.arc(this.x, this.y, 50*Math.abs(this.strength), 0, 2 * Math.PI, false);
  cm.ui.ctx.fillStyle = 'black';
  cm.ui.ctx.fill();
  cm.ui.ctx.closePath();
}

var logGravLocations = function(){
  for(var i in cm.centersOfGravity){
    console.log("x: " + cm.centersOfGravity[i].x + "   y: " + cm.centersOfGravity[i].y)
  }
}
