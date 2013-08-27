Timinator.SolvesController = Ember.ArrayController.extend({
	needs: ["method"],
	methodBinding: "controllers.method",

	totalMeanAverage: function(){
		var numComplete = 0;
		var total = this.reduce(function(previousValue, item, index, enumerable){
			var isComplete = item.get("isComplete");
			var isTrashed = item.get("isTrashed");

			if(item.get("isComplete") && !isTrashed){
				numComplete++;
				return previousValue + item.get("totalTime");
			}
			return previousValue;
		}, 0);

		return Timinator.Math.thousandthPrecision(total / numComplete) || 0;
	}.property(
		"model.@each.totalTime",
		"model.@each.isComplete",
		"model.@each.isTrashed"
	),

	stepAverage: function(step){
		// You can specify step as a Step Object for an id.

		/* 
			Performance on this method is kind of lousy when there are more
			than a few solves.

			TODO: Test performance against a regular for loop implementation
		*/
		var stepID = (typeof step === "number") ? step : step.get("id");
		var stepFilter = function(stepResult){
			var isRightStep = (stepResult.get("step.id") == stepID);
			var isTrashed = stepResult.get("isTrashed");
			return isRightStep && !isTrashed;
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
	}.property(
		"method.steps.@each",
		"@each.stepResults.@each.time",
		"@each.isTrashed" /* 
			It makes me uncomfortable that this is here but it's dependent
			on the implementation in SolvesController.stepAverage()
		*/
	)
});
