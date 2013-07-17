Timinator.SolveResultController = Ember.ObjectController.extend({
	init: function(){
		this._super();
	},

	toggleTrashed: function(){
		/*
			I don't know why this isn't getting forwarded to the model by default,
			but if I don't make this call manually, it complains about no handler
			for the action.
		*/
		this.get("model").toggleTrashed();
	}
});
