window.onload = function() {
  $("#jump").click(function() {
    $("#jump").off("click");
    //$("#jump").addClass("hidden");
    $("#canvas").removeClass("hidden");
    var game = new Game("canvas");
  }.bind(this))
};