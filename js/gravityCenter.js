var gravityCenter = function(x,y, strength){
  this.x = x || cv.width/2;
  this.y = y || cv.height/2;
  console.log(strength)
  this.strength = Math.min(strength, 0.5)
  console.log(this.strength)
  this.color = 'black' //gravityColors();

}
  // this.draw = function(){
  //   cv.ctx.beginPath();
  //   cv.ctx.arc(this.x, this.y, 1000*Math.abs(this.strength), 0, 2 * Math.PI, false);
  //   cv.ctx.lineWidth = "1"
  //   cv.ctx.strokeStyle = this.color;
  //   cv.ctx.stroke();
  //   cv.ctx.closePath();

  //   cv.ctx.beginPath();
  //   cv.ctx.arc(this.x, this.y, 50*Math.abs(this.strength), 0, 2 * Math.PI, false);
  //   cv.ctx.fillStyle = this.color;
  //   cv.ctx.fill();
  //   cv.ctx.closePath();
  // }
// }

gravityCenter.prototype.draw = function(){
  cv.ctx.beginPath();
  cv.ctx.arc(this.x, this.y, 1000*Math.abs(this.strength), 0, 2 * Math.PI, false);
  cv.ctx.lineWidth = "1"
  cv.ctx.strokeStyle = this.color;
  cv.ctx.stroke();
  cv.ctx.closePath();

  cv.ctx.beginPath();
  cv.ctx.arc(this.x, this.y, 50*Math.abs(this.strength), 0, 2 * Math.PI, false);
  cv.ctx.fillStyle = this.color;
  cv.ctx.fill();
  cv.ctx.closePath();
}


var moveableGravityCenter = function(x,y,strength){

}


var UnplacedGrav = function(x,y,strength){
  this.x = x,
  this.y = y;
  this.strength = Math.min(strength, 0.5);
  this.lastX = x;
  this.lastY = y;
}

UnplacedGrav.prototype.draw = function(){
  ui.ctx.beginPath();
  ui.ctx.arc(this.x, this.y, 1000*Math.abs(this.strength), 0, 2 * Math.PI, false);
  ui.ctx.lineWidth = "1"
  ui.ctx.strokeStyle = this.color;
  ui.ctx.stroke();
  ui.ctx.closePath();

  ui.ctx.beginPath();
  ui.ctx.arc(this.x, this.y, 50*Math.abs(this.strength), 0, 2 * Math.PI, false);
  ui.ctx.fillStyle = this.color;
  ui.ctx.fill();
  ui.ctx.closePath();

  // Undraw previous location
  // ui.ctx.beginPath();
  // ui.ctx.arc(this.lastX, this.lastY, 1000*Math.abs(this.lastStrength), 0, 2 * Math.PI, false);
  // ui.ctx.lineWidth = "1"
  // ui.ctx.strokeStyle = backgroundColor;
  // ui.ctx.stroke();
  // ui.ctx.closePath();

  // ui.ctx.beginPath();
  // ui.ctx.arc(this.lastX, this.lastY, 50*Math.abs(this.lastStrength), 0, 2 * Math.PI, false);
  // ui.ctx.fillStyle = backgroundColor;
  // ui.ctx.fill();
  // ui.ctx.closePath();

  // this.lastX = this.x;
  // this.lastY = this.y;
  // this.lastStrength = this.strength;

}
