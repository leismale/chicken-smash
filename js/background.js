function Background(game) {
  this.game = game;
  this.img = new Image();
  this.img.src = 'img/road3.png';
  this.x = 0;
  this.y = 0;
  this.img2 = new Image();
  this.img2.src = 'img/overlay.png';
  this.img3 = new Image();
  this.img3.src = 'img/overlay2.png';
  this.counter = 360;
}

Background.prototype.draw = function() {
  this.game.ctx.drawImage(this.img, this.x, this.y, 1300, 750);
};

Background.prototype.countDown = function() {
  this.game.ctx.fillStyle = "black";  
  this.game.ctx.font = "100px Amatica SC";
  this.game.ctx.drawImage(this.img3, this.x, this.y, 1300, 750);
  this.game.ctx.fillText(Math.floor(this.counter/100), 580, 400);
}

Background.prototype.lose = function() {
  this.game.ctx.drawImage(this.img2, this.x, this.y, 1300, 750);
  this.game.ctx.fillText("GAME OVER", 300, 300);
  this.game.ctx.fillText("PRESS ENTER TO START AGAIN", 300, 500)  ;
}

Background.prototype.time = function() {
  this.game.ctx.fillText(Math.floor(this.game.time/100), 600, 62);
}