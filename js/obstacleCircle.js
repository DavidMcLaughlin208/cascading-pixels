var ObstacleCircle = function(x, y, size){
  this.x = x;
  this.y = y;
  this.size = size;
  this.color = "#000000"
}

ObstacleCircle.prototype.draw = function(){
  cm.gc.ctx.beginPath();
  cm.gc.ctx.arc(this.x, this.y, 50*Math.abs(this.size), 0, 2 * Math.PI, false);
  cm.gc.ctx.fillStyle = this.color;
  cm.gc.ctx.fill();
  cm.gc.ctx.closePath();
}


var UnplacedObstacleCircle = function(x,y,size){
  this.x = x;
  this.y = y;
  this.size = size;
}

UnplacedObstacleCircle.prototype.draw = function(){
  cm.ui.ctx.beginPath();
  cm.ui.ctx.arc(this.x, this.y, 50*Math.abs(this.size), 0, 2 * Math.PI, false);
  cm.ui.ctx.fillStyle = 'black';
  cm.ui.ctx.fill();
  cm.ui.ctx.closePath();
}

