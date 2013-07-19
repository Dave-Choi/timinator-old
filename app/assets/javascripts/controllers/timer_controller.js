Timinator.TimerController = Ember.Controller.extend({
	log: null,
	method: null,
	solveResult: null,

	time: 0,
	startTime: 0,
	isTiming: false,
	animationHandle: null,

	stepIndex: -1,

	init: function(){
		this._super();

		var method = this.get("method");
		if(!method){
			method = Timinator.noBreakdownMethod;
			//method = Timinator.rouxMethod;
		}
		this.set("method", method);

		var solveResult = Timinator.SolveResult.create({
			method: method,
			isTrashable: false
		});
		this.set("solveResult", solveResult);

		var log = Timinator.SessionLog.create({
			method: method
		});
		this.set("log", log);
	},

	stepName: function(){
		return this.get("method.stepNames")[this.get("stepIndex")];
	}.property("method", "stepIndex"),

	stepHeaders: function(){
		var log = this.get("log");
		var stepNames = this.get("method.stepNames");
		if(log.get("results.length")){
			var stepNamesWithAverage = this.get("method.stepNames").map(function(item, index, enumerable){
				return item + " (" + log.meanAverage(index) + ")";
			});
			return stepNamesWithAverage;
		}
		return stepNames;

	}.property("method.stepNames", "log.results.@each", "log.results.@each.isTrashed"),

	isMultiStep: function(){
		return this.get("method.numSteps") > 1;
	}.property("method.numSteps"),

	totalTime: function(){
		var total =  this.get("solveResult.total") + this.get("time");
		return Math.floor(total * 1000) / 1000;
	}.property("solveResult.total", "time"),

	setMethod: function(method){
		this.set("method", method);
		this.set("log", Timinator.SessionLog.create({
			method: method
		}));
		$("#chart").html("<svg></svg>");
	},

	setScramble: function(scramble){
		this.solveResult.set("scramble", scramble);
	},

	plotGraph: function(){
		Timinator.SessionLogSerializer.graph("#chart svg", Timinator.SessionLogSerializer.serialize(this.get("log")));
	},

	replotNeeded: function(){
		this.plotGraph();
	}.observes("log.results.@each", "log.results.@each.isTrashed"),

	step: function(){
		var method = this.get("method");
		var numSteps = method.get("numSteps");
		var stepIndex = this.get("stepIndex");

		if(stepIndex !== -1){
			var timeInSeconds = Timinator.Math.msInSeconds(this.get("time"));
			this.get("solveResult").pushTime(this.get("time"));
		}

		if(stepIndex < numSteps-1){
			this.incrementProperty("stepIndex");
			this.set("startTime", Date.now());
			this.set("isTiming", true);
			this.timestep();
		}
		else{
			this.stop();
		}
	},

	stop: function(){
		var log = this.get("log");

		this.set("isTiming", false);
		cancelAnimationFrame(this.get("animationHandle"));

		if(this.get("stepIndex") > -1){
			var oldResult = this.get("solveResult");
			oldResult.set("isTrashable", true);
			oldResult.set("isResolved", true);
			log.addResult(oldResult);

			var newResult = Timinator.SolveResult.create({
				isTrashable: false,
				method: this.get("method")
			});
			this.set("solveResult", newResult);
		}

		this.set("stepIndex", -1);
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