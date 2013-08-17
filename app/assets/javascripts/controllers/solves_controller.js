Timinator.SolvesController = Ember.ArrayController.extend({
	totalMeanAverage: function(){
		var total = this.reduce(function(previousValue, item, index, enumerable){
			return previousValue + item.get("totalTime");
		}, 0);
		return Timinator.Math.thousandthPrecision(total / this.get("length")) || 0;
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
	}
});
