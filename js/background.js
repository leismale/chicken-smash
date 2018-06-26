function Background(game) {
  this.game = game;
  this.img = new Image();
  this.img.src = 'img/road2.png';
  this.x = 0;
  this.y = 0;
  this.img2 = new Image();
  this.img2.src = 'img/overlay.png';
}

Background.prototype.draw = function() {
  this.game.ctx.drawImage(this.img, this.x, this.y, 1300, 750);
};

Background.prototype.loose = function() {
  this.game.ctx.drawImage(this.img2, this.x, this.y, 1300, 750);
  this.game.ctx.fillText("GAME OVER", 300, 300)
  this.game.ctx.fillText("PRESS ENTER TO START AGAIN", 300, 500)  
}
