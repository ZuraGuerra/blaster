function CHelpPanel(){
    var _oText1;
    var _oText1Back;
    var _oText2;
    var _oText2Back;
    var _oText3;
    var _oText3Back;
    var _oMessage1;
    var _oMessage2;
    var _oHelpBg;
    var _oGroup;

    this._init = function(){
		var oSprite;
		if(s_bMobile){
			oSprite = s_oSpriteLibrary.getSprite('help_panel_mobile');
		}else{
			oSprite = s_oSpriteLibrary.getSprite('help_panel_desktop')
		}

        _oHelpBg = createBitmap(oSprite);
        s_oStage.addChild(_oHelpBg);
        
        if(s_bMobile=== false){
            _oMessage1=TEXT_HELP1;
            _oMessage2=TEXT_HELP2;
        } else {
            _oMessage1=TEXT_HELP_MOB1;
            _oMessage2=TEXT_HELP_MOB2;
        }
        
        _oText1Back = new createjs.Text(_oMessage1,"bold 22px walibi0615bold", "#000000");
        _oText1Back.textAlign = "left";
		_oText1Back.lineWidth = 360;
        _oText1Back.x = 230;
        _oText1Back.y = 212;
		
		_oText1 = new createjs.Text(_oMessage1,"bold 22px walibi0615bold", "#ffffff");
        _oText1.textAlign = "left";
		_oText1.lineWidth = 360;
        _oText1.x = 232;
        _oText1.y = 210;

        _oText2Back = new createjs.Text(_oMessage2,"bold 22px walibi0615bold", "#000000");
        _oText2Back.textAlign = "left";
		_oText2Back.lineWidth = 300;
        _oText2Back.x = 230;
        _oText2Back.y = 342;
		
		_oText2 = new createjs.Text(_oMessage2,"bold 22px walibi0615bold", "#ffffff");
        _oText2.textAlign = "left";
		_oText2.lineWidth = 300;
        _oText2.x = 232;
        _oText2.y = 340;
        
        _oText3Back = new createjs.Text(TEXT_HELP3,"bold 22px walibi0615bold", "#000000");
        _oText3Back.textAlign = "left";
		_oText3Back.lineWidth = 440;
        _oText3Back.x = 230;
        _oText3Back.y = 462;
		
		_oText3 = new createjs.Text(TEXT_HELP3,"bold 22px walibi0615bold", "#ffffff");
        _oText3.textAlign = "left";
		_oText3.lineWidth = 440;
        _oText3.x = 232;
        _oText3.y = 460;
		
		_oGroup = new createjs.Container();
        _oGroup.addChild(_oHelpBg,_oText1Back,_oText1,_oText2Back,_oText2,_oText3Back,_oText3);
        s_oStage.addChild(_oGroup);
		
	
		
        var oParent = this;
        _oGroup.on("pressup",function(){oParent._onExitHelp()});
        
        
    };

    this.unload = function(){
        s_oStage.removeChild(_oGroup);

        var oParent = this;
        _oGroup.off("pressup",function(){oParent._onExitHelp()});
    };

    this._onExitHelp = function(){
        this.unload();
        s_oGame._onExitHelp();
    };

    this._init();

}