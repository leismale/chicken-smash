function Game(canvadId) {
  this.canvas = document.getElementById(canvadId);
  this.ctx = this.canvas.getContext("2d");
  this.fps = 60;
  this.newGame();
  this.reset();
  this.lastPosition = [];
  this.time = 3000;
  this.increment = 2;
  this.generateObsRate = 150;
  this.score = 1;
}

Game.prototype.start = function(maxSpeed, generateObsRate) {
  this.speedCars(maxSpeed);
  this.interval = setInterval(
    function() {
      this.clear();
      this.framesCounter++;
      if (this.framesCounter > 1000) {
        this.framesCounter = 1;
      }
      if (this.framesCounter % generateObsRate === 0) {
        this.generateObstacle();
      }

      this.draw();
      this.moveObstacles();
      this.clearObstacles();

      if (this.background.counter <= 360 && this.background.counter > 0) {
        this.background.countDown();
        if (this.score > 1) {
          this.background.nextLevel();
        }
        this.background.counter--;
        this.player.x = this.player.initialx;
        this.player.y = this.player.initialy;
        this.disableKeyboard();
      }
       else if (this.background.counter == 0) {
        this.setListeners();
        this.counter();
        this.treesCollision();

        if (this.isCollision()) {
          this.sound.crash.play();
          this.disableKeyboard();
          this.background.lose();
          this.gameOver();
        }
        
        this.checkTime();
        this.win();
      }
    }.bind(this),
    800 / this.fps
  );
};

Game.prototype.stop = function() {
  clearInterval(this.interval);
  this.setListeners();
  this.reset();
};

Game.prototype.win = function() {
  if (this.player.y <= 100) {
    this.increment++;
    this.generateObsRate -= 5;
    this.sound.win.play();
    this.background.nextLevel();
    this.background.counter = 360;
    this.stop();
    this.newGame(this.increment, Math.round(this.generateObsRate));
    this.score++;
  }
};

Game.prototype.newGame = function(increment, generateObsRate) {
  if (!increment) {
    this.start(3, 150);
  } else {
    this.start(3 + increment, generateObsRate);
  }
};

Game.prototype.gameOver = function() {
  this.player.x = this.initialx;
  this.player.y = this.initialy;
  this.stop();
  this.score = 1;
  this.increment = 2;
  this.generateObsRate = 150;
  this.disableKeyboard();
};

Game.prototype.reset = function() {
  this.background = new Background(this);
  this.player = new Player(this);
  this.trees = new Trees(this);
  this.sound = new Sound(this);
  this.obstacles = [];
  this.treesArr = [];
  this.framesCounter = 199;
  this.time = 3000;
  this.generateTrees();
};

Game.prototype.isCollision = function() {
  return this.obstacles.some(
    function(obstacle) {
      return (
        this.player.x + this.player.w >= obstacle.x &&
        this.player.x <= obstacle.x + obstacle.w &&
        this.player.y + this.player.h >= obstacle.y &&
        this.player.y <= obstacle.y + obstacle.h
      );
    }.bind(this)
  );
};

Game.prototype.clearObstacles = function() {
  this.obstacles = this.obstacles.filter(function(obstacle) {
    if (obstacle.x <= 2000 && obstacle.x >= -2000) {
      return obstacle.x <= 2000;
    }
  });
};

Game.prototype.treesCollision = function() {
  this.treesArr.forEach(
    function(tree) {
      if (
        this.player.x + this.player.w >= tree.x &&
        this.player.x < tree.x + tree.w &&
        this.player.y + this.player.h > tree.y &&
        this.player.y < tree.y + tree.h
      ) {
        this.player.x = this.lastPosition[this.lastPosition.length - 4];
        this.player.y = this.lastPosition[this.lastPosition.length - 3];
      }
    }.bind(this)
  );
};

var speed = [];
Game.prototype.speedCars = function(maxSpeed) {
  for (var i = 0; i < 6; i++) {
    speed[i] = Math.floor(Math.random() * (maxSpeed - 2 + 1) + 2);
  }
};

