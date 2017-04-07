var clearCanvas = function(){
  $("#gravity").val(50);
  $("#drag").val(0);
  $("#forceX").val(10);
  $("#forceY").val(0);
  $("#thickness").val(2);
  $("#fade").val(5)
  $(".border-toggle").prop("checked", true);
  $(".disable-gravity").prop("checked", true)
  
  borderOn = true;
  noGravity = false;
  balls = [];
  centersOfGravity = [];

  fadeLoop = setInterval(fadeOut, 5);
}
