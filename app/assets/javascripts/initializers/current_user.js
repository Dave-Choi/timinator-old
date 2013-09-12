Ember.Application.initializer({
    name: "currentUser",

    initialize: function(container){
        var store = container.lookup("store:main");
        var attributes = $("meta[name='current-user']").attr("content");

        if(attributes){
            var object = store.load(Timinator.User, JSON.parse(attributes));
            var user = Timinator.User.find(object.id);
            var controller = container.lookup("controller:currentUser").set("content", user);
        }
        else{
            var controller = container.lookup("controller:currentUser").set("content", null);
        }

        container.typeInjection("controller", "currentUser", "controller:currentUser");
    }
});
