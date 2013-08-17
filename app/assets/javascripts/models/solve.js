/*
	The Solve model provides some aggregate functionality over 
	StepResuls, grouping them with an associated Method and scramble.

	Only completed Solves should be used for overall solve time tracking,
	but StepResults can be used without an associated Solve for isolated
	step drills, which can traverse Methods (e.g. The Cross is used
	in CFOP and some beginner methods), and should therefore be tracked 
	independently of Methods.
*/

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

