function getStore(){
	return Timinator.__container__.lookup("store:main");
}

var store;

module("Timinator.Solve#totalTime", {
	setup: function(){
		// Timinator.ApplicationAdapter = DS.RESTAdapter;
		// Timinator.reset();
		store = getStore();
	},
	teardown: function(){

	}
});


test("it returns 0 when there are no child StepResults", function(){
	var solve = store.createRecord("solve");
	equal(solve.get("totalTime"), 0);
});

test("it computes the total time from all child StepResults", function(){
	var srs = store.pushMany("step-result", [
		{ id: 1, time: 1 },
		{ id: 2, time: 2 }
	]);

	console.log(srs[0].get("time"));

	var solve = store.createRecord("solve", { stepResults: srs });

	console.log(solve.get("stepResults.length"));
	equal(solve.get("totalTime"), 3.14);
});