Timinator.TimerController = Ember.Controller.extend({
	needs: ["method", "puzzle", "solve", "solves"],
	methodBinding: "controllers.method",
	puzzleBinding: "controllers.puzzle",
	solveBinding: "controllers.solve",
	solvesBinding: "controllers.solves",

	time: 0,
	startTime: 0,
	isTiming: false,
	animationHandle: null,

	methodChanged: function(){
		this.get("solves").clear();
		this.get("solve").set("model", this.newSolve());
	}.observes("method.model"),

	init: function(){
		this._super();

		var method = this.get("method.model");
		var puzzle = this.get("puzzle.model");

		this.get("solve").set("model", this.newSolve());
	},

	newSolve: function(){
		var puzzle = this.get("puzzle.model");
		var method = this.get("method.model");
		var solve = Timinator.Solve.createRecord({
			datetime: Date.now(),
			method: method,
			puzzle: puzzle,
			scramble: Timinator.ScrambleGenerator.generate(puzzle)
		});

		return solve;
	},

	logSolve: function(){
		var oldSolve = this.get("solve.model");
		this.get("solves").addObject(oldSolve);

		var newSolve = this.newSolve();
		this.get("solve").set("model", newSolve);

		this.get("store").commit();
	},

	newStepResult: function(step){
		var stepResult = Timinator.StepResult.createRecord({

		});
		return stepResult;
	},

	totalTime: function(){
		var total =  this.get("solve.totalTime") + this.get("time");
		return Timinator.Math.thousandthPrecision(total);
	}.property("solve.totalTime", "time"),

	setScramble: function(scramble){
		this.get("solve").set("scramble", scramble);
	},

	resetTime: function(){
		this.set("startTime", Date.now());
	},

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
			this.stop();
		}
	},

	stop: function(){
		this.set("isTiming", false);
		cancelAnimationFrame(this.get("animationHandle"));

		this.logSolve();

		this.set("solve.currentStepIndex", 0);
		this.set("time", 0);
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