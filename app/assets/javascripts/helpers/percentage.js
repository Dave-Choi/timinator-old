Ember.Handlebars.helper("percentage", function(value){
	return Math.round(value * 100) + "%";
});
