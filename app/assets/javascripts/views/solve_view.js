Timinator.SolveView = Ember.View.extend({
	tagName: "tr",
	classNameBindings: ["controller.isTrashed"],

	didInsertElement: function(){
		this.$().tooltip({
			title: this.get("controller.scramble")
		});
	}
});
