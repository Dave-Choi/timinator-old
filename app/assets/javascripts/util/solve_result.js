Timinator.SolveResult = Ember.Object.extend(Timinator.Trashable, {
	method: null,
	times: null,
	scramble: "",

	isResolved: false,

	init: function(){
		this.set("times", []);

		this.set("scramble", this.get("scramble") || Timinator.ScrambleGenerator.generate3x3x3());
	},

	pushTime: function(time){
		this.get("times").pushObject(time);
	},

	total: function(){
		var times = this.get("times");
		var totalTime = 0;
		for(var i=0; i<times.length; i++){
			totalTime += times[i];
		}
		return Timinator.Math.thousandthPrecision(totalTime);
	}.property("times.@each")
});
