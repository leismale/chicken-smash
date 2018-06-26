function Obstacle(game, x, y, dx, image) {
  this.game = game;
  this.dx = dx;
  this.x = x;
  this.y = y;
  this.w = 120;
  this.h = 60;
  this.imgTop = new Image();
  this.imgTop.src = image;
}

Obstacle.prototype.draw = function() {
  this.game.ctx.drawImage(this.imgTop, this.x, this.y, this.w, this.h);
};

Obstacle.prototype.move = function() {
  this.x -= this.dx;
};