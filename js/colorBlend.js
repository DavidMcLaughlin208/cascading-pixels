var mixColor = function(hex1, hex2, factor) {
  var col1, col2;
  col1 = parseInt(hex1.replace(/^[#]/, ''), 16);
  col2 = parseInt(hex2.replace(/^[#]/, ''), 16);

  var r1, g1, b1, r2, g2, b2;
  r1 = col1 >> 16 & 0xFF;
  g1 = col1 >> 8 & 0xFF;
  b1 = col1 & 0xFF;
  r2 = col2 >> 16 & 0xFF;
  g2 = col2 >> 8 & 0xFF;
  b2 = col2 & 0xFF;

  var nr, ng, nb;
  nr = Math.round(r1 + (r2 - r1) * factor);
  ng = Math.round(g1 + (g2 - g1) * factor);
  nb = Math.round(b1 + (b2 - b1) * factor);

  var colorInt = (nr << 16 | ng << 8 | nb)
  return '#'+ ('000000' + (colorInt & 0xFFFFFF).toString(16)).slice(-6).toUpperCase();
}

var parseBackgroundColor = function(color){
  // var backgroundChoice = color.toRgbString().split("");
  // backgroundChoice.splice(3,0,"a")
  // backgroundChoice.splice(-1,1,", 0.1)")
  // return backgroundChoice.join("");

  var backgroundChoice = color.toRgbString().split("");
  return ["rgba(", color._r.toFixed() + ", ", + color._g.toFixed() + ", ", + color._b.toFixed() + ", ", + "0.1", ")"]
}
