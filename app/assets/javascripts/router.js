Timinator.Router.map(function(){
	this.route("timer");
	this.resource("methods");
});

Timinator.ApplicationRoute = Ember.Route.extend({
	redirect: function(){
		this.transitionTo("timer");
	}
});

Timinator.IndexRoute = Ember.Route.extend({
	redirect: function(){
		this.transitionTo("timer");
	}
});

Timinator.TimerRoute = Ember.Route.extend({
	// Keybinding just doesn't work well on a view level unless it's an input field
	enter: function(){
		var spaceCode = 32;
		var timerController = this.controllerFor("timer");
		$(window).on("keydown.timerController", function(e){
			// Disable the scrolling default behavior of spacebar
			if(e.keyCode === spaceCode){
				return false;
			}
		});

		$(window).on("keyup.timerController", function(e){
			if(e.keyCode === spaceCode){
				timerController.step();
				return false;
			}
		});
	},

	exit: function(){
		$(window).off("keydown.timerController keyup.timerController");
	}
});
