/*
	The Solve model provides some aggregate functionality over 
	StepResults, grouping them with an associated SolveMethod and scramble.

	Only completed Solves should be used for overall solve time tracking,
	but StepResults can be used without an associated Solve for isolated
	step drills, which can traverse SolveMethods (e.g. The Cross is used
	in CFOP and some beginner methods), and should therefore be tracked 
	independently of SolveMethods.
*/

Timinator.Solve = DS.Model.extend(Timinator.Trashable, {
	scramble: DS.attr("string"),

	stepResults: DS.hasMany("step-result", {async: true}),
	solveMethod: DS.belongsTo("solveMethod"),

	user: DS.belongsTo("user"),

	puzzleBinding: "solveMethod.puzzle",

	totalTime: function(){
		var stepResults = this.get("stepResults");
		var total = 0;
		stepResults.forEach(function(item, index, enumerable){
			total += item.get("time");
		});
		return Timinator.Math.thousandthPrecision(total);
	}.property("stepResults.@each.time"),

	isComplete: function(){
		/*
			A Solve is considered complete if there exists a StepResult
			for each Step in the Solve's SolveMethod.
		*/
		var stepResults = this.get("stepResults");
		var steps = this.get("solveMethod.steps");

		// Check for count mismatch first, because the rest is really inefficient.
		if(stepResults.get("length") != steps.get("length")){
			return false;
		}

		// Count checks out, so iterate to check for one to one correspondence

		// These are sorted and the same length, so they can just be iterated through directly.
		var stepIDs = steps.mapProperty("id").sort();
		var stepResultStepIDs = stepResults.mapProperty("step.id").sort();
		var i, len = stepIDs.get("length");

		for(i=0; i<len; i++){
			var stepID = stepIDs.objectAt(i);
			var stepResultStepID = stepResultStepIDs.objectAt(i);
			if(stepID != stepResultStepID){
				return false;
			}
		}

		return true;
	}.property("stepResults.@each"),

	trashedChanged: function(){
		// Propagates trashed status to child StepResults
		var isTrashed = this.get("isTrashed");
		var stepResults = this.get("stepResults");

		stepResults.setEach("isTrashed", isTrashed);
	}.observes("isTrashed")
});
