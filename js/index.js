window.onload = function() {
  $("#jump").click(function() {
    $("#jump").off("click");
    $("#canvas").removeClass("hidden");
    var game = new Game("canvas");
  }.bind(this))
};