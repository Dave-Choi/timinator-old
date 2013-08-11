Timinator.Step = DS.Model.extend({
	puzzle: DS.belongsTo("Timinator.Puzzle"),
	name: DS.attr("string"),
	description: DS.attr("string")
});

Timinator.Step.FIXTURES = [
	{
		id: 1,
		name: "Cross",
		description: "Orient and permute the edges on one face."
	},
	{
		id: 2,
		name: "F2L",
		description: "Insert corner/edge pairs with a completed cross to complete the first two layers."
	},
	{
		id: 3,
		name: "OLL",
		description: "Orient last layer pieces to make a solid colored face."
	},
	{
		id: 4,
		name: "PLL",
		description: "Permute last layer pieces after orientation to solve the layer."
	},
	{
		id: 5,
		name: "F2B-1",
		description: "Solve a 1x2x3 block on one side."
	},
	{
		id: 6,
		name: "F2B-2",
		description: "Solve a 1x2x3 block opposite the first 1x2x3 block."
	},
	{
		id: 7,
		name: "CMLL",
		description: "Solve last layer corners without regard to the M slice."
	},
	{
		id: 8,
		name: "L6E",
		description: "Solve last layer and DF and DB edges."
	}
];
