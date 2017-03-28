var cv = {
  mycanvas: document.getElementById('mycanvas'),
  ctx: document.getElementById('mycanvas').getContext('2d'),
  width: 1500,
  height: 800
}

var ui = {
  mycanvas: document.getElementById('uicanvas'),
  ctx: document.getElementById('uicanvas').getContext('2d'),
  width: 1500,
  height: 800
}


console.log(cv.ctx == ui.ctx);
