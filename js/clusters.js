var UnplacedCluster = function(x,y,size){
  this.x = x;
  this.y = y;
  this.size = size;
}

UnplacedCluster.prototype.draw = function(){
  ui.ctx.beginPath();
  ui.ctx.strokeStyle = 'black';
  ui.ctx.strokeRect(this.x - (this.size * 5), this.y - (this.size * 5), this.size * 10, this.size * 10)
}

UnplacedCluster.prototype.execute = function(){
  var leftBound = this.x - (this.size * 5);
  var rightBound = this.x + (this.size * 5);
  var upperBound = this.y - (this.size * 5);
  var lowerBound = this.y + (this.size * 5);
  for(var i = leftBound; i < rightBound; i += 5){
    for(var j = upperBound; j < lowerBound; j += 5){
      balls.push(new Ball(0,0,i,j));
    }
  }
}

