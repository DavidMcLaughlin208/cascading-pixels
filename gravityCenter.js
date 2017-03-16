// var applyImpulse = function(x,y){
//   console.log(balls.length)
//   for(var i in balls){
//     x = x - balls[i].x
//     y = y - balls[i].y

//     var distance = Math.floor(Math.sqrt( x*x + y*y ));
//     if(distance < 500){
//       balls[i].impulseX = (-x*5)/distance;
//       balls[i].impulseY = (-y*5)/distance;
//     }
//   }
// }


var gravityCenter = function(x,y, strength){
  this.x = x || cv.width/2;
  this.y = y || cv.height/2;
  this.strength = strength || Math.random() * 0.5;

  this.draw = function(){
    // cv.ctx.fillRect(this.x, this.y, 50*this.strength, 50*this.strength);
    cv.ctx.beginPath();
    cv.ctx.arc(this.x, this.y, 50*this.strength, 0, 2 * Math.PI, false);
    cv.ctx.fillStyle = 'black';
    cv.ctx.fill();
    cv.ctx.closePath();
  }
}
