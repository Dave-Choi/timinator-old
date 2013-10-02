// Ember.Handlebars.helper("time", function(value){
// 	return Timinator.Math.thousandthPrecision(value);
// });

Ember.Handlebars.helper("time", function(value){
	return Timinator.Math.thousandthPrecision(value/1000);
});
