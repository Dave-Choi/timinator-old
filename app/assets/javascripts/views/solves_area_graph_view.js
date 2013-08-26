Timinator.SolvesAreaGraphView = Ember.View.extend({
	tagName: "svg",
	solvesBinding: "controller.model",
	stepsBinding: "controller.model.method.steps",

	chart: null,

	didInsertElement: function(){
		this._super();
	},

	setupGraph: function(){
		var data = this.get("stepResultsData") || [];
		var container = this.$()[0];
		var view = this;

		nv.addGraph(function() {
			var chart = nv.models.stackedAreaChart()
			.x(function(d) { return d[0]; })
			.y(function(d) { return d[1]; })
			.clipEdge(true);

			chart.xAxis
			.showMaxMin(false)
			.tickFormat(d3.format("d"));

			chart.yAxis
			.tickFormat(d3.format(',.3f')); // TODO: Convert this to a better time format

			d3.select(container)
			.datum(data)
			.transition()
			.duration(500)
			.call(chart);

			nv.utils.windowResize(chart.update);

			view.set("chart", chart);

			return chart;
		});
	}.observes("steps"),

	regraph: function(){
		var data = this.get("stepResultsData");
		if(!data){
			return;
		}
		var container = this.$()[0];
		var view = this;
		var chart = this.get("chart");

		d3.select(container)
		.datum(data)
		.transition()
		.duration(500)
		.call(chart);

	}.observes("stepResultsData"),

	stepResultsData: function(){
		/*
			D3 expects data as an array of objects of the form:
			{
				key: <string>,
				values: <array of 2D points>
			}

			This is a little clunky, on account of provisions made for
			sparse data.

			Specifically, Solves that are stopped prematurely will only
			have StepResult records for completed steps, but the D3 data
			format just works with arrays of numbers, so steps that aren't
			completed have to have 0s inserted.

			Solves are iterated through linearly once: O(n)
			Method Steps are iterated through linearly 4 times: O(4n) 
		*/
		var solves = this.get("solves");
		if(solves.get("length") === 0){
			return ;
		}

		var data = {};
		var count = 0;

		var stepNames = this.get("steps").mapProperty("name");
		stepNames.forEach(function(name){
			data[name] = [];
		});

		solves.forEach(function(solve){
			var isTrashed = solve.get("isTrashed");
			if(!isTrashed){
				// Ensure there's at least a placeholder for each solve
				var pointData = {};
				stepNames.forEach(function(name){
					pointData[name] = 0;
				});

				solve.get("stepResults").forEach(function(result){
					var stepName = result.get("step.name");
					pointData[stepName] = result.get("time");
				});

				stepNames.forEach(function(name){
					data[name].addObject([count, pointData[name]]);
				});

				count++;
			}
		});

		var formatted = [];
		stepNames.forEach(function(stepName){
			formatted.push({
				key: stepName,
				values: data[stepName]
			});
		});

		return formatted;
	}.property("solves.@each.stepResults.@each", "solves.@each.isTrashed")
});
