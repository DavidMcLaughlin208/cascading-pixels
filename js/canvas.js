var canvasWidth = $(window).width() * .77
var canvasHeight = $(window).height() * .85

var cv = {
  mycanvas: document.getElementById('mycanvas'),
  ctx: document.getElementById('mycanvas').getContext('2d'),
  width: canvasWidth,
  height: canvasHeight
}

var ui = {
  mycanvas: document.getElementById('uicanvas'),
  ctx: document.getElementById('uicanvas').getContext('2d'),
  width: canvasWidth,
  height: canvasHeight
}

var gc = {
  mycanvas: document.getElementById('gravitycanvas'),
  ctx: document.getElementById('gravitycanvas').getContext('2d'),
  width: canvasWidth,
  height: canvasHeight
}

console.log(gc.ctx === ui.ctx)


var resizeCanvas = function(){
  var canvasWidth = $(window).width() * .77
  var canvasHeight = $(window).height() * .85
  ui.width = canvasWidth;
  ui.height = canvasHeight;

  cv.width = canvasWidth;
  cv.height = canvasHeight;

  gc.width = canvasWidth;
  gc.height = canvasHeight;

  ui.mycanvas.width = ui.width;
  ui.mycanvas.height = ui.height;

  cv.mycanvas.width = cv.width;
  cv.mycanvas.height = cv.height;

  gc.mycanvas.width = gc.width;
  gc.mycanvas.height = gc.height;
}

