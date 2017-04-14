var clearCanvas = function(){
  //Slider Settings
  $("#gravity").val(50);
  $("#drag").val(0);
  $("#forceX").val(10);
  $("#forceY").val(0);
  $("#thickness").val(2);
  $("#fade").val(5)
  $("#spread").val(50)
  $(".border-toggle").prop("checked", true);
  $(".disable-gravity").prop("checked", true)
  
  //Checkbox settings
  borderOn = true;
  noGravity = false;

  //Canvas Objects
  balls = [];
  centersOfGravity = [];
  var obstaclesCircles = [new ObstacleCircle(50, cv.height/4, 1), new ObstacleCircle(cv.width, cv.height, 2)];

  //Variables
  startX = 10
  startY = 10

  //Color schema
  $("#background-color-picker").spectrum("set", "rgb(255,255,255)");
  $("ball-max-color").spectrum("set", "#000000");
  $("ball-min-color").spectrum("set", "#000000");

  maxColor = "#000000";
  minColor = "#000000";
  backgroundColor = "rgba(255,255,255,0.1)";

  //Fade interval
  clearInterval(fadeLoop);
  fadeLoop = setInterval(fadeOut, 5);

  getSliderValues();
  
  //Infinite interval
  if(infinite){
    clearInterval(infiniteLoop);
    infiniteLoop = setInterval(addBall, spread)
  }
  cv.ctx.clearRect(0, 0, cv.width, cv.height)
}
