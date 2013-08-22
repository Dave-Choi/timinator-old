/*
	Used to display the difference between a time and the average

	Uses the Bootstrap classes "text-success" and "text-error" to
	show red and green times, depending on whether the time was
	worse or better than average, respectively.
*/

Ember.Handlebars.helper("timeDifference", function(value){
	var className = "text-success";
	value = Timinator.Math.thousandthPrecision(value);
	if(value > 0){
		className = "text-error";
		value = "+" + value;
	}
	return new Handlebars.SafeString('<span class="' + className + '">' + value + '</span>');
});
