function Lane(game, x, y, speed, lane) {
    this.game = game;
    this.speed = speed;
    this.x = x;
    this.y = y;
    this.lane = lane;
    this.imgTop = new Image();
    this.imgTop.src = image;
  }
 
  Lane.prototype.move = function() {
    this.x -= this.speed;
  };