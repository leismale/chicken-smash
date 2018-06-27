window.onload = function() {
  $("#jump").click(function() {
    $("#jump").off("click");
  }.bind(this))


  $('#cosas').bind('click', function(){
    $(this).toggle("shake", { direction: "up", times: 4, distance: 40 }, 1500);
    $("#canvas").fadeToggle( 4000, "linear" )
    var game = new Game("canvas");
});
};

