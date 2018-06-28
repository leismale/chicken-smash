function Trees(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.w = 60;
    this.h = 60;
    this.imgTop = new Image();
    this.imgTop.src = "./img/tree.png";
}

Trees.prototype.draw = function() {
    this.game.ctx.drawImage(this.imgTop, this.x, this.y, this.w, this.h);
};

Trees.prototype.move = function() {
    this.x -= this.dx;
};