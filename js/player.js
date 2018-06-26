function Player(game) {
  this.game = game;
  this.width = game.canvas.width * 0.04;
  this.height = game.canvas.height * 0.05;
  this.x = this.game.canvas.width -750;
  this.y = this.game.canvas.height - 60;
  this.w = this.width;
  this.h = this.height;
  this.img = new Image();
  this.img.src = './img/chicken2.png';
  this.img.frames = 4;
  this.img.frameIndex = 0;
  this.initialW = game.canvas.width * 0.04;
  this.initialH = game.canvas.height * 0.05;
  this.initialx = this.game.canvas.width -750;
  this.initialy = this.game.canvas.height -60; 
  // this.setListeners();  
}

Player.prototype.draw = function() {
  this.game.ctx.drawImage(this.img, 
    this.img.frameIndex * Math.floor(this.img.width / this.img.frames),
    0,
    Math.floor(this.img.width / this.img.frames),
    this.img.height,
    this.x,
    this.y,
    this.width*1.5,
    this.height*1.5);
  this.animateImg();
};

/* Player.prototype.setListeners = function() {
  document.onkeydown = function(event) {
    if (event.keyCode === 38) { //UP
      this.y -= 78;
      if(this.y <= this.game.canvas.height -750) {
        this.y += 78;
      }
      if(this.game.score <= 7) {
        this.game.score += 1;
      }
    }
    if (event.keyCode === 37) { //LEFT
      this.x -= 78;
      if(this.x <= this.game.canvas.width -1300) {
        this.x += 78;
      }
    }
    if (event.keyCode === 39) { //RIGHT
      this.x += 78;
      if(this.x >= this.game.canvas.width) {
        this.x -= 78;
      }
    }
    if (event.keyCode === 40) { //DOWN
      this.y += 78;
      if(this.y >= this.game.canvas.height) {
        this.y -= 78;
      }
      if(this.game.score > 0) {
        this.game.score--        
      }
    }
  }.bind(this); 

  document.onkeyup = function(event) {
    if (event.keyCode === 38) { //UP

    }
    if (event.keyCode === 37) { //LEFT

    }
    if (event.keyCode === 39) { //RIGHT

    }
    if (event.keyCode === 40) { //DOWN

    }
  }.bind(this);
};*/

Player.prototype.up = function () {
  this.width += 2
  this.height += 2
};

Player.prototype.down = function() {
  this.width = this.initialW
  this.height = this.initialH
}

Player.prototype.jump = function() {
  if (this.game.framesCounter % 10 === 0) {
    this.up();
  }
  if (this.game.framesCounter % 20 === 0) {
    this.down();  
  }
}

Player.prototype.animateImg = function() {
  if (this.game.framesCounter % 12 === 0) {
    this.img.frameIndex += 1;
    if (this.img.frameIndex > 2) this.img.frameIndex = 0;
  }
};