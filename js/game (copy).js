function Game(canvadId) {
  this.canvas = document.getElementById(canvadId);
  this.ctx = this.canvas.getContext("2d");
  this.fps = 60;
  this.reset();
}

Game.prototype.start = function() {
  this.interval = setInterval(function() {
    this.clear();
    this.framesCounter++;
    if (this.framesCounter > 1000) {
      this.framesCounter = 1;
    }
    if (this.framesCounter % 200 === 0) {
      this.generateObstacle();
    }

    this.draw();

    if (this.framesCounter % 10 === 0) {
      this.player.up();
    }
    if (this.framesCounter % 20 === 0) {
      this.player.down();  
    }
    this.moveObstacles();
    this.treesCollision();
    if (this.obstacleCollision()) {
      this.obstacle.dx++;
      console.log("hola")
    }
    this.clearObstacles();
    if (this.isCollision()) {
      //this.gameOver();
      console.log("Colision")
    }
    this.win();
  }.bind(this), 800 / this.fps);
};

Game.prototype.stop = function() {
  clearInterval(this.interval);
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
  this.stop();
  if(confirm("Game over. Play again?")) {
    this.reset();
    this.start();
  }
};

Game.prototype.reset = function() {
  this.background = new Background(this);
  this.player = new Player(this);
  this.trees = new Trees(this);
  this.obstacles = [];
  this.treesArr = [];
  this.framesCounter = 0;
  this.score = 0;
  this.generateTrees();  
};

Game.prototype.isCollision = function() {
  return (this.obstacles.some(function(obstacle) {
    return (
      this.player.x >= obstacle.x &&
      this.player.x <= obstacle.x + obstacle.w &&
      this.player.y <= obstacle.y &&
      this.player.y + this.player.h >= obstacle.y
    )}.bind(this)));
  };

Game.prototype.clearObstacles = function() {
  this.obstacles = this.obstacles.filter(function(obstacle) {
    if (obstacle.x <= 2000 && obstacle.x >= -2000) {
      return obstacle.x <= 2000;
    }
  });
};

Game.prototype.generateObstacle = function() {
  var size = 80;
  var imagesRight = ["./img/miniRight.png", "./img/mercRight.png", "./img/vanRight.png", "./img/convRight.png"]
  var imagesLeft = ["./img/mercLeft.png", "./img/blueLeft.png", "./img/vanLeft.png", "./img/convLeft.png"]
  for(var i = 0; i < 3; i++){
    this.obstacles.push(new Obstacle(this, 
    -this.canvas.width + Math.floor(Math.random()*(600-400+1)+400),
    this.canvas.height - 150  - i * size,
    -Math.floor(Math.random()*(2-1.5+1)+1.5),
    imagesRight[Math.floor(Math.random()*(3-0+1)+0)], i));
    }
  for(var i = 3; i < 6; i++){
    this.obstacles.push(new Obstacle(this,
    this.canvas.width + Math.floor(Math.random()*(600-400+1)+400),
    this.canvas.height - 95  - (i-3) * size - 365,
    Math.floor(Math.random()*(5-1+1)+1),
    imagesLeft[Math.floor(Math.random()*(3-0+1)+0)], i));
    // console.log(this.obstacles)
  }
};

Game.prototype.generateTrees = function() {
  var size = 40;
  var imagesTrees = ["./img/car2.png", "./img/carblue.png"]
  for(var i = 0; i < 3; i++){
    this.treesArr.push(new Trees(this, 50 + i * size, 370));
    }
  for(var i = 0; i < 3; i++){
    this.treesArr.push(new Trees(this, 600 + i * size, 370));
    }
  for(var i = 0; i < 3; i++){
    this.treesArr.push(new Trees(this, 1120 + i * size, 370));
    }
};

Game.prototype.treesCollision = function() {
  this.treesArr.forEach(function(tree){
    // console.log(this.player.x)
    // console.log(tree.x) 
    if(tree.y <= this.player.y &&
      tree.y + tree.h >= this.player.y + this.player.h &&
      tree.x >= this.player.x &&
      tree.x <= this.player.x + this.player.w){
      this.player.y -= 79;
    };
  }.bind(this))
}

Game.prototype.obstacleCollision = function() {
  var obstacles600 = this.obstacles.filter(function(obstacle) {
   
  });

    //  obstacle.x == obstacle.x + obstacle.w

}

Game.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

Game.prototype.draw = function() {
  this.background.draw();
  this.player.draw();
  this.treesArr.forEach(function(tree) { tree.draw(); });
  this.obstacles.forEach(function(obstacle) { obstacle.draw(); });
  this.ctx.font = "36px sans-serif";
  this.ctx.fillStyle = "white";
  this.ctx.fillText("Score: " + Math.floor(this.score), 25, 50);
};

Game.prototype.moveObstacles = function() {
  this.obstacles.forEach(function(obstacle){
      obstacle.move();
    });
};