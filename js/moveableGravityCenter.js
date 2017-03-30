var MoveableGravityCenter = function(x,y,strength){
  this.x = x || startX;
  this.y = y || startY;
  this.gravity = gravity * Math.random();
  this.speedX = 0;
  this.speedY = 0;
  this.forceX = forceX + Math.random() * .05;
  this.forceY = forceY + Math.random() * .05;
  this.lastX = this.x;
  this.lastY = this.y;
  this.strength = strength;
}

MoveableGravityCenter.prototype.draw = function(){

}
