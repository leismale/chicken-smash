function Game(canvadId) {
  this.canvas = document.getElementById(canvadId);
  this.ctx = this.canvas.getContext("2d");
  this.fps = 60;
  this.reset();
  this.lastPosition = [];
  this.setListeners();
}

Game.prototype.start = function() {
  this.speedCars();
  this.interval = setInterval(function() {
    this.clear();
    this.framesCounter++;

    if (this.framesCounter > 1000) {
      this.framesCounter = 1;
    }
    if (this.framesCounter % 100 === 0) {
      this.generateObstacle();
    }

    this.draw();
    this.moveObstacles();
    this.treesCollision();
    this.clearObstacles();
    this.checkTime();
    
    if (this.isCollision()) {
      this.player.img.src = './img/boom.png';
      this.background.loose();
      this.gameOver();
    }
    this.win();
  }.bind(this), 800 / this.fps);
};

Game.prototype.stop = function() {
  clearInterval(this.interval);
  clearInterval(this.interval2);
};

Game.prototype.win = function() {
  if(this.score == 8) {
    if(confirm("You win. Play again?")) {
      this.reset();
      this.start();
    }
  }
}

Game.prototype.gameOver = function() {
  this.player.x = this.initialx;
  this.player.y = this.initialy;
  this.stop();
};

Game.prototype.reset = function() {
  this.background = new Background(this);
  this.player = new Player(this);
  this.trees = new Trees(this);
  this.obstacles = [];
  this.treesArr = [];
  this.framesCounter = 199;
  this.score = 0;
  this.generateTrees();  
  this.time = 30;
  this.interval2 = 0;
  this.interval2 = setInterval(function(){
    this.time--;
  }.bind(this),1000)
};

Game.prototype.isCollision = function() {
  return (this.obstacles.some(function(obstacle) {
    return (
      this.player.x >= obstacle.x &&
      this.player.x <= obstacle.x + obstacle.w &&
      this.player.y >= obstacle.y &&
      this.player.y <= obstacle.y + obstacle.h
    )}.bind(this)));
  };

Game.prototype.clearObstacles = function() {
  this.obstacles = this.obstacles.filter(function(obstacle) {
    if (obstacle.x <= 2000 && obstacle.x >= -2000) {
      return obstacle.x <= 2000;
    }
  });
};

var speed = [];
Game.prototype.speedCars = function () {
  for(var i = 0; i < 6; i++){
    speed[i] = Math.floor(Math.random()*(10-1.5+1)+1.5); 
  }
}

Game.prototype.generateObstacle = function() {
  var size = 80;
  var imagesRight = ["./img/miniRight.png", "./img/mercRight.png", "./img/vanRight.png", "./img/convRight.png"]
  var imagesLeft = ["./img/mercLeft.png", "./img/blueLeft.png", "./img/vanLeft.png", "./img/convLeft.png"]
  for(var i = 0; i < 3; i++){
    this.obstacles.push(new Obstacle(this, 
    -this.canvas.width + Math.floor(Math.random()*(270-130+1)+130),
    this.canvas.height - 150  - i * size,
    // -Math.floor(Math.random()*(2-1.5+1)+1.5),
    -speed[i],
    imagesRight[Math.floor(Math.random()*(3-0+1)+0)]));
  }
  for(var i = 3; i < 6; i++){
    this.obstacles.push(new Obstacle(this,
    this.canvas.width + Math.floor(Math.random()*(270-130+1)+130),
    this.canvas.height - 95  - (i-3) * size - 365,
    // Math.floor(Math.random()*(5-1+1)+1),
    speed[i],
    imagesLeft[Math.floor(Math.random()*(3-0+1)+0)]));
  }
};

Game.prototype.generateTrees = function() {
  var size = 50;
  var imagesTrees = ["./img/car2.png", "./img/carblue.png"]
  for(var i = 0; i < 4; i++){
    this.treesArr.push(new Trees(this, 90 + i * size, 360));
    }
  for(var i = 0; i < 5; i++){
    this.treesArr.push(new Trees(this, 525 + i * size, 360));
    }
  for(var i = 0; i < 4; i++){
    this.treesArr.push(new Trees(this, 1010 + i * size, 360));
    }
};

Game.prototype.treesCollision = function() {
  this.treesArr.forEach(function(tree){
    if(this.player.x >= tree.x &&
      this.player.x <= tree.x + tree.w &&
      this.player.y >= tree.y &&
      this.player.y <= tree.y + tree.h) {
      this.player.x = this.lastPosition[this.lastPosition.length -4];
      this.player.y = this.lastPosition[this.lastPosition.length -3];
    };
  }.bind(this))
}

Game.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

Game.prototype.draw = function() {
  this.background.draw();
  this.player.draw();
  this.lastPosition.push(this.player.x, this.player.y);  
  this.treesArr.forEach(function(tree) { tree.draw(); });
  this.obstacles.forEach(function(obstacle) { obstacle.draw(); });
  this.ctx.font = "36px Amatica SC";
  this.ctx.fillStyle = "white";
  this.ctx.fillText("SCORE: " + Math.floor(this.score), 25, 62);
  this.background.time();
};

Game.prototype.moveObstacles = function() {
  this.obstacles.forEach(function(obstacle){
      obstacle.move();
    });
};


Game.prototype.setListeners = function() {
  document.onkeydown = function(event) {
    if (event.keyCode === 38) { //UP
      this.player.y -= 78;
      if(this.player.y <= this.canvas.height -750) {
        this.player.y += 78;
      }
/*       if(this.game.score <= 7) {
        this.game.score += 1;
      } */
    }
    if (event.keyCode === 37) { //LEFT
      this.player.x -= 75;
      if(this.player.x <= this.canvas.width -1300) {
        this.player.x += 75;
      }
    }
    if (event.keyCode === 39) { //RIGHT
      this.player.x += 75;
      if(this.player.x >= this.canvas.width) {
        this.player.x -= 75;
      }
    }
    if (event.keyCode === 40) { //DOWN
      this.player.y += 78;
      if(this.player.y >= this.canvas.height) {
        this.player.y -= 78;
      }
    }
    if (event.keyCode === 13) { //ENTER
      this.stop();
      this.reset();
      this.start();
    } 
/*       if(this.game.score > 0) {
        this.game.score--        
      } */
  }.bind(this)
};

Game.prototype.checkTime = function() {
  if(this.time <= 0) {
    this.background.loose();
    this.gameOver();
  }
}