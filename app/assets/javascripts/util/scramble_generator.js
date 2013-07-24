Timinator.ScrambleGenerator = Ember.Object.create({
	randomElement: function(a){
		return a[Math.floor(Math.random() * a.length)];
	},

	generate3x3x3: function(){
		// This is too-much-coffee-fueled cutesy crap, 
		var faces = ["U", "L", "F", "D", "R", "B"]; // These are ordered so that you can identify the axis by: index % 3
		var directions = ["", "'", "2"];

		var turns = [];
		var i, numTurns = 25, numFaces = faces.length;
		var lastIndex = Math.floor(Math.random() * numFaces);
		var randIndex;

		for(i=0; i<numTurns; i++){
			/*
				The approach here is to add a number, N, to the last index, 
				then modulo by the number of faces to wrap around, 
				such that you can't repeat a face.

				N is at least 1, and at most 5 (numFaces - 1).
			*/
			do{
				var N = Math.floor(Math.random() * (numFaces - 1)) + 1;
				randIndex = (lastIndex + N) % numFaces;
			} while(
				// We have to check for redundant sequences. i.e. 3 turns in a row can't be coaxial.
				((lastIndex % 3) == (randIndex % 3)) && // We're okay if this turn and the last one aren't coaxial.
				turns[i-2] && // We're okay if we don't have 3 turns yet. (array out of bounds is 'undefined' in JS, and this makes the .faceIndex lookup in the next clause safe)
				((turns[i-2].faceIndex % 3) == (randIndex % 3 )) // We're okay if this turn and the one two turns ago aren't coaxial
			);

			lastIndex = randIndex;
			turns.push({
				faceIndex: randIndex,
				direction: this.randomElement(directions)
			});
		}

		return turns.map(function(turn){
			return faces[turn.faceIndex] + turn.direction;
		}).join(" ");
	}
});
