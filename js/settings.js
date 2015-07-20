window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

var CANVAS_WIDTH = 1024;
var CANVAS_HEIGHT = 768;
var DISABLE_SOUND_MOBILE = false;

var FPS_TIME      = 1000/24;

var STATE_LOADING = 0;
var STATE_MENU    = 1;
var STATE_HELP    = 1;
var STATE_GAME    = 3;

var ON_MOUSE_DOWN = 0;
var ON_MOUSE_UP   = 1;
var ON_MOUSE_OVER = 2;
var ON_MOUSE_OUT  = 3;
var ON_DRAG_START = 4;
var ON_DRAG_END   = 5;
var ON_PRESS_MOVE = 6;


var SCOPE_ACCELERATION;
var SCOPE_FRICTION;
var MAX_SCOPE_SPEED;
var NUM_BULLETS;
var SCORE_HIT;
var BONUS_TIME;
var PLAYER_LIVES;
var DUCK_INCREASE_SPEED;
var DUCK_START_SPEED = 1;