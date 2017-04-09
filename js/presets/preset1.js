var preset1 = function(){
  infinite = false;
  clearInterval(infiniteLoop)

  noGravity = true;
  gravity = 0;
  $(".disable-gravity").prop("checked", false)
  
  $("#background-color-picker").spectrum("set", "#000000");
  $("ball-max-color").spectrum("set", "#ffffff");
  $("ball-min-color").spectrum("set", "#ffffff");


  
  maxColor = "#ffffff"
  minColor = "#ffffff"
  backgroundColor = parseBackgroundColor($("#background-color-picker").spectrum("get"));

  cv.ctx.fillStyle = '#000000';
  cv.ctx.fillRect(0,0,cv.width,cv.height)

  var x1 = (cv.width/2) - (525/2)
  var y1 = (cv.height/2)
  
  var x2 = (cv.width/2) + (525/2)
  var y2 = (cv.height/2)

  centersOfGravity.push(new gravityCenter(x1,y1,10));
  centersOfGravity.push(new gravityCenter(x2,y2,10));

  var unplaced = new UnplacedCluster(cv.width/2 + 50, cv.height/2 - 10, 5)
  unplaced.execute(5, 20, 15);

  var unplaced = new UnplacedCluster(cv.width/2 - 50, cv.height/2 + 10, 5)
  unplaced.execute(5, 20, 15);
}
