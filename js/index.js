window.onload = function() {
  $("#jump").click(function() {
    $("#jump").off("click");
  }.bind(this))


  $("#chicken").bind("click", function(){
    $("#chicken").off("click");
    $(this).toggle("shake", { direction: "up", times: 2, distance: 40 }, 800);
    $("#canvas").slideToggle( 100, "linear" )
    var game = new Game("canvas");
});
};

