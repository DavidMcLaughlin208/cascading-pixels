var clearCanvas = function(){
  //Slider Settings
  $("#gravity").val(50);
  $("#drag").val(0);
  $("#forceX").val(10);
  $("#forceY").val(0);
  $("#thickness").val(2);
  $("#fade").val(5)
  $(".border-toggle").prop("checked", true);
  $(".disable-gravity").prop("checked", true)
  
  //Checkbox settings
  borderOn = true;
  noGravity = false;
  balls = [];
  centersOfGravity = [];

  //Color schema
  $("#background-color-picker").spectrum("set", "rgb(214,214,214)");
  $("ball-max-color").spectrum("set", "#ff0000");
  $("ball-min-color").spectrum("set", "#0000ff");

  maxColor = "#ff0000";
  minColor = "#0000ff";
  backgroundColor = "rgba(214,214,214,0.1)";

  //Fade interval
  clearInterval(fadeLoop);
  fadeLoop = setInterval(fadeOut, 5);
}
