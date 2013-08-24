Timinator.StepResultController = Ember.ObjectController.extend({
	needs: ["solves"],

	differenceFromAverage: function(){
		var stepAverage = this.get("controllers.solves").stepAverage(this.get("step"));

		return this.get("time") - stepAverage;
	}.property("time", "controllers.solves.stepStats"),

	percentOfTotal: function(){
		var total = this.get("solve.totalTime");

		return (this.get("time") / total) || 0;
	}.property("time", "solve.totalTime")
});