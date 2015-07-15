function CGame(oData){
    var _iScore;
    var _iBullets;  
    var _iNumDuck;
    var _iCurTimeElaps;
    var _iDuckOnScreen;
    var _iPlayerLife;
    var _iCurStage;
    var _iMultiShot;
    var _iMaxDucks;
    var _iCurTouchX;
    var _iCurTouchY;
	var _iContTouchMS;
   
    var _bClicked=false;
    var _bStartGame=false;
    var _bTouchActive;
      
    var _aDucks;    
    var _aStart;
    var _aEndLeft;
    var _aEndRight;
    var _aRandStart;
    var _aRandEnd;
   
    var _oInterface;
    var _oEndPanel = null;
    var _oGrassContainer;
    var _oTreeContainer;
    var _oDuckContainer;
    var _oHelpPanel;
    var _oEndPanel;   
    var _oScope;

    var _oButUp;
    var _oButDown;
    var _oButLeft;
    var _oButRight;
    var _oButUpRight;
    var _oButDownRight;
    var _oButUpLeft;
    var _oButDownLeft;
    
    this._init = function(){
        _iScore = 0;
        _iNumDuck = 0;
        _iCurTimeElaps = BONUS_TIME;        
        _iBullets=NUM_BULLETS;
        _iDuckOnScreen=0;
        _iPlayerLife=PLAYER_LIVES;
        _iCurStage=0;
        _iMaxDucks=0;
		_iMultiShot=0;
        
        _bTouchActive=false;
        
        _aStart = new Array();
        _aEndLeft = new Array();
        _aEndRight = new Array();
        _aRandStart = new Array();
        _aRandEnd = new Array();
                
        _oInterface = new CInterface();
        
        var oBg = createBitmap(s_oSpriteLibrary.getSprite('bg_game'));
        s_oStage.addChild(oBg); 
 
        var oSprite = s_oSpriteLibrary.getSprite('tree');
        var oTree = new createBitmap(oSprite);
        _oTreeContainer = new createjs.Container();
        _oTreeContainer.y = 30;
        s_oStage.addChild(_oTreeContainer);               
        _oTreeContainer.addChild(oTree);
 
 
        _oDuckContainer = new createjs.Container();
        s_oStage.addChild(_oDuckContainer);

        this._initDucks();
        this._initPos();
        this.initDuckObj();

        
        var oSprite = s_oSpriteLibrary.getSprite('grass');
        var oGrass = createBitmap(oSprite);
        _oGrassContainer = new createjs.Container();
        _oGrassContainer.y = CANVAS_HEIGHT- oSprite.height;
        s_oStage.addChild(_oGrassContainer);               
        _oGrassContainer.addChild(oGrass);

        _oScope = new CScope();
        _oInterface = new CInterface();

        /*_oButUp = createBitmap(s_oSpriteLibrary.getSprite('but_up'));
        _oButUp.x=70;
        _oButUp.y=550;
        s_oStage.addChild(_oButUp);
        
        _oButDown = createBitmap(s_oSpriteLibrary.getSprite('but_down'));
        _oButDown.x=70;
        _oButDown.y=656;
        s_oStage.addChild(_oButDown);
        
        _oButLeft = createBitmap(s_oSpriteLibrary.getSprite('but_left'));
        _oButLeft.x=4;
        _oButLeft.y=615;
        s_oStage.addChild(_oButLeft);
        
        _oButRight = createBitmap(s_oSpriteLibrary.getSprite('but_right'));
        _oButRight.x=110;
        _oButRight.y=616;
        s_oStage.addChild(_oButRight);
        
        _oButUpRight = createBitmap(s_oSpriteLibrary.getSprite('but_upright'));
        _oButUpRight.x=110;
        _oButUpRight.y=559;
        s_oStage.addChild(_oButUpRight);
        
        _oButDownRight = createBitmap(s_oSpriteLibrary.getSprite('but_downright'));
        _oButDownRight.x=110;
        _oButDownRight.y=656;
        s_oStage.addChild(_oButDownRight);
        
        _oButUpLeft = createBitmap(s_oSpriteLibrary.getSprite('but_upleft'));
        _oButUpLeft.x=14;
        _oButUpLeft.y=559;
        s_oStage.addChild(_oButUpLeft);
        
        _oButDownLeft =createBitmap(s_oSpriteLibrary.getSprite('but_downleft'));
        _oButDownLeft.x=14;
        _oButDownLeft.y=656;
        s_oStage.addChild(_oButDownLeft);*/

        _oHelpPanel = CHelpPanel();
    

        //TOUCH EVENTS
        if(s_bMobile) {
            //IE BROWSER
            if (window.navigator.msPointerEnabled) {
				_iContTouchMS = 0;
                s_oCanvas.addEventListener("MSPointerDown", this.onTouchStartMS, false);
                s_oCanvas.addEventListener("MSPointerMove", this.onTouchMoveMS, false);
                s_oCanvas.addEventListener("MSPointerUp", this.onTouchEndMS, false);
            }else{
                s_oCanvas.addEventListener( 'touchstart', this.onTouchStart, false );
                s_oCanvas.addEventListener( 'touchmove', this.onTouchMove, false );
                s_oCanvas.addEventListener( 'touchend', this.onTouchEnd, false );
            }
        }else{
            //KEY LISTENER
			document.onkeydown   = onKeyDown; 
            document.onkeyup   = onKeyUp; 
			
			//MOUSE EVENTS
            s_oStage.addEventListener( 'stagemousedown', this.onMouseStart, false );
			s_oStage.addEventListener( 'stagemousemove', this.onMouseMove, false );
			s_oStage.addEventListener( 'stagemouseup', this.onMouseEnd, false );
        }
		
		if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
			s_oSoundTrack.setVolume(0.5);
		}
    };
    
	this.onMouseStart = function(event) {
		event = event || window.event
		
        _iCurTouchX = parseInt(event.stageX);
        _iCurTouchY = parseInt(event.stageY);
        
        _bTouchActive=true; 
    };
    
    this.onMouseMove = function(event) {
        if(_bTouchActive === false){
			return;
		}
		
        _iCurTouchX = parseInt(event.stageX);
        _iCurTouchY = parseInt(event.stageY);
    };
    
    this.onMouseEnd = function() {
        _bTouchActive=false;
		_oScope.resetAllDirection();
    };
	
    this.onTouchStart = function(event) {	
		if(_bTouchActive){
			return;
		}
        _iCurTouchX = parseInt((event.touches[0].pageX -s_oCanvasLeft)/ s_iScaleFactor);
        _iCurTouchY = parseInt((event.touches[0].pageY-s_oCanvasTop) / s_iScaleFactor);
        _bTouchActive=true; 
    };
    
    this.onTouchMove = function(event) {
        event.preventDefault(); 

        _iCurTouchX = parseInt((event.touches[0].pageX  -s_oCanvasLeft) / s_iScaleFactor);
        _iCurTouchY = parseInt((event.touches[0].pageY - s_oCanvasTop) / s_iScaleFactor);
    };
    
    this.onTouchEnd = function(event) {
		if(event.touches.length === 0){
			_bTouchActive=false;
			_oScope.resetAllDirection();
		}
    };
    
    this.onTouchStartMS = function(event) {
		_iContTouchMS++;
		if(_iContTouchMS > 1){
			return;
		}
		
        _iCurTouchX = parseInt(((event.pageX || event.targetTouches[0].pageX) -s_oCanvasLeft )/ s_iScaleFactor);
        _iCurTouchY = parseInt(((event.pageY || event.targetTouches[0].pageY) -s_oCanvasTop)/ s_iScaleFactor);
		
        _bTouchActive=true;
        
    };
    
    this.onTouchMoveMS = function(event) {
        if (window.navigator.msPointerEnabled && !event.isPrimary){
                return;
        }
        
        event.preventDefault(); 

        _iCurTouchX = parseInt(((event.pageX || event.targetTouches[0].pageX)-s_oCanvasLeft) / s_iScaleFactor);
        _iCurTouchY = parseInt(((event.pageY || event.targetTouches[0].pageY)-s_oCanvasTop) / s_iScaleFactor);
    };
    
    this.onTouchEndMS = function(event) {
		_iContTouchMS--;
		if(_iContTouchMS === 0){
			_bTouchActive=false;
			_oScope.resetAllDirection();
		}
    };
    
    this.unload = function(){
        _bStartGame = false;
        
        _oScope.unload();
        _oInterface.unload();
        if(_oEndPanel !== null){
            _oEndPanel.unload();
        }
        
        for(var i=0;i<_aDucks.length;i++){
            _aDucks[i].unload();
        }
        
		s_oStage.removeAllChildren();
    };
    
    //Read the maximum ducks number between stages, inserted by user. 
    this._initDucks = function(){
        
        for(var i=0; i<DUCK_ON_SCREEN.length; i++){
            if(_iMaxDucks<DUCK_ON_SCREEN[i])
				_iMaxDucks=DUCK_ON_SCREEN[i];    
			}
        
        _aDucks = new Array();

        for(var i=0; i<_iMaxDucks; i++){
            _aDucks.push(new CDuck(_oDuckContainer));
        }
    };
    
    this._initPos = function(){
        var iOffset=51;
        while(iOffset<CANVAS_WIDTH){
            _aStart.push(new createjs.Point(iOffset,565));
            iOffset+=CANVAS_WIDTH/20;
        }
        
        for(var i=0; i<_aStart.length; i++){
            _aRandStart.push(i);
        }
                
        //Set Standard End Position       
        _aEndLeft[0]= new createjs.Point(-120,400); //offset is set to 120 to be sure that the duck exit out the screen
        _aEndLeft[1]= new createjs.Point(-120,200);
        _aEndLeft[2]= new createjs.Point(250,-120);
        _aEndLeft[3]= new createjs.Point(500,-120);
        
        _aEndRight[0]= new createjs.Point(CANVAS_WIDTH+120,400);
        _aEndRight[1]= new createjs.Point(CANVAS_WIDTH+120,200);
        _aEndRight[2]= new createjs.Point(1000,-120);
        _aEndRight[3]= new createjs.Point(750,-120);
        
       
        for(var i=0; i<_aEndLeft.length; i++){
            _aRandEnd.push(i);
        }
        
    };
    
    
    
    this.initDuckObj = function(){
        
        
        //Set random start position
        if(_iCurStage===DUCK_ON_SCREEN.length){
            _iCurStage=0;                        
            for(var i=0; i<_aDucks.length; i++){
                _aDucks[i].increaseSpeed();
            }
        }
               
        shuffle(_aRandStart);
        shuffle(_aRandEnd);
                
        //Reset Ducks position, and check that other ducks don't start from same one        
        for (var i=0; i<DUCK_ON_SCREEN[_iCurStage]; i++){
            if (_aRandStart[i]<_aStart.length/2){
                    _aDucks[i].reset(_aStart[_aRandStart[i]],_aEndRight[_aRandEnd[i]]);
                }else {
					_aDucks[i].reset(_aStart[_aRandStart[i]],_aEndLeft[_aRandEnd[i]]);
				}
        
            _iNumDuck++;
            _aDucks[i].show();
        }
        
        _iDuckOnScreen=DUCK_ON_SCREEN[_iCurStage];
        _iCurStage++;    
            
        this._refreshScreen();
        
    };
    
    
    
    this.checkDuck = function(){
        _iDuckOnScreen--;
        if(_iDuckOnScreen===0){
			this.initDuckObj();
		}
    };
    
    
    function onKeyUp(evt) { 
        //SPACEBAR
        if(evt.keyCode === 32 && _bStartGame===true){
            s_oGame.onShot();
        }else if(evt.keyCode === 37) {
            _oScope.leftStop();
        }else if(evt.keyCode === 38) {
            _oScope.upStop();
        }else if(evt.keyCode === 39) {
            _oScope.rightStop();
        }else if(evt.keyCode === 40) {
            _oScope.downStop();
        }
        
    }

    function onKeyDown(evt) { 
        if(!evt){ 
            evt = window.event; 
        }  

        switch(evt.keyCode) {  
           // left  
           case 37: {
                   s_oGame.onLeft();
                   break; 
               }
           //up  
           case 38: {
                   s_oGame.onUp();
                   break; 
               }         
                
           // right  
           case 39: {
                   s_oGame.onRight();
                   break; 
               }
		   //down
           case 40: {
                   s_oGame.onDown();
                   break; 
               }     
        }  
    }
    
    
    this.onKeyUpReleased = function(){
       _oScope.upStop();
    };
    
    this.onKeyDownReleased = function(){
       _oScope.downStop();
    };
    
    this.onKeyLeftReleased = function(){
       _oScope.leftStop();
    };
    
    this.onKeyRightReleased = function(){
       _oScope.rightStop();
    };
    
    this.onLeft = function(){
       _oScope.moveLeft();
    };
    
    this.onRight = function(){
        _oScope.moveRight();
        
    };
       
    this.onUp = function(){
        _oScope.moveUp();
    };
      
    this.onDown = function(){
        _oScope.moveDown();
    };
    
    this.onShot = function(){
        if(_iBullets === 0){
            _oInterface.noAmmo();
            if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
				createjs.Sound.play("click");
			}
        } else {
            _iBullets--;
            _oInterface.refreshBullets(_iBullets);
            _oScope.playShot();
            _bClicked=true;
        }
    };
    
    this._reloadRifle = function(){
        _iBullets = NUM_BULLETS;
        _oInterface.reloadBullets(_iBullets);
    };
    
    this._showTime = function(){        
        _oInterface.refreshTime(_iCurTimeElaps);
    };
    
    this._checkIfDuckHit = function(oDuck){
        if(_oScope.bullsEye().x > oDuck.target().x){
            if(_oScope.bullsEye().x < (oDuck.target().x+oDuck.target().w)){
                if(_oScope.bullsEye().y > oDuck.target().y){
                    if(_oScope.bullsEye().y<(oDuck.target().y+oDuck.target().h)){
                        return true;                
                    }                                                            
                }                                        
            }                            
        }   
    };
    
    this.checkCollision = function(oDuck){
          //CHECK COLLISION BETWEEN DUCK AND SCOPE         
          if (this._checkIfDuckHit(oDuck)&& _bClicked && oDuck.isVisible()&&!oDuck.isHit()) {  
            oDuck.onHit();
            
			var iTmpScore = (SCORE_HIT + _iCurTimeElaps);
			
			// Check if more then one duck is hit by one shot
			_iMultiShot++;
			if(_iMultiShot > 1){            
				iTmpScore *= _iMultiShot;
				_oInterface.viewMultiScore(_iMultiShot);            
			}
			_iMultiShot=0;
			
            _iScore += iTmpScore;

			new CScoreText(iTmpScore,oDuck.getPos().x,oDuck.getPos().y);

			_oInterface.refreshScore(_iScore);
			
            if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
				createjs.Sound.play("duck_hit");
			}
        }
    };
    
    this.setHitPane=function(){
        _oInterface.setHit();       
    };
    
    this.setNoHitPane=function(){
        _oInterface.setNoHit();
    };
    
    this.subtractLife=function(){
        _iPlayerLife--;
        
        if(_iPlayerLife === 0){
            this.gameOver();
            _bStartGame=false;
        }
		_oInterface.refreshLife(_iPlayerLife);
    };
    
    this._refreshScreen = function(){
        this._reloadRifle();
        _iCurTimeElaps=BONUS_TIME;
        _oInterface.cleanScore();
        _oInterface.noAmmoDelete();
                
    };

    this.onExit = function(){
        this.unload();
        s_oMain.gotoMenu();
        
        $(s_oMain).trigger("restart");
    };
    
    this._onExitHelp = function () {
         _bStartGame = true;
    };
    
    this.gameOver = function(){  
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            createjs.Sound.play("game_over");
        }
        
        _oEndPanel = CEndPanel(s_oSpriteLibrary.getSprite('msg_box'));
        _oEndPanel.show(_iScore);
    };
    
    this.checkController = function(){
		
		var oPoint = _oButUpRight.globalToLocal(_iCurTouchX, _iCurTouchY);
		
        if(_oButUpRight.hitTest(oPoint.x,oPoint.y)){
            _oScope.moveUp();
            _oScope.moveRight();
            
            _oScope.downStop();
            _oScope.leftStop();
			return;
            
        } 
		
		oPoint = _oButDownRight.globalToLocal(_iCurTouchX, _iCurTouchY);
		if (_oButDownRight.hitTest(oPoint.x,oPoint.y)){
            _oScope.moveDown();
            _oScope.moveRight();
            
            _oScope.upStop();
            _oScope.leftStop();
            return;
        }

		oPoint = _oButUpLeft.globalToLocal(_iCurTouchX, _iCurTouchY);
		if (_oButUpLeft.hitTest(oPoint.x,oPoint.y)){
            _oScope.moveUp();
            _oScope.moveLeft();
            
            _oScope.downStop();
            _oScope.rightStop();
			return;
        } 
		
		oPoint = _oButDownLeft.globalToLocal(_iCurTouchX, _iCurTouchY);
		if (_oButDownLeft.hitTest(oPoint.x,oPoint.y)){
            _oScope.moveDown();
            _oScope.moveLeft();
            
            _oScope.upStop();
            _oScope.rightStop();
			return;
            
        }

		oPoint = _oButUp.globalToLocal(_iCurTouchX, _iCurTouchY);
		if (_oButUp.hitTest(oPoint.x,oPoint.y)){
            _oScope.moveUp();
            
            _oScope.downStop();
            _oScope.rightStop();
            _oScope.leftStop();
			
			return;
            
        } 
		
		oPoint = _oButDown.globalToLocal(_iCurTouchX, _iCurTouchY);
		if (_oButDown.hitTest(oPoint.x,oPoint.y)){
            _oScope.moveDown();
            
            _oScope.upStop();
            _oScope.rightStop();
            _oScope.leftStop();
			return;
            
        } 

		oPoint = _oButLeft.globalToLocal(_iCurTouchX, _iCurTouchY);
		if (_oButLeft.hitTest(oPoint.x,oPoint.y)){
            _oScope.moveLeft();
            
            _oScope.downStop();
            _oScope.rightStop();
            _oScope.upStop();
			return;
            
        } 
		
		oPoint = _oButRight.globalToLocal(_iCurTouchX, _iCurTouchY);
		if (_oButRight.hitTest(oPoint.x,oPoint.y)){
            _oScope.moveRight();
            
            _oScope.downStop();
            _oScope.upStop();
            _oScope.leftStop();
            return;
        } 
		
		
        _oScope.resetAllDirection();
    };
    
    this.update = function(){
        if(_bStartGame){      
            
			if(_bTouchActive){
				this.checkController();
			}
            
			for(var i=0; i<_iMaxDucks; i++){
				_aDucks[i].update();
				this.checkCollision(_aDucks[i]);
			}
			
			_bClicked=false;
			_oScope.update();

			_iCurTimeElaps -= s_iTimeElaps;
			if(_iCurTimeElaps < 0){
				_iCurTimeElaps = 0;
			}
			
			this._showTime();
        }
    };

    s_oGame=this;
    
	SCOPE_ACCELERATION = oData.scope_accelleration;
	SCOPE_FRICTION = oData.scope_friction;
	MAX_SCOPE_SPEED = oData.max_scope_speed;
	NUM_BULLETS = oData.num_bullets;
	SCORE_HIT = oData.hit_score;
	BONUS_TIME = oData.bonus_time;
	PLAYER_LIVES = oData.lives;
	DUCK_INCREASE_SPEED = oData.duck_increase_speed;
	DUCK_ON_SCREEN = oData.duck_occurence;

    this._init();
}

var s_oGame;
