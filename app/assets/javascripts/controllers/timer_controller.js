Timinator.SolveMethodTimerController = Ember.Controller.extend({
	needs: ["solveMethod", "puzzle", "solve", "solves", "currentUser"],
	solveMethodBinding: "controllers.solveMethod",
	puzzleBinding: "controllers.puzzle",
	solveBinding: "controllers.solve",
	solvesBinding: "controllers.solves",

	time: 0,
	startTime: 0,
	isTiming: false,
	isNotTiming: function(){ return !this.get("isTiming"); }.property("isTiming"),

	animationHandle: null,

	solveMethodChanged: function(){
		this.get("solves").clear();
		this.get("solve").set("model", this.newSolve());
	}.observes("solveMethod.model"),

	newSolve: function(){
		var user = this.get("controllers.currentUser.model");
		var puzzle = this.get("puzzle.model");
		var solveMethod = this.get("solveMethod.model");
		var solve = this.store.createRecord('solve', {
			datetime: Date.now(),
			solveMethod: solveMethod,
			user: user,
			scramble: Timinator.ScrambleGenerator.generate(puzzle)
		});

		return solve;
	},

	logSolve: function(){
		var oldSolve = this.get("solve.model");
		this.get("solves").addObject(oldSolve);

		var newSolve = this.newSolve();
		this.get("solve").set("model", newSolve);		
	},

	totalTime: function(){
		var total =  this.get("solve.totalTime") + this.get("time");
		return Timinator.Math.thousandthPrecision(total);
	}.property("solve.totalTime", "time"),


	resetTime: function(){
		this.set("startTime", Date.now());
	},

	actions: {
		step: function(){
			/*
				Start timing, or advance the state of the solve.

				If the solve is done, stop timing.
			*/
			var solve = this.get("solve");

			if(!this.get("isTiming")){
				this.set("isTiming", true);
				this.resetTime();
				this.timestep();
			}
			else if(solve.advance(this.get("time"))){
				this.resetTime();
			}
			else{
				this.send("stop");
			}
		},

		stop: function(){
			if(!this.get("isTiming")){
				return;
			}

			this.set("isTiming", false);
			cancelAnimationFrame(this.get("animationHandle"));

			this.logSolve();

			this.set("solve.currentStepIndex", 0);
			this.set("time", 0);
		},

		setScramble: function(scramble){
			this.get("solve").set("scramble", scramble);
		},
	},

	timestep: function(){
		if(!this.get("isTiming")){
			return;
		}
		var elapsed = Timinator.Math.msInSeconds(Date.now() - this.get("startTime"));
		this.set("time", elapsed);

		var timer = this;
		var animationHandle = requestAnimationFrame(function(){
			timer.timestep();
		});

		this.set("animationHandle", animationHandle);
	}
});