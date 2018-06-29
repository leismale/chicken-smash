window.onload = function() {
  $("#chicken").effect("shake", { direction: "up", times: 4, distance: 30 }, 1000);
  
  $("#chicken").bind("click", function(){
    $("#chicken").off("click");
    $(this).toggle("shake", { direction: "up", times: 2, distance: 40 }, 800);
    $("#canvas").slideToggle( 100, "linear" )
    var game = new Game("canvas");
  });
  
}.bind(this)