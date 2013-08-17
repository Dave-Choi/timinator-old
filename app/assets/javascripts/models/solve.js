Timinator.Solve = DS.Model.extend({
	datetime: DS.attr("date"),
	scramble: DS.attr("string"),

	stepResults: DS.hasMany("Timinator.StepResult"),
	puzzle: DS.belongsTo("Timinator.Puzzle"),
	method: DS.belongsTo("Timinator.Method"),

	totalTime: function(){
		var stepResults = this.get("stepResults");
		var total = 0;
		stepResults.forEach(function(item, index, enumerable){
			total += item.get("time");
		});
		return Timinator.Math.thousandthPrecision(total);
	}.property("stepResults.@each.time"),

