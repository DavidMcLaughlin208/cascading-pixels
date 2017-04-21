var preset2 = function(){
  cm.infinite = true;
  clearInterval(cm.infiniteLoop)
  cm.infiniteLoop = setInterval(addBall, cm.spread);

  cm.noGravity = true;
  cm.gravity = 0;

  $(".disable-gravity").prop("checked", false)

  $("#background-color-picker").spectrum("set", "rgb(0,0,0)");
  $("ball-max-color").spectrum("set", "rgb(255,255,255)");
  $("ball-min-color").spectrum("set", "rgb(255,255,255)");

  $("#fade").val(0)
  getSliderValues()

  cm.maxColor = "#ffffff"
  cm.minColor = "#ffffff"
  cm.backgroundColor = parseBackgroundColor($("#background-color-picker").spectrum("get"));

  cm.cv.ctx.fillStyle = '#000000';
  cm.cv.ctx.fillRect(0,0,cm.canvasWidth, cm.canvasHeight)

  cm.centersOfGravity.push(new gravityCenter(cm.canvasWidth/2, cm.canvasHeight/2, 10));
  cm.obstaclesCircles.push(new ObstacleCircle(cm.canvasWidth/2, cm.canvasHeight/2, 4))

  cm.startX = cm.canvasWidth/2;
  cm.startY = cm.canvasHeight/2 - 300;

  var func1 = setTimeout(function(){cm.obstaclesCircles = [];}, 7000)
  var funct2 = setTimeout(function(){cm.infinite = false;
                        clearInterval(cm.infiniteLoop)}, 16000)
  cm.timeoutArray.push(func1)
  cm.timeoutArray.push(func2)
}
