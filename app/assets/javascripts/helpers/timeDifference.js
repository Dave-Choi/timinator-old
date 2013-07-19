Ember.Handlebars.helper("timeDifference", function(value){
	var className = "text-success";
	if(value > 0){
		className = "text-error";
		value = "+" + value;
	}
	return new Handlebars.SafeString('<span class="' + className + '">' + value + '</span>');
});
