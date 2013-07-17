Timinator.Trashable = Ember.Mixin.create({
	isTrashable: true, /*
		Normally, I'd want to wait to apply the mixin when I want
		the object to be trashable, but Ember doesn't make that easy,
		to my knowledge.
	*/
	isTrashed: false,

	toggleTrashed: function(){
		this.toggleProperty("isTrashed");
	}
});
