// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require handlebars
//= require ember
//= require ember-data
//= require d3.v3.js
//= require nv.d3.js
//= require bootstrap
//= require_self
//= require timinator

// TODO: Remove this ASAP
var requestAnimationFrame = requestAnimationFrame || mozRequestAnimationFrame || msRequestAnimationFrame;
var cancelAnimationFrame = cancelAnimationFrame || mozCancelAnimationFrame;

// for more details see: http://emberjs.com/guides/application/
Timinator = Ember.Application.create({
	LOG_TRANSITIONS: true,
	routes: function(){
        return this.Router.router.recognizer.names;
    }
});

//= require_tree .
