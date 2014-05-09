
var KEYCODE_START = 49; // 1
var KEYCODE_TOGGLE_INTERIOR = 50; // 2
var KEYCODE_RESET = 27; // ESC
var KEYCODE_ENTER = 13;                
var KEYCODE_SPACE = 32;                

var KEYCODE_LEFT = 37;
var KEYCODE_RIGHT = 39;                
var KEYCODE_UP = 38;
var KEYCODE_DOWN = 40;
var KEYCODE_W = 87;                        
var KEYCODE_A = 65;                        
var KEYCODE_S = 83;
var KEYCODE_D = 68;

var screen_width;
var screen_height;

var starfield;
var spacestation;
var meteoroidfield;

var fpsCounter;

var TILESIZE = 48;


//allow for WASD and arrow control scheme
function handleKeyDown(event) {
    switch (event.keyCode) {
        case KEYCODE_A:
        case KEYCODE_LEFT:
            spacestation.lfHeld = true;
            meteoroidfield.lfHeld = true;
            break;
        case KEYCODE_D:
        case KEYCODE_RIGHT:
            spacestation.rtHeld = true;
            meteoroidfield.rtHeld = true;
            break;
        case KEYCODE_W:
        case KEYCODE_UP:
            spacestation.fwHeld = true;
            meteoroidfield.fwHeld = true;
            break;
        case KEYCODE_S:
        case KEYCODE_DOWN:
            spacestation.bkHeld = true;
            meteoroidfield.bkHeld = true;
            break;

        case KEYCODE_START:
            startGame();
            break;
        case KEYCODE_TOGGLE_INTERIOR:
            spacestation.show_interior = !spacestation.show_interior;
            break;
        case KEYCODE_RESET:
            reset();
            break;
    }
}


function handleKeyUp(event) {
    switch (event.keyCode) {
        case KEYCODE_A:
        case KEYCODE_LEFT:
            spacestation.lfHeld = false;
            meteoroidfield.lfHeld = false;
            break;
        case KEYCODE_D:
        case KEYCODE_RIGHT:
            spacestation.rtHeld = false;
            meteoroidfield.rtHeld = false;
            break;
        case KEYCODE_W:
        case KEYCODE_UP:
            spacestation.fwHeld = false;
            meteoroidfield.fwHeld = false;
            break;
        case KEYCODE_S:
        case KEYCODE_DOWN:
            spacestation.bkHeld = false;
            meteoroidfield.bkHeld = false;
            break;
    }
}

function init() {

    //find canvas and load images, wait for last image to load
    window.canvas = document.getElementById("html5Canvas");
    window.canvas.width = window.innerWidth;
    window.canvas.height = window.innerHeight;

    // grab canvas width and height for later calculations:
    screen_width = canvas.width;
    screen_height = canvas.height;

    window.onresize = function () {
        screen_width = window.innerWidth;
        screen_height = window.innerHeight;
        window.canvas.width = screen_width;
        window.canvas.height = screen_height;
    };

    // create a new stage and point it at our canvas:
    window.stage = new window.createjs.Stage(window.canvas);
    window.stage.enableMouseOver(5);

    window.contentManager = new ContentManager();
    window.contentManager.SetDownloadCompleted(startGame);
    window.contentManager.StartDownload();
}

function reset() {
    window.stage.removeAllChildren();
    window.createjs.Ticker.removeAllEventListeners();
    window.stage.update();
}

function startGame() {
    reset();

    starfield = new Starfield();
    starfield.initialise(100);

    this.planet = new window.createjs.Bitmap(window.preload.getResult("planet_desert"));
    this.planet.setTransform(screen_width - this.planet.image.width * 1.5, screen_height / 2);
    window.stage.addChild(this.planet);

    spacestation = new SpaceStation();
    spacestation.initialize();

    meteoroidfield = new MeteoroidField();
    meteoroidfield.initialise(6);

    fpsCounter = new window.createjs.Text("", "22px Audiowide", "white");
    fpsCounter.lineWidth = 100;
    fpsCounter.textAlign = "right";
    fpsCounter.x = window.canvas.width;
    window.stage.addChild(fpsCounter);

    window.createjs.Ticker.addEventListener('tick', tick);
    window.createjs.Ticker.setFPS(60);

    //register key functions
    document.onkeydown = handleKeyDown;
    document.onkeyup = handleKeyUp;
}


function tick(event) {

    starfield.update();
    meteoroidfield.update(event);
    if (spacestation.lfHeld) {
        this.planet.x += (spacestation.navspeed / 2) * (event.delta / 1000);
    }
    if (spacestation.rtHeld) {
        this.planet.x -= (spacestation.navspeed / 2) * (event.delta / 1000);
    }
    if (spacestation.fwHeld) {
        this.planet.y += (spacestation.navspeed / 2) * (event.delta / 1000);
    }
    if (spacestation.bkHeld) {
        this.planet.y -= (spacestation.navspeed / 2) * (event.delta / 1000);
    }
    spacestation.update(event);

    fpsCounter.text = Math.round(window.createjs.Ticker.getMeasuredFPS()) + " FPS";

    // update the stage:
    window.stage.update();
}

