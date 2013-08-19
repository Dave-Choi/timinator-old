/*
	Handles managing the application state of the current solve
		- Tracks the current step
*/

Timinator.SolveController = Ember.ObjectController.extend(Timinator.Trashable, {
	needs: ["method", "solves"], /*
		Setting bindings from this controller breaks.  

		I suspect it's got something to do with their generation 
		from the #each helper in Handlebars, rather than being 
		set up via the router.
	*/
	currentStepIndex: 0,

	currentStep: function(){
		var index = this.get("currentStepIndex");
		return this.get("controllers.method.steps").objectAt(index);
	}.property("currentStepIndex", "controllers.method.steps.@each"),

	advance: function(time){
		this.addTime(time);
		var index = this.get("currentStepIndex");
		var numSteps = this.get("controllers.method.steps.length");
		if(index < numSteps - 1){
			this.incrementProperty("currentStepIndex");
			return true;
		}
		else{
			this.set("currentStepIndex", 0);
			return false;
		}
	},

	addTime: function(time){
		var stepResult = Timinator.StepResult.createRecord({
			solve: this.get("model"),
			step: this.get("currentStep"),
			time: time
		});
		this.get("store").commit();
	},

	totalDifference: function(){
		var solvesAverage = this.get("controllers.solves.totalMeanAverage");
		var totalTime = this.get("totalTime");

		return totalTime - solvesAverage;
	}.property("totalTime", "controllers.solves.totalMeanAverage")
});
