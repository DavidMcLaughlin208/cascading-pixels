var preset3 = function(){
  cm.infinite = false;
  clearInterval(cm.infiniteLoop)
  
  $("#background-color-picker").spectrum("set", "rgb(0,0,0)");
  $("ball-max-color").spectrum("set", "rgb(255,0,0)");
  $("ball-min-color").spectrum("set", "rgb(255,255,255)");

  cm.borderOn = false;
  $(".border-toggle").prop("checked", false)
  
  cm.maxColor = "#ff0000"
  cm.minColor = "#ffffff"
  cm.backgroundColor = parseBackgroundColor($("#background-color-picker").spectrum("get"));

  cm.cv.ctx.fillStyle = '#000000';
  cm.cv.ctx.fillRect(0,0,cm.canvasWidth, cm.canvasHeight)

  var x = 0
  var y = (cm.canvasHeight)
  var size = cm.canvasWidth/140;
  cm.obstaclesCircles.push(new ObstacleCircle(x,y, size))
  
  x = cm.canvasWidth
  y = cm.canvasHeight
  cm.obstaclesCircles.push(new ObstacleCircle(x,y, size))
  
  x = cm.canvasWidth/2
  y = cm.canvasHeight/2 - 100
  size = cm.canvasWidth/400;
  cm.obstaclesCircles.push(new ObstacleCircle(x,y, size))

  x = cm.canvasWidth/8
  y = cm.canvasHeight/4
  size = cm.canvasWidth/1000;
  cm.obstaclesCircles.push(new ObstacleCircle(x,y, size))

  x = 7*(cm.canvasWidth/8)
  y = cm.canvasHeight/4
  cm.obstaclesCircles.push(new ObstacleCircle(x,y, size))

  x = cm.canvasWidth/2
  y = 7*(cm.canvasHeight/8)
  cm.obstaclesCircles.push(new ObstacleCircle(x,y, size))
  for(var i = 0; i < 10; i++){
    var place = setTimeout(function(){
      var unplaced = new UnplacedCluster((cm.canvasWidth * Math.random()), -100, 10)
      unplaced.execute(5, 5, 5);
    }, 4000*i)
    cm.timeoutArray.push(place);
  }

}
