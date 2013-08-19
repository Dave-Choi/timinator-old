Ember.Handlebars.helper("timeDifference", function(value){
	var className = "text-success";
	value = Timinator.Math.thousandthPrecision(value);
	if(value > 0){
		className = "text-error";
		value = "+" + value;
	}
	return new Handlebars.SafeString('<span class="' + className + '">' + value + '</span>');
});