Game.prototype.generateObstacle = function() {
  var size = 80;
  var imagesRight = [
    "./img/blueRight.png",
    "./img/bugRight.png",
    "./img/convRight.png",
    "./img/mercRight.png",
    "./img/miniRight.png",
    "./img/redRight.png",
    "./img/vanRight.png"
  ];
  var imagesLeft = [
    "./img/blueLeft.png",
    "./img/bugLeft.png",
    "./img/convLeft.png",
    "./img/mercLeft.png",
    "./img/miniLeft.png",
    "./img/redLeft.png",
    "./img/vanLeft.png"
  ];
  for (var i = 0; i < 3; i++) {
    this.obstacles.push(
      new Obstacle(
        this,
        -this.canvas.width + Math.floor(Math.random() * (440 - 350 + 1) + 350),
        this.canvas.height - 150 - i * size,
        -speed[i],
        imagesRight[Math.floor(Math.random() * (6 - 0 + 1) + 0)]
      )
    );
  }
  for (var i = 3; i < 6; i++) {
    this.obstacles.push(
      new Obstacle(
        this,
        this.canvas.width + Math.floor(Math.random() * (440 - 350 + 1) + 350),
        this.canvas.height - 95 - (i - 3) * size - 365,
        speed[i],
        imagesLeft[Math.floor(Math.random() * (6 - 0 + 1) + 0)]
      )
    );
  }
};

Game.prototype.generateTrees = function() {
  var size = 50;
  for (var i = 0; i < 4; i++) {
    this.treesArr.push(new Trees(this, 90 + i * size, 366));
  }
  for (var i = 0; i < 4; i++) {
    this.treesArr.push(new Trees(this, 550 + i * size, 366));
  }
  59;
  for (var i = 0; i < 4; i++) {
    this.treesArr.push(new Trees(this, 1010 + i * size, 366));
  }
};

Game.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

Game.prototype.draw = function() {
  this.background.draw();
  this.player.draw();
  this.lastPosition.push(this.player.x, this.player.y);
  this.treesArr.forEach(function(tree) {
    tree.draw();
  });
  this.obstacles.forEach(function(obstacle) {
    obstacle.draw();
  });
  this.ctx.font = "36px Amatica SC";
  this.ctx.fillStyle = "white";
  this.ctx.fillText("LEVEL: " + this.score, 25, 62);
  this.background.time();
};

Game.prototype.moveObstacles = function() {
  this.obstacles.forEach(function(obstacle) {
    obstacle.move();
  });
};

Game.prototype.setListeners = function() {
  document.onkeydown = function(event) {
    if (event.keyCode === 38) {
      //UP
      this.player.y -= 78;
      this.sound.jump.play();
      if (this.player.y <= this.canvas.height - 750) {
        this.player.y += 78;
      }
    }
    if (event.keyCode === 37) {
      //LEFT
      this.player.x -= 75;
      this.sound.jump.play();
      if (this.player.x <= this.canvas.width - 1300) {
        this.player.x += 75;
      }
    }
    if (event.keyCode === 39) {
      //RIGHT
      this.sound.jump.play();
      this.player.x += 75;
      if (this.player.x >= this.canvas.width) {
        this.player.x -= 75;
      }
    }
    if (event.keyCode === 40) {
      //DOWN
      this.sound.jump.play();
      this.player.y += 78;
      if (this.player.y >= this.canvas.height) {
        this.player.y -= 78;
      }
    }
  }.bind(this);
};

Game.prototype.disableKeyboard = function() {
  document.onkeydown = function(e) {
    if (event.keyCode === 13) {
      //ENTER
      this.stop();
      this.reset();
      this.newGame(3, 150);
      this.time = 3000;
    } else {
      return false;
    }
  }.bind(this);
};

Game.prototype.checkTime = function() {
  if (this.time <= 0) {
    this.background.lose();
    this.gameOver();
  }
};

Game.prototype.counter = function() {
  this.time--;
  this.sound.cars.play();
};