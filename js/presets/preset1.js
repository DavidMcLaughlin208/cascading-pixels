var preset1 = function(){
  cm.infinite = false;
  clearInterval(cm.infiniteLoop)

  cm.noGravity = true;
  cm.gravity = 0;
  $(".disable-gravity").prop("checked", false)
  
  $("#background-color-picker").spectrum("set", "rgb(0,0,0)");
  $("ball-max-color").spectrum("set", "rgb(255,255,255)");
  $("ball-min-color").spectrum("set", "rgb(255,255,255)");


  
  cm.maxColor = "#ffffff"
  cm.minColor = "#ffffff"
  cm.backgroundColor = parseBackgroundColor($("#background-color-picker").spectrum("get"));

  cm.cv.ctx.fillStyle = '#000000';
  cm.cv.ctx.fillRect(0,0,cm.canvasWidth, cm.canvasHeight)

  var x1 = (cm.canvasWidth/2) - (525/2)
  var y1 = (cm.canvasHeight/2)
  
  var x2 = (cm.canvasWidth/2) + (525/2)
  var y2 = (cm.canvasHeight/2)

  cm.centersOfGravity.push(new gravityCenter(x1,y1,10));
  cm.centersOfGravity.push(new gravityCenter(x2,y2,10));

  var unplaced = new UnplacedCluster(cm.canvasWidth/2 + 50, cm.canvasHeight/2 - 10, 5)
  unplaced.execute(5, 20, 15);

  var unplaced = new UnplacedCluster(cm.canvasWidth/2 - 50, cm.canvasHeight/2 + 10, 5)
  unplaced.execute(5, 20, 15);
}
