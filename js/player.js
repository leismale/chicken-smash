function Player(game) {
  this.game = game;
  this.width = game.canvas.width * 0.04;
  this.height = game.canvas.height * 0.05;
  this.x = this.game.canvas.width -750;
  this.y = this.game.canvas.height - 60;
  this.w = this.width;
  this.h = this.height;
  this.img = new Image();
  this.img.src = './img/sprite.png';
  this.img.frames = 3;
  this.img.frameIndex = 0;
  this.initialW = game.canvas.width * 0.04;
  this.initialH = game.canvas.height * 0.05;
  this.initialx = this.game.canvas.width -750;
  this.initialy = this.game.canvas.height -60;
}

Player.prototype.draw = function() {
  // this.game.ctx.drawImage(this.img, this.x, this.y, this.w, this.h)

  this.game.ctx.drawImage(

    this.img,
    this.img.frameIndex * Math.floor(this.img.width / this.img.frames),
    0,
    Math.floor(this.img.width / this.img.frames),
    this.img.height,
    this.x,
    this.y,
    this.width,
    this.height);
  this.animateImg();
};

Player.prototype.animateImg = function() {
  if (this.game.framesCounter % 12 === 0) {
    this.img.frameIndex += 1;
    if (this.img.frameIndex > 2) this.img.frameIndex = 0;
  }
};