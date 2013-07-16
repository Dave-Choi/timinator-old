Timinator.Math = Ember.Object.create({
	msInSeconds: function(ms){
		return this.thousandthPrecision(ms / 1000);
	},

	thousandthPrecision: function(num){
		return Math.floor(num * 1000) / 1000;
	}
});