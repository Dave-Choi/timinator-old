Timinator.AlertsController = Ember.Controller.extend({
	alerts: null,

	init: function(){
		this._super();
		this.set("alerts", []);
	},

	actions: {
		dismiss: function(alert){
			this.get("alerts").removeObject(alert);
		}
	},

	addAlert: function(message, type, duration){
		var alert = Timinator.Alert.create({
			message: message,
			type: type,
			duration: duration
		});

		this.get("alerts").addObject(alert);
	}
});