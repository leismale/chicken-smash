/* function Sound(game) {
    this.game = game;
    if (!createjs.Sound.initializeDefaultPlugins()) {return;}
 
    var audioPath = "./sounds/";
    var sounds = [
        {id:"jump", src:"jump.aiff"},
        {id:"carPassing", src:"carPassing.wav"}
    ];
 
   // createjs.Sound.addEventListener("fileload", handleLoad);
    createjs.Sound.registerSounds(sounds, audioPath);
}
 
function handleLoad(event) {
   createjs.Sound.play(event.src);
   createjs.Sound.play("jump");
   var jump = createjs.Sound.play("jump");
} */

function Sound(game) {
    this.game = game;
    this.jump = new Audio("./sounds/jump.mp3");
    this.crash = new Audio("./sounds/crash.mp3")
    this.cars = new Audio("./sounds/carPassing.mp3")
    this.win = new Audio("./sounds/chicken.mp3")
}