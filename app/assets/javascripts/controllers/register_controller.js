Timinator.RegisterController = Ember.Controller.extend({
	needs: ["currentUser"],
	email: "",

	password: "",
	passwordConfirmation: "",

	passwordMinLength: 8,

	passwordTooShort: function(){
		return this.get("password.length") < this.get("passwordMinLength");
	}.property("password.length"),

	passwordsMatch: function(){
		return this.get("password") == this.get("passwordConfirmation");
	}.property("password", "passwordConfirmation"),

	shouldWarnTooShort: function(){
		return this.get("password.length") && this.get("passwordTooShort");
	}.property("password.length", "passwordTooShort"),

	shouldWarnMismatch: function(){
		// Don't bother warning if they haven't entered their password yet.
		return this.get("password.length") && this.get("passwordConfirmation.length") && !this.get("passwordsMatch");
	}.property("password", "passwordsMatch"),

	reset: function(){
		this.setProperties({
			email: "",
			password: "",
			passwordConfirmation: ""
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
			"user[password]": this.get("password"),
			"user[password_confirmation]": this.get("passwordConfirmation")
		};
	}.property("email", "password"),

	register: function(){
		if(!this.get("passwordsMatch")){
			console.log(passwords);
			console.log("Password mismatch");
			return;
		}
		var currentUser = this.get("controllers.currentUser");
		var data = this.get("data");
		currentUser.register(data);
	}
});