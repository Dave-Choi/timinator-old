Timinator.Router.map(function(){
	this.resource("puzzle", { path: ":puzzle_id" }, function(){
		this.resource("solveMethod", { path: ":solve_method_id" }, function(){
			this.resource("timer");
			this.route("stats");
			//this.resource("steps");
		});
	});

	this.route("register");
	this.route("home");
});

Timinator.ApplicationRoute = Ember.Route.extend({
	setupController: function(){
		this.controllerFor("puzzles").set("model", this.store.find('puzzle'));
		// this.controllerFor("solveMethods").set("model", this.store.find('solveMethod'));
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
				timerController.send("step");
				return false;
			}
		});
	},

	exit: function(){
		$(window).off("keydown.timerController keyup.timerController");
	}
});

Timinator.RegisterRoute = Ember.Route.extend({
	setupController: function(controller, context){
		controller.reset();
	}
});
