var UnplacedCluster = function(x,y,size){
  this.x = x;
  this.y = y;
  this.size = size;
}

UnplacedCluster.prototype.draw = function(){
  cm.ui.ctx.beginPath();
  cm.ui.ctx.strokeStyle = 'black';
  cm.ui.ctx.strokeRect(this.x - (this.size * 5), this.y - (this.size * 5), this.size * 10, this.size * 10)
}

UnplacedCluster.prototype.execute = function(density, width, height){
  var leftBound = this.x - (this.size * width);
  var rightBound = this.x + (this.size * width);
  var upperBound = this.y - (this.size * height);
  var lowerBound = this.y + (this.size * height);
  for(var i = leftBound; i < rightBound; i += density){
    for(var j = upperBound; j < lowerBound; j += density){
      var ball = new Ball(0,0,i,j);
      cm.balls.push(ball);
    }
  }
}

