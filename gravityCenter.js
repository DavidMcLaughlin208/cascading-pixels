var applyImpulse = function(x,y){
  console.log(balls.length)
  for(var i in balls){
    x = x - balls[i].x
    y = y - balls[i].y

    var distance = Math.floor(Math.sqrt( x*x + y*y ));
    if(distance < 500){
      balls[i].impulseX = (-x*5)/distance;
      balls[i].impulseY = (-y*5)/distance;
    }
  }
}
