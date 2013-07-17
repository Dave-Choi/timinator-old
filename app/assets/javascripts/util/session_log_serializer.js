Timinator.SessionLogSerializer = Ember.Object.create({
  isValid: function(log){
    // Wait to implement until architecture is more concrete
  },
  
  serialize: function(log){
    /*
      This serializes a SessionLog's results into a format that D3 can use.
      Specifically, an array of objects of the form:
      {
        key: string,
        values: array of 2D points
      }
    */
    var i, j;
    var data = [];
    var results = log.get("results").filterProperty("isTrashed", false); // TODO: This requires too much knowledge of the other classes.  Refactor.
    var numResults = results.length;
    
    if(numResults == 0){
      return;
    }
    
    var method = results[0].get("method"); // TODO: This stinks.  Method should be specified on a log or session level
    var stepNames = method.get("stepNames");
    var numStepNames = stepNames.length;
    
    for(i=0; i<numStepNames; i++){
      var stepName = stepNames[i];
      data[i] = {
        key: stepName, 
        values: []
      };
    }
    
    for(i=0; i<numResults; i++){
      var resultTimes = results[i].get("times");
      for(j=0; j<numStepNames; j++){
        var time = resultTimes[j];
        data[j].values.push([numResults - i, time || 0]); /* 
          - The log unshifts results to show most recent results 
          at the top of the table, but for graphs, you want them 
          in chronological order, so we don't just use i.
            - TODO: Refactor this so that the template just gets a reversed list
        */
      }
    }
    
    return data;
  },
  
  graph: function(target, data){
    // TODO: This shouldn't be in this class.
    if(!data){
      return;
    }
    
    // target can be specified as a selector string, or a node reference.
    $(target).parent().html("<svg></svg>"); // Don't know why, but some event handling was breaking, so nuke the node and remake it.  This isn't safe if the node isn't isolated, though.
    nv.addGraph(function() {
      var chart = nv.models.stackedAreaChart()
      .x(function(d) { return d[0] })
      .y(function(d) { return d[1] })
      .clipEdge(true);
      
      chart.xAxis
      .showMaxMin(false);
      //.tickFormat(function(d) { return d3.time.format('%x')(new Date(d)) });
      
      chart.yAxis
      .tickFormat(d3.format(',.3f')); // TODO: Convert this to a better time format
      
      d3.select(target)
      .datum(data)
      .transition()
      .duration(500)
      .call(chart);
      
      nv.utils.windowResize(chart.update);

      return chart;
    });
  }
});