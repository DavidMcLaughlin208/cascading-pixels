var clearCanvas = function(){
  //Slider Settings
  $("#gravity").val(50);
  $("#drag").val(0);
  $("#forceX").val(10);
  $("#forceY").val(0);
  $("#thickness").val(2);
  $("#fade").val(15)
  $("#spread").val(50)
  $(".border-toggle").prop("checked", true);
  $(".disable-gravity").prop("checked", true)
  
  //Checkbox settings
  cm.borderOn = true;
  cm.noGravity = false;

  //Canvas Objects
  cm.balls = [];
  cm.centersOfGravity = [];
  cm.obstaclesCircles = [];

  //Variables
  cm.startX = 10
  cm.startY = 10

  //Color schema
  $("#background-color-picker").spectrum("set", "rgb(255,255,255)");
  $("ball-max-color").spectrum("set", "#000000");
  $("ball-min-color").spectrum("set", "#000000");

  cm.maxColor = "#000000";
  cm.minColor = "#000000";
  cm.backgroundColor = ["rgba(", "255,", "255,", "255,", "0.1",")"] //"rgba(255,255,255,0.1)";

  //Fade interval
  clearInterval(cm.fadeLoop);
  // fadeLoop = setInterval(fadeOut, 5);

  //Cancel all setTimeout functions
  for(var i in cm.timeoutArray){
    clearTimeout(cm.timeoutArray[i])
  }
  cm.timeoutArray = [];

  getSliderValues();
  
  //Infinite interval
  if(cm.infinite){
    clearInterval(cm.infiniteLoop);
    cm.infiniteLoop = setInterval(addBall, spread)
  }
  cm.cv.ctx.clearRect(0, 0, cm.canvasWidth, cm.canvasHeight)
}
