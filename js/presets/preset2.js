var preset2 = function(){
  infinite = true;
  clearInterval(infiniteLoop)
  infiniteLoop = setInterval(addBall, spread);

  noGravity = true;
  gravity = 0;

  $(".disable-gravity").prop("checked", false)

  $("#background-color-picker").spectrum("set", "rgb(0,0,0)");
  $("ball-max-color").spectrum("set", "rgb(255,255,255)");
  $("ball-min-color").spectrum("set", "rgb(255,255,255)");

  $("#fade").val(0)
  getSliderValues()

  maxColor = "#ffffff"
  minColor = "#ffffff"
  backgroundColor = parseBackgroundColor($("#background-color-picker").spectrum("get"));

  cv.ctx.fillStyle = '#000000';
  cv.ctx.fillRect(0,0,cv.width,cv.height)

  centersOfGravity.push(new gravityCenter(cv.width/2, cv.height/2, 10));
  obstaclesCircles.push(new ObstacleCircle(cv.width/2, cv.height/2, 4))

  startX = cv.width/2;
  startY = cv.height/2 - 300;

  setTimeout(function(){obstaclesCircles = [];}, 7000)
  setTimeout(function(){infinite = false;
                        clearInterval(infiniteLoop)}, 16000)
}
