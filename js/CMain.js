function CMain(oData){
	var _bUpdate;
    var _iCurResource = 0;
    var RESOURCE_TO_LOAD = 0;
    var _iState = STATE_LOADING;
    var _oData;
    
    var _oPreloader;
    var _oMenu;
    var _oHelp;
    var _oGame;

    this.initContainer = function(){
        s_oCanvas = document.getElementById("canvas");
        s_oStage = new createjs.Stage(s_oCanvas);
        createjs.Touch.enable(s_oStage);
		
	s_bMobile = jQuery.browser.mobile;
        if(s_bMobile === false){
            s_oStage.enableMouseOver(20);  
            $('body').on('contextmenu', '#canvas', function(e){ return false; });
        }
		
        s_iPrevTime = new Date().getTime();

	createjs.Ticker.addEventListener("tick", this._update);
        createjs.Ticker.setFPS(30);
        
		if(navigator.userAgent.match(/Windows Phone/i)){
			DISABLE_SOUND_MOBILE = true;
		}
		
        /*
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            this._initSounds();
        }
        */
        
        s_oSpriteLibrary  = new CSpriteLibrary();

        //ADD PRELOADER
        _oPreloader = new CPreloader();

        this._loadImages();
		
		_bUpdate = true;
    };
    
    this.soundLoaded = function(){
         _iCurResource++;

         if(_iCurResource === RESOURCE_TO_LOAD){
             _oPreloader.unload();
            
            if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
                s_oSoundTrack = createjs.Sound.play("soundtrack",{ loop:100});
            }
            this.gotoMenu();
         }
    };
    
    this._initSounds = function(){
         if (!createjs.Sound.initializeDefaultPlugins()) {
             return;
         }

        if(navigator.userAgent.indexOf("Opera")>0 || navigator.userAgent.indexOf("OPR")>0){
                createjs.Sound.alternateExtensions = ["m4a"];
                createjs.Sound.addEventListener("fileload", createjs.proxy(this.soundLoaded, this));

                createjs.Sound.registerSound("./sounds/ds_duck_hit.ogg", "duck_hit",5);
                createjs.Sound.registerSound("./sounds/ds_duck_intro.ogg", "duck_intro",5);
                createjs.Sound.registerSound("./sounds/ds_game_over.ogg", "game_over",5);
                createjs.Sound.registerSound("./sounds/ds_no_bullets.ogg", "click");
                createjs.Sound.registerSound("./sounds/ds_shot.ogg", "shot");
                createjs.Sound.registerSound("./sounds/ds_soundtrack.ogg", "soundtrack");
        }else{
                createjs.Sound.alternateExtensions = ["ogg"];
                createjs.Sound.addEventListener("fileload", createjs.proxy(this.soundLoaded, this));

                createjs.Sound.registerSound("./sounds/ds_duck_hit.m4a", "duck_hit",5);
                createjs.Sound.registerSound("./sounds/ds_duck_intro.m4a", "duck_intro",5);
                createjs.Sound.registerSound("./sounds/ds_game_over.m4a", "game_over",5);
                createjs.Sound.registerSound("./sounds/ds_no_bullets.m4a", "click");
                createjs.Sound.registerSound("./sounds/ds_shot.m4a", "shot");
                createjs.Sound.registerSound("./sounds/ds_soundtrack.m4a", "soundtrack");
        }
        
        RESOURCE_TO_LOAD += 6;
        
    };

    this._loadImages = function(){
        s_oSpriteLibrary.init( this._onImagesLoaded,this._onAllImagesLoaded, this );

        s_oSpriteLibrary.addSprite("but_play","./images/play.png"); // ***
        s_oSpriteLibrary.addSprite("but_exit","./images/close.png"); // ***
        s_oSpriteLibrary.addSprite("bg_menu","./images/splash-screen.png"); // ***
        s_oSpriteLibrary.addSprite("msg_box","./images/msg_box.png"); // ***
        
        s_oSpriteLibrary.addSprite("but_left","./sprites/but_left.png");
        s_oSpriteLibrary.addSprite("but_right","./sprites/but_right.png");
        s_oSpriteLibrary.addSprite("but_up","./sprites/but_up.png");
        s_oSpriteLibrary.addSprite("but_down","./sprites/but_down.png");
        s_oSpriteLibrary.addSprite("but_upleft","./sprites/but_up_left.png");
        s_oSpriteLibrary.addSprite("but_downleft","./sprites/but_down_left.png");
        s_oSpriteLibrary.addSprite("but_upright","./sprites/but_up_right.png");
        s_oSpriteLibrary.addSprite("but_downright","./sprites/but_down_right.png");
        
        s_oSpriteLibrary.addSprite("shot_panel","./images/btn_cargar.png"); // ***
        s_oSpriteLibrary.addSprite("hit_panel","./images/barra.png"); // ***
        s_oSpriteLibrary.addSprite("bullet","./images/smart-stick.png"); // ***
        s_oSpriteLibrary.addSprite("tap_shot","./images/goo.png"); // ***
        s_oSpriteLibrary.addSprite("hit_icon","./images/hit_icon.png"); // ***
        s_oSpriteLibrary.addSprite("audio_icon","./sprites/audio_icon.png");
        s_oSpriteLibrary.addSprite("bg_game","./images/back.png"); // ***
        s_oSpriteLibrary.addSprite("grass","./images/grass.png"); // ***
        s_oSpriteLibrary.addSprite("tree","./images/tree.png"); // ***
        s_oSpriteLibrary.addSprite("scope","./images/mira.png"); // ***
        s_oSpriteLibrary.addSprite("tap_shot","./images/goo.png"); // ***
        s_oSpriteLibrary.addSprite("duck_1","./images/target1.png"); // ***
        s_oSpriteLibrary.addSprite("duck_2","./images/target2.png"); // ***
        s_oSpriteLibrary.addSprite("duck_3","./images/target3.png"); // ***
        s_oSpriteLibrary.addSprite("duck_4","./images/target4.png"); // ***
        s_oSpriteLibrary.addSprite("duck_5","./images/target5.png"); // ***
        s_oSpriteLibrary.addSprite("target","./sprites/target.png");
        s_oSpriteLibrary.addSprite("life_panel","./images/vida.png"); // weird
		s_oSpriteLibrary.addSprite("help_panel_desktop","./images/gato.png"); // ***
        s_oSpriteLibrary.addSprite("help_panel_mobile","./sprites/help_panel_mobile.png");
        s_oSpriteLibrary.addSprite("score_panel","./images/puntos.png"); // new
        s_oSpriteLibrary.addSprite("time_panel","./images/bonus-time.png"); // new
        s_oSpriteLibrary.addSprite("facebook","./images/facebook.png"); // new
        s_oSpriteLibrary.addSprite("google","./images/google+.png"); // new
        s_oSpriteLibrary.addSprite("twitter","./images/twitter.png"); // new
        
        RESOURCE_TO_LOAD += s_oSpriteLibrary.getNumSprites();
        s_oSpriteLibrary.loadSprites();
    };
    
    this._onImagesLoaded = function(){
        _iCurResource++;
        var iPerc = Math.floor(_iCurResource/RESOURCE_TO_LOAD *100);
        _oPreloader.refreshLoader(iPerc);
        
        if(_iCurResource === RESOURCE_TO_LOAD){
            _oPreloader.unload();
            
            if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
                s_oSoundTrack = createjs.Sound.play("soundtrack",{ loop:100});
            }
            
            this.gotoMenu();
        }
    };
    
    this._onAllImagesLoaded = function(){
        
    };
    
    this.onAllPreloaderImagesLoaded = function(){
        this._loadImages();
    };
    
    this.gotoMenu = function(){
        _oMenu = new CMenu();
        _iState = STATE_MENU;
    };

    this.gotoGame = function(){
        _oGame = new CGame(_oData);   
							
        _iState = STATE_GAME;
        
        $(s_oMain).trigger("game_start");
    };
    
    this.gotoHelp = function(){
        _oHelp = new CHelp();
        _iState = STATE_HELP;
    };
	
	this.stopUpdate = function(){
		_bUpdate = false;
	};
	
	this.startUpdate = function(){
		_bUpdate = true;
	};
    
    this._update = function(event){
		if(_bUpdate === false){
			return;
		}
        var iCurTime = new Date().getTime();
        s_iTimeElaps = iCurTime - s_iPrevTime;
        s_iCntTime += s_iTimeElaps;
        s_iCntFps++;
        s_iPrevTime = iCurTime;
        
        if ( s_iCntTime >= 1000 ){
            s_iCurFps = s_iCntFps;
            s_iCntTime-=1000;
            s_iCntFps = 0;
        }
                
        if(_iState === STATE_GAME){
            _oGame.update();
        }
        
        s_oStage.update(event);

    };
    
    s_oMain = this;
    
    _oData = oData;
    
    this.initContainer();
}
var s_bMobile;
var s_bAudioActive = true;
var s_iCntTime = 0;
var s_iTimeElaps = 0;
var s_iPrevTime = 0;
var s_iCntFps = 0;
var s_iCurFps = 0;

var s_oDrawLayer;
var s_oStage;
var s_oMain;
var s_oSpriteLibrary;
var s_oSoundTrack;
var s_oCanvas;