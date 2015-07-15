new Firebase("https://blaster.firebaseio.com/");

var ranking = ref.child("ranking")

newRecord = function(nick, score) {
	var nick = "lala";
	var score = iScore;

	ranking.set({
		nick: {
			score: score
		}
	});

};


