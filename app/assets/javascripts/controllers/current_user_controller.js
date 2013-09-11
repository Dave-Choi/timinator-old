Timinator.CurrentUserController = Ember.ObjectController.extend({
    needs: ["alerts"],

    isLoggedIn: function(){
        return this.get("model") != null;
    }.property("model"),

    loadUser: function(user){
        this.get("store").load(Timinator.User, user);
        this.set("model", Timinator.User.find(user.id));
    },

    login: function(data){
        var url = "users/sign_in.json";
        var controller = this;
        var alerts = this.get("controllers.alerts");
        $.post(url, data).then(function(response){
            controller.loadUser(response.user);
            alerts.addAlert("You've successfully logged in.");
        }, function(response){
            alerts.addAlert("Something went wrong trying to log you in.");
        });
    },

    logout: function(){
        var url = "users/sign_out.json";
        var controller = this;
        var alerts = this.get("controllers.alerts");
        $.ajax({
            url: url,
            type: "delete"
        }).then(function(response){
            alerts.addAlert("You've successfully logged out.");
            controller.set("model", null);
        }, function(){
            alerts.addAlert("Something went wrong trying to log you out.");
        });
    },

    register: function(data){
        var url = "users.json";
        var controller = this;
        var alerts = this.get("controllers.alerts");
        $.ajax({
            url: url,
            data: data,
            type: "post"
        }).then(function(response){
            var user = response.user;
            alerts.addAlert("You've signed up successfully as " + user.email);
            controller.loadUser(user);
        }, function(response){
            var errorList = "";
            var errors = response.responseJSON.errors;
            for(var key in errors){
                var value = errors[key];
                errorList += key + ": " + value.join(", ");
            }
            alerts.addAlert("There was a problem with your sign up: " + errorList);
        })
    }
});
