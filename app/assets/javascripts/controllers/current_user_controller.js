Timinator.CurrentUserController = Ember.ObjectController.extend({
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
        $.post(url, data).then(function(response){
            controller.loadUser(response.user);
            console.log("log in success");
        }, function(response){
            console.log("log in failure");
        });
    },

    logout: function(){
        var url = "users/sign_out.json";
        var controller = this;
        $.ajax({
            url: url,
            type: "delete"
        }).then(function(response){
            console.log("logged out");
            console.log(response);
            controller.set("model", null);
        }, function(){
            console.log("logout failed");
        });
    },

    register: function(data){
        var url = "users.json";
        var controller = this;
        $.ajax({
            url: url,
            data: data,
            type: "post"
        }).then(function(response){
            console.log("sign up success");
            console.log(response);
            controller.loadUser(response.user);
        }, function(response){
            console.log("sign up failed");
            console.log(response);
        })
    }
});
