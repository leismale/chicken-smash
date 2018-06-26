function Background(game) {
  this.game = game;
  this.img = new Image();
  this.img.src = 'img/road2.png';
  this.x = 0;
  this.y = 0;
}

Background.prototype.draw = function() {
  this.game.ctx.drawImage(this.img, this.x, this.y, 1300, 750);
};