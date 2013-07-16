Timinator.SessionLog = Ember.Object.extend({
  /* 
    A SessionLog's results should all use the same parameters, so they can be graphed sensibly.
    i.e. method, puzzle, steps
    
    This may call for some reorganization of the Method class, etc.
  */
  results: null,
  init: function(){
    this._super();
    this.set("results", []);
  },
  
  addResult: function(result){
    this.get("results").unshiftObject(result);
  },
  
  meanAverage: function(step){
    // TODO: There's going to need to be some allowance here for partial solves, e.g. for when you just want to practice a specific step
    var results = this.get("results");
    var i, numResults = results.length;
    var total = 0;
    for(i=0; i<numResults; i++){
      var result = results[i];
      var time = result.get("times")[step];
      total += time;
    }
    return Timinator.Math.thousandthPrecision(total / numResults);
  },
  
  totalMeanAverage: function(){
    var results = this.get("results");
    var i, numResults = results.length;
    var total = 0;
    for(i=0; i<numResults; i++){
      total += results[i].get("total");
    }
    return Timinator.Math.thousandthPrecision(total / numResults) || 0;
  }.property("results.@each.total")
});