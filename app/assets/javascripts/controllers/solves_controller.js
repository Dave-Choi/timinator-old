Timinator.SolvesController = Ember.ArrayController.extend({
	needs: ["method"],
	methodBinding: "controllers.method",

	totalMeanAverage: function(){
		var numComplete = 0;
		var total = this.reduce(function(previousValue, item, index, enumerable){
			var isComplete = item.get("isComplete");
			if(item.get("isComplete")){
				numComplete++;
				return previousValue + item.get("totalTime");
			}
			return previousValue;
		}, 0);
		
		return Timinator.Math.thousandthPrecision(total / numComplete) || 0;
	}.property("model.@each.totalTime"),

	stepAverage: function(step){
		// You can specify step as a Step Object for an id.
		var stepID = (typeof step === "number") ? step : step.get("id");
		var stepFilter = function(stepResult){
			return stepResult.get("step.id") == stepID;
		};

		var count = 0;
		var total = 0;

		this.forEach(function(item, index, enumerable){
			var stepResults = item.get("stepResults");
			stepResults = stepResults.filter(stepFilter);

			count += stepResults.get("length");
			total += stepResults.reduce(function(previousValue, item){
				return previousValue + item.get("time");
			}, 0);
		});

		return Timinator.Math.thousandthPrecision(total / count) || 0;
	},

	stepStats: function(){
		var steps = this.get("method.steps");
		var controller = this;
		var totalMeanAverage = this.get("totalMeanAverage");

		return steps.map(function(item, index, enumerable){
			var stepAverage = controller.stepAverage(item);

			return {
				name: item.get("name"),
				average: controller.stepAverage(item),
				percentOfTotal: (stepAverage / totalMeanAverage) || 0
			};
		});
	}.property("method.steps.@each", "@each.stepResults.@each.time")
});
