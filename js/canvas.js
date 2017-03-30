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

