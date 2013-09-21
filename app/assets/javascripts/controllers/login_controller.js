/*
	Authentication for this particular app isn't a big deal.
	Its main purpose is just to associate logged times with a
	user account.  People can use it without data persistence on
	their times all they want.

	This controller is pretty dumb, and just handles the form itself
	and passes its data to the CurrentUserController to do the 
	actual lifting on.
*/

Timinator.LoginController = Ember.Controller.extend({
	needs: ["currentUser", "alerts"],
	email: "",
	password: "",

	shouldShowForm: false,

	reset: function(){
		this.setProperties({
			email: "",
			password: ""
		});
	},

	actions: {
		toggleFormDisplay: function(){
			this.toggleProperty("shouldShowForm");
			this.reset();
		},		

		login: function(){
			if(this.get("isInputIncomplete")){
				this.get("controllers.alerts").addAlert("Missing fields.");
			}
			else{
				var currentUser = this.get("controllers.currentUser");
				var data = this.get("data");
				currentUser.login(data);
			}
		}
	},

	userChanged: function(){
		this.reset();
	}.observes("controllers.currentUser.model"),

	data: function(){
		/* Format expected by Devise is 
			{
				"user[email]": <email>,
				"user[password]": <password> 
			}

			TODO: This probably should be in the CurrentUserController
		*/

		return {
			"user[email]": this.get("email"),
			"user[password]": this.get("password")
		};
	}.property("email", "password"),

	isInputIncomplete: function(){
		// Just make sure there's something for each field.
		return !(this.get("email") && this.get("password"));
	}.property("email", "password")
});