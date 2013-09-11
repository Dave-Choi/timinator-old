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

	fieldsPopulated: function(){
		return this.get("email") && this.get("password") && this.get("passwordConfirmation");
	}.property("email", "password", "passwordConfirmation"),

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

	isNotReadyToSubmit: function(){
		return !(
			this.get("fieldsPopulated") &&
			this.get("passwordsMatch") &&
			!this.get("passwordTooShort")
		);
	}.property("email", "password", "passwordConfirmation"),


	register: function(){
		var shouldRegister = true;
		if(!this.get("fieldsPopulated")){
			this.get("alerts").addAlert("Missing fields.");
			shouldRegister = false;
		}
		if(this.get("passwordTooShort")){
			this.get("alerts").addAlert("Your password is too short.")
			shouldRegister = false;
		}
		if(!this.get("passwordsMatch")){
			this.get("alerts").addAlert("Your password confirmation doesn't match your password.")
			shouldRegister = false;
		}
		if(!this.get("passwordsMatch")){
			this.get("alerts").addAlert("Your password confirmation doesn't match your password.")
			shouldRegister = false;
		}
		
		if(shouldRegister){
			var currentUser = this.get("controllers.currentUser");
			var data = this.get("data");
			currentUser.register(data);
		}
	}
});