Timinator.ScrambleGenerator = Ember.Object.create({
	randomElement: function(a){
		return a[Math.floor(Math.random() * a.length)];
	},

	generate3x3x3: function(){
		var faces = ["U", "D", "L", "R", "F", "B"];
		var directions = ["", "'", "2"];
		var lastFace = "", nextFace = "";
		var buff = "";

		var i, numTurns = 25;
		for(i=0; i<numTurns; i++){
			while(lastFace == nextFace){
				nextFace = this.randomElement(faces);
			}
			lastFace = nextFace;
			buff += nextFace + this.randomElement(directions) + " ";
		}

		return buff;
	}
});
