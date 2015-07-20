var db = new Firebase("https://blaster.firebaseio.com/");

newRecord = function(nick, score) {
	nick = "lala";
	//var score = _iScore;

	var newEntry = {
		nick: score
	};

	db.update(newEntry);

};
