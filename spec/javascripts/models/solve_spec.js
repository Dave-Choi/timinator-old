describe("Solve", function() {
	beforeEach(function() {
		Ember.testing = true;
	});

	describe("#totalTime", function(){
		it("returns 0 when there are no child StepResults", function(){
			Ember.run(function(){
				var solve = Timinator.Solve.createRecord();
				expect(solve.get("stepResults.length")).toEqual(0);
				expect(solve.get("totalTime")).toEqual(0);
			});
		});

		it("computes the total time from all child StepResults", function(){
			Ember.run(function(){
				var solve = Timinator.Solve.createRecord();
				var stepResults = solve.get("stepResults");
				stepResults.pushObjects([
					Timinator.StepResult.createRecord({ time: 0.14 }),
					Timinator.StepResult.createRecord({ time: 1.4 }),
					Timinator.StepResult.createRecord({ time: 1.6 })
				]);
				var total = solve.get("totalTime");
				expect(total).toEqual(3.14);
			});
		});
	});

	describe("#isComplete", function(){
		var step1, step2, step3;
		var method;
		var solve;
		var stepResult1, stepResult2, stepResult3;
		var stepResults;

		beforeEach(function(){
			Ember.testing = true;
			Ember.run(function(){
				step1 = Timinator.Step.createRecord();
				step2 = Timinator.Step.createRecord();
				step3 = Timinator.Step.createRecord();

				method = Timinator.Method.createRecord();
				method.get("steps").pushObjects([step1, step2]);

				solve = Timinator.Solve.createRecord({
					method: method
				});

				stepResults = solve.get("stepResults");

				stepResult1 = Timinator.StepResult.createRecord({ step: step1 });
				stepResult2 = Timinator.StepResult.createRecord({ step: step2 });
				stepResult3 = Timinator.StepResult.createRecord({ step: step3 });
			});
		});

		it("returns false if there's a count mistmatch between Method steps and StepResults", function(){
			Ember.run(function(){
				stepResults.setObjects([stepResult1]); // Too few
				expect(solve.get("isComplete")).toEqual(false);

				// If clear() isn't called, this error comes up: TypeError: Cannot read property 'record' of undefined
				stepResults.clear();
				stepResults.setObjects([stepResult1, stepResult2, stepResult3]); // Too many
				expect(solve.get("isComplete")).toEqual(false);
			});
		});

		it("returns true if the Method steps and StepResult steps are the same", function(){
			Ember.run(function(){
				stepResults.setObjects([stepResult1, stepResult2]);
				expect(solve.get("isComplete")).toEqual(true);

				stepResults.clear();
				stepResults.setObjects([stepResult2, stepResult1]);
				expect(solve.get("isComplete")).toEqual(true);
			});
		});

		it("returns false if the Method steps and StepResult steps don't match", function(){
			Ember.run(function(){
				solve.get("stepResults").setObjects([stepResult3, stepResult1]); // Wrong set
				expect(solve.get("isComplete")).toEqual(false);
			});
		});

	});
});