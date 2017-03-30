var UnplacedCluster = function(x,y,size){
  console.log(size)
  this.x = x;
  this.y = y;
  this.size = size;
}

UnplacedCluster.prototype.draw = function(){
  ui.ctx.beginPath();
  ui.ctx.strokeStyle = 'black';
  ui.ctx.strokeRect(this.x - (this.size * 5), this.y - (this.size * 5), this.size * 10, this.size * 10)
}

