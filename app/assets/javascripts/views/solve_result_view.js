Timinator.SolveResultView = Ember.View.extend({
	tagName: "tr",
	classNameBindings: ["controller.isTrashed"],

	didInsertElement: function(){
		if(this.get("controller.isResolved")){
			this.$().tooltip({
				title: this.get("controller.scramble")
			});
		}
	}
});
