Timinator.MethodController = Ember.ObjectController.extend({

	stepNames: function(){
		return this.get("steps").mapProperty("name");
	}.property("steps.@each.name"),

	numSteps: function(){
		return this.get("stepNames").length;
	}.property("stepNames"),

	stepName: function(index){
		return this.get("stepNames")[index];
	}
});
