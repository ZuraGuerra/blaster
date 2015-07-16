function CInterface(){
    var _iGlobIndex;
    var _oButExit;
    var _oButLeft;
    var _oHitPanel;
    var _oScoreNumber;
	var _oScoreNumberBack;
    var _oMultiScore;
    var _oAmmoText;
    var _oLifeNum;    
    var _aHitIcon;
    var _aBullet;
    var _aDuckPane;
    
    var _oScoreTextBack;
    var _oScoreText;
    var _oTimeText;
    var _oHelpPanel;
    var _oTimeScore;
    var _oHitText;
    var _oAudioToggle;

    var _oLifePanel;
    
    
    this._init = function(){
        _iGlobIndex=0;
        _aDuckPane = new Array();
        
        _oLifePanel = createBitmap(s_oSpriteLibrary.getSprite('life_panel'));
        _oLifePanel.x = 770;
        _oLifePanel.y = 600;
        s_oStage.addChild(_oLifePanel);
        
        /* _oButShot = new CGfxButton(897,688,s_oSpriteLibrary.getSprite('shot_panel'),true);
        _oButShot.addEventListener(ON_MOUSE_UP, this._onShot, this); Fire móvil*/

        _oHitPanel = createBitmap(s_oSpriteLibrary.getSprite('hit_panel'));
        _oHitPanel.x = 218;
        _oHitPanel.y = 643;
        s_oStage.addChild(_oHitPanel);
        
        _oHitText = new createjs.Text(TEXT_HIT,"bold 30px walibi0615bold", "#ffffff");
        _oHitText.x = 238;
        _oHitText.y = 663;
        s_oStage.addChild(_oHitText);
        
        _oTimeText = new createjs.Text(TEXT_BONUS,"bold 22px walibi0615bold", "#ffffff");
        _oTimeText.x = 360;
        _oTimeText.y = 658;
        s_oStage.addChild(_oTimeText);
        
		_oScoreTextBack = new createjs.Text(TEXT_SCORE,"bold 30px walibi0615bold", "#000");
        _oScoreTextBack.x = 32;
        _oScoreTextBack.y = 12; 
        s_oStage.addChild(_oScoreTextBack);
		
        _oScoreText = new createjs.Text(TEXT_SCORE,"bold 30px walibi0615bold", "#ffffff");
        _oScoreText.x = 30;
        _oScoreText.y = 10; 
        s_oStage.addChild(_oScoreText);
        
        _oAmmoText = new createjs.Text(TEXT_NOAMMO,"bold 30px walibi0615bold", "#ffffff");
        _oAmmoText.x = 800;
        _oAmmoText.y = 670; 
		_oAmmoText.lineWidth = 60;
		_oAmmoText.shadow = new createjs.Shadow("#000", 2, 2, 2);
        _oAmmoText.visible=false;
        s_oStage.addChild(_oAmmoText);
        
        _oLifeNum = new createjs.Text("X "+PLAYER_LIVES,"bold 18px walibi0615bold", "#ffffff");
        _oLifeNum.x = 875;
        _oLifeNum.y = 645;
        _oLifeNum.textAlign="right";
		_oLifeNum.textBaseline = "alphabetic";
        s_oStage.addChild(_oLifeNum);
        
		_oScoreNumberBack = new createjs.Text("0","bold 30px walibi0615bold", "#000");
        _oScoreNumberBack.x = 172;
        _oScoreNumberBack.y = 12;
        s_oStage.addChild(_oScoreNumberBack);
		
        _oScoreNumber = new createjs.Text("0","bold 30px walibi0615bold", "#ffffff");
        _oScoreNumber.x = 170;
        _oScoreNumber.y = 10;
        s_oStage.addChild(_oScoreNumber);

        _oMultiScore = new createjs.Text("","bold 30px walibi0615bold", "yellow");
		_oMultiScore.textAlign = "center";
		_oMultiScore.shadow = new createjs.Shadow("#000", 2, 2, 2);
        
        _oTimeScore = new createjs.Text("0000","bold 30px ComicSansMS-Bold", "#ffffff");
        _oTimeScore.x = 660;
        _oTimeScore.y = 682;
        _oTimeScore.textAlign="right";
		_oTimeScore.textBaseline = "alphabetic";
        s_oStage.addChild(_oTimeScore);
        
        _aHitIcon = new Array();
        
        var oSprite = s_oSpriteLibrary.getSprite('hit_icon');
        var oData = {   
                        images: [oSprite], 
                        // width, height & registration point of each sprite
                        frames: {width: 51, height: 43}, 
                        animations: {  nohit: [0], hit:[1]}
                   };
        
        var oObjSpriteSheet = new createjs.SpriteSheet(oData);
        
        var iX = 230;
        var iY = 710;
        
        for(var i=0; i<9; i++){
            var oIcon = createSprite(oObjSpriteSheet, "nohit",0,0,51,43);
            oIcon.x = iX;
            oIcon.y = iY;
            oIcon.visible=false;
            s_oStage.addChild(oIcon);
           
            
            _aHitIcon[i] = oIcon;            
            iX += 58;            
        }

        _aBullet = new Array();
        
        var jX = 800;
        var jY = 680;
        for(var i=0; i<NUM_BULLETS; i++){
            var oIcon = createBitmap(s_oSpriteLibrary.getSprite('bullet'));
            oIcon.x = jX;
            oIcon.y = jY;       
            s_oStage.addChild(oIcon);
            
            _aBullet[i] = oIcon;             
            jX += 30;            
        }
       
        var oExitX;
        
        var oSprite = s_oSpriteLibrary.getSprite('but_exit');
        _oButExit = new CGfxButton(CANVAS_WIDTH - (oSprite.height/2)- 10,(oSprite.height/2) + 10,oSprite,true);
        _oButExit.addEventListener(ON_MOUSE_UP, this._onExit, this);
        
        oExitX = CANVAS_WIDTH - (oSprite.width/2) - 80;
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            var oSprite = s_oSpriteLibrary.getSprite('audio_icon');
            _oAudioToggle = new CToggle(oExitX,10+ (oSprite.height/2),oSprite,s_bAudioActive);
            _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
       
        }

    };
    
    this.unload = function(){
        _oButExit.unload();
        _oButExit = null;
      //  _oButShot.unload(); Fire móvil
      //  _oButShot = null;
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oAudioToggle.unload();
            _oAudioToggle = null;
        }
    
    };

    this.refreshScore = function(iScore){
		_oScoreNumberBack.text = iScore;
        _oScoreNumber.text = iScore;
    };
    
    this.refreshTime = function(iTime){
        _oTimeScore.text = iTime;
    };

    this.viewMultiScore = function (num){
        _oMultiScore.text = TEXT_MULTIPLY+" X"+num;
        _oMultiScore.x=CANVAS_WIDTH/2;
        _oMultiScore.y=CANVAS_HEIGHT/2;
        s_oStage.addChild(_oMultiScore);
    };
    
    this.cleanScore = function(){
        s_oStage.removeChild(_oMultiScore);
    };
    
    this.refreshLife= function(iLife){
        _oLifeNum.text="X "+iLife;
    };
    
    this.refreshBullets = function(iBullets){
        _aBullet[iBullets].visible=false;
    };
    
    this.reloadBullets = function(iBullets){
        for(var i=0; i<iBullets; i++)
            _aBullet[i].visible=true;
    };
    
    this.noAmmo = function(){
        _oAmmoText.visible=true;
        _oAmmoText.alpha=1;
        createjs.Tween.get(_oAmmoText, {override:true}).to({alpha:0}, 1000, createjs.Ease.quadIn);
    };
    
    this.noAmmoDelete = function(){
        _oAmmoText.visible=false;
        createjs.Tween.removeTweens(_oAmmoText);
    };
    
    this.setHit = function(){
        _aDuckPane.push(true);
        this._setVisibleDuck();
    };
    
    this.setNoHit = function(){
        _aDuckPane.push(false);        
        this._setVisibleDuck();
        
        
    };
    
    this._setVisibleDuck=function(){
        if(_iGlobIndex>8){
            for(var i=0; i<8; i++){
                if(_aDuckPane[_iGlobIndex-8+i]===true){
                    _aHitIcon[i].gotoAndPlay("hit");                    
                } else {
                    _aHitIcon[i].gotoAndPlay("nohit");
                }                       
            }
            if(_aDuckPane[_iGlobIndex]===true){
                _aHitIcon[8].gotoAndPlay("hit");
            } else {
                _aHitIcon[8].gotoAndPlay("nohit");
            }
            
        }else{
        
            if(_aDuckPane[_iGlobIndex]===true){
                _aHitIcon[_iGlobIndex].gotoAndPlay("hit");
                _aHitIcon[_iGlobIndex].visible=true;                
            } else if (_aDuckPane[_iGlobIndex]===false){
                _aHitIcon[_iGlobIndex].gotoAndPlay("nohit");
                _aHitIcon[_iGlobIndex].visible=true;
            }
        }
        _iGlobIndex++;
    };

     this._onKeyUpReleased = function(){
        s_oGame.onKeyUpReleased();
    };
    
     this._onKeyDownReleased = function(){
        s_oGame.onKeyDownReleased();
    };
   
    this._onKeyRightReleased = function(){
        s_oGame.onKeyRightReleased();
    };
   
    this._onKeyLeftReleased = function(){
        s_oGame.onKeyLeftReleased();
    };
    
    this._onLeftPressed = function(){
        s_oGame.onLeft();
    };
    
    
    this._onRightPressed = function(){
        s_oGame.onRight();
    };
    
    
    this._onDownPressed = function(){
        s_oGame.onDown();
    };
    
    
    this._onUpPressed = function(){
        s_oGame.onUp();
    };
    
   
    this._onShot = function(){
        s_oGame.onShot();
    };
    
    this.onExitFromHelp = function(){
        _oHelpPanel.unload();
    };
    
    this._onAudioToggle = function(){
        createjs.Sound.setMute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };
    
    this._onExit = function(){
      s_oGame.onExit();  
    };
    
    this._init();
    
    return this;
}