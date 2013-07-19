Timinator.Method = Ember.Object.extend({
	name: "",
	stepNames: null,
	init: function(){
		this._super();
		this.set("stepNames", this.get("stepNames") || []);
	},

	numSteps: function(){
		return this.get("stepNames").length;
	}.property("stepNames"),

	stepName: function(index){
		return this.get("stepNames")[index];
	}
});

Timinator.noBreakdownMethod = Timinator.Method.create({
	name: "No Breakdown",
	stepNames: [
		"Total"
	]
});

Timinator.cfopMethod = Timinator.Method.create({
	name: "CFOP",
	stepNames: [
		"Cross",
		"F2L",
		"OLL",
		"PLL"
	]
});

Timinator.rouxMethod = Timinator.Method.create({
	name: "Roux",
	stepNames: [
		"First block",
		"Second block",
		"Corners",
		"Last Six Edges"
	]
});