var ObstacleCircle = function(x, y, size){
  this.x = x;
  this.y = y;
  this.size = size;
  this.color = "#000000"
}

ObstacleCircle.prototype.draw = function(){
  gc.ctx.beginPath();
  gc.ctx.arc(this.x, this.y, 50*Math.abs(this.size), 0, 2 * Math.PI, false);
  gc.ctx.fillStyle = this.color;
  gc.ctx.fill();
  gc.ctx.closePath();
}


var UnplacedObstacleCircle = function(x,y,size){
  this.x = x;
  this.y = y;
  this.size = size;
}

UnplacedObstacleCircle.prototype.draw = function(){
  ui.ctx.beginPath();
  ui.ctx.arc(this.x, this.y, 50*Math.abs(this.size), 0, 2 * Math.PI, false);
  ui.ctx.fillStyle = 'black';
  ui.ctx.fill();
  ui.ctx.closePath();
}

