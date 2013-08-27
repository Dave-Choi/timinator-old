Ember.Handlebars.helper("time", function(value){
	return Timinator.Math.thousandthPrecision(value);
});
