describe("SolvesController", function(){
	var step1, step2, step3;
	var solve1, solve2;

	beforeEach(function() {
		Ember.testing = true;

		Ember.run(function(){
			// TODO: These should be set up with a factory.  Look into Ember factory gems
			step1 = step1 || Timinator.Step.createRecord({
				id: 100,
				name: "Cross"
			});

			step2 = step2 || Timinator.Step.createRecord({
				id: 101,
				name: "F2L"
			});

			step3 = step3 || Timinator.Step.createRecord({
				id: 102,
				name: "OLL"
			});


			solve1 = solve1 || Timinator.Solve.createRecord();
			solve1.get("stepResults").clear();
			solve1.get("stepResults").pushObjects([
				Timinator.StepResult.createRecord({ step: step1, time: 0.14 }),
				Timinator.StepResult.createRecord({ step: step2, time: 1.4 }),
				Timinator.StepResult.createRecord({ step: step3, time: 1.6 })
			]); // Total 3.14

			solve2 = solve2 || Timinator.Solve.createRecord();
			solve2.get("stepResults").clear();
			solve2.get("stepResults").pushObjects([
				Timinator.StepResult.createRecord({ step: step1, time: 6 }),
				Timinator.StepResult.createRecord({ step: step2, time: 0.86 })
			]); // Total 6.86
		});

	});

	describe("#totalMeanAverage", function(){
		it("returns 0 when there are no Solves", function(){
			Ember.run(function(){
				var solvesController = Timinator.SolvesController.create();
				expect(solvesController.get("length")).toEqual(0);
				expect(solvesController.get("totalMeanAverage")).toEqual(0);
			});
		});

		it("computes the mean average of completed Solves", function(){
			Ember.run(function(){
				var solvesController = Timinator.SolvesController.create();
				var mean;
				
				solvesController.set("model", [solve1]);
				mean = solvesController.get("totalMeanAverage");
				expect(mean).toEqual(3.14);

				solvesController.set("model", [solve1, solve2]);
				mean = solvesController.get("totalMeanAverage");
				expect(mean).toEqual(5);
			});
		});

	});

	describe("#stepAverage", function(){
		it("calculates the mean average time for a given Step", function(){
			Ember.run(function(){
				var solvesController = Timinator.SolvesController.create();
				var mean;
				solvesController.set("model", [solve1]);
				mean = solvesController.stepAverage(step1);
				expect(mean).toEqual(0.14);

				solvesController.set("model", [solve1, solve2]);
				mean = solvesController.stepAverage(step1);
				expect(mean).toEqual(3.07);
			});
		});

		it("calculates the mean average time for a given Step ID", function(){
			Ember.run(function(){
				var solvesController = Timinator.SolvesController.create();
				var mean;
				solvesController.set("model", [solve1]);
				var n = step1.get("id");
				mean = solvesController.stepAverage(step1.get("id"));
				expect(mean).toEqual(0.14);
			});
		});

		it("returns 0 when there are no Solves matching the given Step", function(){
			Ember.run(function(){
				var solvesController = Timinator.SolvesController.create();
				var mean;

				solvesController.set("model", [solve2]);
				mean = solvesController.stepAverage(step3);
				expect(mean).toEqual(0);
			});
		});
	});
});