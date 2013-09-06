/*
	Authentication for this particular app isn't a big deal.
	Its main purpose is just to associate logged times with a
	user account.  People can use it without data persistence on
	their times all they want.
*/

Timinator.LoginController = Ember.Controller.extend({
	needs: ["currentUser"],
	email: "",
	password: "",
	errorMessage: "",

	shouldShowForm: false,

	toggleFormDisplay: function(){
		this.toggleProperty("shouldShowForm");
		this.reset();
	},

	reset: function(){
		this.setProperties({
			email: "",
			password: "",
			errorMessage: ""
		});
	},

	data: function(){
		/* Format expected by Devise is 
			{
				"user[email]": <email>,
				"user[password]": <password> 
			}
		*/

		return {
			"user[email]": this.get("email"),
			"user[password]": this.get("password")
		};
	}.property("email", "password"),

	login: function(){
		var currentUser = this.get("controllers.currentUser");
		console.log(currentUser);
		var data = this.get("data");
		currentUser.login(data);
	}
});