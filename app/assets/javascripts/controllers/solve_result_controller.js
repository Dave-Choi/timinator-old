Timinator.SolveResultController = Ember.ObjectController.extend({
	needs: ["timer"],

	init: function(){
		this._super();
	},

	toggleTrashed: function(){
		/*
			I don't know why this isn't getting forwarded to the model by default,
			but if I don't make this call manually, it complains about no handler
			for the action.
		*/
		this.get("model").toggleTrashed();
	},

	totalDifference: function(){
		return Timinator.Math.thousandthPrecision(this.get("total") - this.get("controllers.timer.log.totalMeanAverage"));
	}.property("controllers.timer.log.totalMeanAverage"),

	steps: function(){
		var log = this.get("controllers.timer.log");
		var times = this.get("times");
		var totalTime = this.get("total");
		return times.map(function(item, index, enumerable){
			return {
				time: item,
				differenceFromAverage: Timinator.Math.thousandthPrecision(item - log.get("meanAverages")[index]),
				percentOfTotal: item / totalTime || 0
			};
		});
	}.property("times.@each", "controllers.timer.log.meanAverages.@each")
});
