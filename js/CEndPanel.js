function CEndPanel(oSpriteBg){
    
    var _oBg;
    var _oGroup;
    var _rankings;

    function labelWithShadow (x, y) {
        var shadow = new createjs.Text("","bold 40px walibi0615bold", "#000");
        shadow.x = x + 1;
        shadow.y = y;
        shadow.textAlign = "center";

        var label = new createjs.Text("","bold 40px walibi0615bold", "#ffffff");
        label.x = x;
        label.y = y + 2;
        label.textAlign = "center";
     
        return {label: label, shadow: shadow};    
    }

    
    this._init = function(oSpriteBg){

        
        _oBg = createBitmap(oSpriteBg);

      
     
        _oGroup = new createjs.Container();
        _oGroup.alpha = 0;
        _oGroup.visible=false;
        
        _oGroup.addChild(_oBg);

        _rankings = [];
        for (var i = 0; i < 5; i++) {
            var xRanking = (CANVAS_WIDTH/2) - 150;
            var yRanking = (CANVAS_HEIGHT/2) - 100 + (i * 50);

            var _name = labelWithShadow(xRanking, yRanking);
            var _score = labelWithShadow(xRanking + 250, yRanking);

            _rankings.push({ name: _name, score: _score });

            _oGroup.addChild( _name.label, _name.shadow, _score.label, _score.shadow );
        }


        s_oStage.addChild(_oGroup);
    };
    
    this.unload = function(){
        _oGroup.off("mousedown",this._onExit);
    };
    
    this._initListener = function(){
        _oGroup.on("mousedown",this._onExit);
    };
    
    this.show = function(iScore){
        createjs.Sound.play("game_over");
        

        _oGroup.visible = true;



        var topFive = db.orderByValue().limitToLast(5);
        topFive.on("value", function(snapshot) {
            var ranking = [];
            snapshot.forEach(function(data) {
                ranking.unshift({name: data.key(), score:  data.val()});
            });

            for(var i = 0; i < 5; i++) {
               console.log(i, ranking[i]);

               var name = ranking[i] ? ranking[i].name : "";
               var score = ranking[i] ? ranking[i].score : "";

               var _ranking = _rankings[i];
               _ranking.name.label.text = name;
               _ranking.name.shadow.text = name;

               _ranking.score.label.text = score;
               _ranking.score.shadow.text = score;
            }
        });
        
        var oParent = this;
        createjs.Tween.get(_oGroup).to({alpha:1 }, 500).call(function() {oParent._initListener();});
        
        $(s_oMain).trigger("save_score",iScore);
    };
    
    this._onExit = function(){
        _oGroup.off("mousedown",this._onExit);
        s_oStage.removeChild(_oGroup);
        
        s_oGame.onExit();
    };
    
    this._init(oSpriteBg);
    
    return this;
}