function Player(game) {
  this.game = game;
  this.width = game.canvas.width * 0.04;
  this.height = game.canvas.height * 0.05;
  this.x = this.game.canvas.width -750;
  this.y = this.game.canvas.height - 65;
  this.w = this.width;
  this.h = this.height;
  this.img = new Image();
  this.img.src = './img/flappy.png';
  this.initialW = game.canvas.width * 0.04;
  this.initialH = game.canvas.height * 0.05;
  this.initialx = this.game.canvas.width -750;
  this.initialy = this.game.canvas.height -60; 
  this.setListeners();  
}

Player.prototype.draw = function() {
  this.game.ctx.drawImage(this.img, this.x , this.y, this.width, this.height);
};

Player.prototype.setListeners = function() {
  document.onkeydown = function(event) {
    if (event.keyCode === 38) { //UP
      this.y -= 78;
      if(this.y <= this.game.canvas.height -750) {
        this.y += 78;
      }
      if(this.game.score <= 7) {
        this.game.score += 1;
      }

      // console.log(this.x)
      // console.log(this.w)
      console.log(this.y + this.h)
      // console.log(this.h)
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
};

Player.prototype.up = function () {
  this.width += 2
  this.height += 2
};

Player.prototype.down = function() {
  this.width = this.initialW
  this.height = this.initialH
}